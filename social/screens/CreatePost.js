import { StyleSheet, Text, TextInput, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Input,Button,TextArea } from 'native-base'
import { getConnection } from '../Details'
import { PostContext } from '../context/PostContext'

const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("white")
    const { posts, setPosts } = useContext(PostContext);

    const whiteButton = () => {
        setColor("white");
    }

    const yellowButton = () => {
        setColor("yellow");
    }

    const pinkButton = () => {
        setColor("pink")
    }

     const loadContent = () => {
        fetch(getConnection() + "/post/all", {
            method:"GET"
        }).then((result) => result.json()).then((jsonResult) => {
            setPosts(jsonResult)
        })
    }

    const publish = () => {
        fetch(getConnection() + "/post/new-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                color:color
            })
        }).then((res) => res.json()).then((resx) => {
            setTitle("")
            setDescription("")
            setColor("white")
            loadContent()
            ToastAndroid.show(resx.status, ToastAndroid.SHORT);
        }).catch((error) => {
            ToastAndroid.show("Error Occured!", ToastAndroid.SHORT);
        })
    }

  return (
    <View>
          <Input value={title} onChangeText={setTitle} placeholder='Title' />
          <TextArea value={description} onChangeText={setDescription} placeholder='Description'/>
          <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              padding:3
          }}>
              <Text>Theme Color</Text>
              <TouchableOpacity style={{
                  height: 35,
                  width: 35,
                  margin:5,
                  backgroundColor: "#ffffff",
                  borderColor: "#000",
                  borderWidth:color === "white" ? 2 : 1
              }} onPress={()=>whiteButton()}></TouchableOpacity>
              <TouchableOpacity style={{
                  height: 35,
                  width: 35,
                  margin:5,
                  backgroundColor: "#ffff00",
                  borderColor: "#000",
                  borderWidth:color === "yellow" ? 2 : 1
              }} onPress={()=>yellowButton()}></TouchableOpacity>
              <TouchableOpacity style={{
                  height: 35,
                  width: 35,
                  margin:5,
                  backgroundColor: "#ffc0cb",
                  borderColor: "#000",
                  borderWidth:color === "pink" ? 2 : 1
              }} onPress={()=>pinkButton()}></TouchableOpacity>
          </View>
          <Button onPress={()=>publish()}>Publish</Button>
    </View>
  )
}

export default CreatePost

const styles = StyleSheet.create({})