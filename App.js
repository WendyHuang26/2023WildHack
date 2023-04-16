import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from "./navigation/screens/HomeScreen";
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [token, setToken] = useState(null);

  const detect = () => {
    let url = "http://localhost:3000/process-image"
    fetch(url).then((res) => {
      res.json().then((data) => {
        console.log(data)
        setToken(data)
      })
    }).catch(() => console.log("error"))
  }

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
