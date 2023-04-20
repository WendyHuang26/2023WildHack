import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import LoginScreen from "./navigation/screens/LoginScreen";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/bottom-tabs';

//const Stack = createStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator 
    //     initialRouteName = "Login"
    //     screenOptions = {{
    //       headerTitleAlign: 'center',
    //       headerStyle: {
    //         backgroundColor: '#0080ff',
    //       },
    //       headerTintColor: '#ffffff',
    //       headerTitleStyle: {
    //         fontSize: 25,
    //         fontWeight: 'bold'
    //       }
    //     }}>
    //       <Stack.Screen 
    //         name = "Login"
    //         component = {LoginScreen}
    //         options = {{
    //           headerShown: false,
    //         }}/>
    //       <Stack.Screen
    //         name = "Main Container"
    //         component = {MainContainer}/>
    //     </Stack.Navigator>
    // </NavigationContainer>
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
