import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from "./navigation/screens/HomeScreen";
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import LoginScreen from "./navigation/screens/LoginScreen";

export default function App() {
  // const detect = () => {
  //   let url = "http://localhost:3000/process-image"
  //   fetch(url).then((res) => {
  //     res.json().then((label) => {
  //       console.log(label)
  //     })
  //   }).catch(() => console.log("error"))
  // }

  return (
    <MainContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
