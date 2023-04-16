import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import HomeScreen from "./navigation/screens/HomeScreen";
//import { StatusBar } from 'expo-status-bar';
//import Orientation from 'react-native-orientation';
//import React, { useState, useEffect } from 'react';
//import {ImageBackground, StyleSheet, Text, Button, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
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
