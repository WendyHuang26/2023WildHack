import React, { useState, useRef, useEffect} from 'react';
import { assets, View, ImageBackground, Image, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const myImage = require('./logo.png');

const uploadImageToServer = async (base64Image) => {
    const formData = new FormData();
    formData.append('photo', {
      uri: `data:image/jpeg;base64,${base64Image}`,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
  
    try {
      const response = await fetch('https://your-server.com/upload', {
        method: 'POST',
        body: formData,
      });
      const responseData = await response.json();
      console.log('Image upload response', responseData);
      return responseData;
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

export default function HomeScreen({ navigation }) {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>No access to camera</Text>
    }

    const takePicture = async () => {
        if (cameraRef) {
            let options = {
                quality: 1,
                base64: true,
                exif: false
            };
        
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
      };

    const saveImage = async () => {
        if(photo) {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        }
    }

    const shareImage = async () => {
        if(photo) {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        }
    }

    const addCollection = async () => {
        if (photo) {
          const uri = `data:image/jpeg;base64,${photo.base64}`; // Local image URI with base64 data
          const formData = new FormData();
      
          formData.append('photo', {
            uri: uri,
            type: 'image/jpeg', // or the appropriate image type
            name: 'photo.jpg' // or a unique name for the image
          });
      
          fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(responseData => {
            console.log('Image upload response', responseData);
            // Add the responseData.url to your collection here
            alert("Detected specieis added to collection!");
            setPhoto(undefined);
          })
          .catch(error => {
            console.error('Error uploading image', error);
          });
        }
    };
      
    return (<SafeAreaView style={styles.container}>
                                            
        <View style={styles.logoContainer}>
            <Image source={myImage} style={styles.logo} resizeMode="contain"></Image>
        </View>
        
        {!photo ?
        <Camera 
            style={styles.camera}
            ref={cameraRef}
        >
        </Camera>
        :

        <Image style={styles.camera} source={{ uri: "data:image/jpg;base64," + photo.base64 }}></Image>
        }

        <View>
            {photo ?
            <View>
                <TouchableOpacity style={styles.redetectButton} onPress={() => setPhoto(undefined)}>
                    <Text icon = 'retweet' style={styles.buttonText}>RE-DETECT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveImage} >
                    <Text icon = 'check' style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={shareImage} >
                    <Text icon = 'check' style={styles.buttonText}>SHARE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.collectButton} onPress={addCollection}>
                    <Text icon = 'check' style={styles.buttonText}>COLLECT</Text>
                </TouchableOpacity>

                <Text style={styles.detectionText}>dont know</Text>
            </View>
            :
            <TouchableOpacity style={styles.detectButton} onPress={takePicture}>
                <Text icon = 'camera' style={styles.detectButtonText}>DETECT</Text>
            </TouchableOpacity>
            }
        </View>

    </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c4d7aa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: 'white',
        fontStyle: 'normal',
        fontSize: 60,
        lineHeight: 90,
        fontWeight: 'bold',
        textAlign: 'center',
        position: "absolute",
        top: 60,
    },
    camera: {
        width: 320,
        height: 310,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 165,
    },
    detectButtonText: {
        alignSelf:'center',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 23,
        textAlign: 'center',
        position: 'absolute',
        top: 10,
    },
    buttonText: {
        alignSelf:'center',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 23,
        textAlign: 'center',
        position: 'absolute',
        top: 7,
    },
    detectionText: {
        alignSelf:'center',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 23,
        textAlign: 'center',
        position: 'absolute',
        top: 150,
    },
    detectButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 200,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        top: 195,
    },
    redetectButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 140,
        height: 40,
        borderRadius: 10,
        position: 'absolute',
        top: 195,
        left: -150,
    },
    collectButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 140,
        height: 40,
        borderRadius: 10,
        position: 'absolute',
        top: 195,
        left: 10,
    },
    saveButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 140,
        height: 40,
        borderRadius: 10,
        position: 'absolute',
        top: 260,
        left: 10,
    },
    shareButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 140,
        height: 40,
        borderRadius: 10,
        position: 'absolute',
        top: 260,
        left: -150
    },
    logoContainer: {
        position: 'absolute',
        top: 25,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 0, // Add padding for devices with a status bar (e.g., Android)
      },
      logo: {
        width: 600,
        height: 135,
      },
})