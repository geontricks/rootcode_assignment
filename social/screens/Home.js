import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect,useContext,useState} from 'react'
import {Button} from "native-base"
import { getConnection } from '../Details'
import { PostContext } from '../context/PostContext'
import PostCard from '../components/PostCard'

const Home = ({ navigation }) => {

    const { posts, setPosts } = useContext(PostContext)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        loadContent()
    }, [])

    const loadContent = () => {
        setRefreshing(true)
        fetch(getConnection() + "/post/all", {
            method:"GET"
        }).then((result) => result.json()).then((jsonResult) => {
            setPosts(jsonResult)
        })
        setRefreshing(false)
    }

    const renderItem = ({ item }) => (<TouchableOpacity  onPress={()=>navigation.navigate("View",{id:item._id})}>
        <PostCard color={item.color} title={item.title} description={item.description} comments={item.comments} id={item._id} navigation={navigation} />
    </TouchableOpacity>)
    
  return (
    <View>
          <Button onPress={() => navigation.navigate("Create")}>Create Post</Button>
          <FlatList data={posts} refreshing={refreshing} onRefresh={()=>loadContent()} renderItem={renderItem} style={{
              marginBottom:40
          }} keyExtractor={item=>item._id}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})