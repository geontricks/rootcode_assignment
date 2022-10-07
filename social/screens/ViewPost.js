import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { PostContext } from '../context/PostContext'
import PostCard from '../components/PostCard'
import { Input,Button,TextArea} from "native-base"
import { getConnection } from '../Details'

const ViewPost = ({ route, navigation }) => {
    
    const { id } = route.params

    const [thisPost, setthisPost] = useState(null)
    const { posts, setPosts } = React.useContext(PostContext)

    useEffect(() => {
        setthisPost(posts.find((item) => {
            if (item._id == id) {
                return true;
            } else {
                return false;
          }
      }))
    }, [id])

    const [comment, setComment] = useState("")

    const loadContent = () => {
        fetch(getConnection() + "/post/all", {
            method:"GET"
        }).then((result) => result.json()).then((jsonResult) => {
            setPosts(jsonResult)
        })
    }
    
    const commentNow = () => {
        fetch(getConnection() + "/comment/new-comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                id: thisPost._id,
                comment:comment
            })
        }).then((resp) => resp.json()).then((jsonresp) => {
            thisPost.comments.push(comment)
            setComment("")
            loadContent()
            ToastAndroid.show(jsonresp.status, ToastAndroid.SHORT);
        }).catch((error) => {
            ToastAndroid.show("Error Occured!", ToastAndroid.SHORT);
        })
    }

  return (
    <View>
          {
              thisPost != null ? (<View>
                  <PostCard title={thisPost.title} description={thisPost.description} comments={thisPost.comments} color={thisPost.color} />
                  <ScrollView>
                      {
                          thisPost.comments.map((item,index) => {
                              return (<Text style={{
                                  borderColor: "#000",
                                  borderRadius: 8,
                                  borderWidth: 1,
                                  padding: 8,
                                  margin:8
                              }} key={index}>{item}</Text>)
                          })
                      }
                  </ScrollView>
                  <View>
                      <TextArea placeholder='Leave comment here...' value={comment} onChangeText={setComment} />
                      <Button onPress={()=>commentNow()} >Comment</Button>
                    </View>
              </View>) : null
      }
    </View>
  )
}

export default ViewPost

const styles = StyleSheet.create({})