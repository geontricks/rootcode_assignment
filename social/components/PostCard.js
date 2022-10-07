import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PostCard = ({ title, description, color, comments, navigation }) => {

  return (
      <View style={{
          padding: 5,
          margin: 5,
          borderWidth: 1,
          backgroundColor: color == "white" ? "#ffffff" : (color == "yellow" ? "#ffff00" : "#ffc0cb"),
          borderRadius:10
    }}>
          <Text style={{
              fontWeight: 'bold',
              fontSize:20
          }}>{title}</Text>
          <Text>{description}</Text>
          <View style={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: "center",
              borderTopColor: '#000',
              borderTopWidth:1
          }}>
              <Text>{ comments.length } Comments</Text>
          </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({})