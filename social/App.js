/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from "native-base";
import Home from './screens/Home';
import CreatePost from './screens/CreatePost';
import ViewPost from './screens/ViewPost';
import { PostContext } from './context/PostContext';

const Stack = createNativeStackNavigator();


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [posts, setPosts] = useState([])

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <PostContext.Provider value={{ posts, setPosts }}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={CreatePost} />
            <Stack.Screen name="View" component={ViewPost}/>
          </Stack.Navigator>
        </PostContext.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
