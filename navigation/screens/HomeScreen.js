import React, { useState, useRef, useEffect} from 'react';
import { View, Image, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from 'react-native';
import { Camera, CameraType} from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export default function HomeScreen({ navigation }) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash,setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    },[])

    const takePicture = async () => {
        if (cameraRef) {
          try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
      
            // Make a POST request to the backend server with the image URI
            const response = await fetch('http://localhost:3000/process-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ uri: data.uri }),
            });
      
            const result = await response.json();
            console.log(result);
      
            // Update the state with the processed image
            setImage(result.image);
          } catch (e) {
            console.log(e);
          }
        }
      };

    const saveImage = async () => {
        if(image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert('Picture saved')
                setImage(null);
            } catch(e) {
                console.log(e)
            }
        }
    }

    const shareImage = async () => {
        if(image) {
            try {
                await shareAsync(image);
                setImage(null);
            } catch(e) {
                console.log(e)
            }
        }
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (<SafeAreaView style={styles.container}>
        <Text>                                                                                                       </Text>
        <Text style={styles.titleText}>Narch</Text>

        {!image ?
        <Camera 
            style={styles.camera}
            ref={cameraRef}
        >
        </Camera>
        :
        <Image source={{uri: image}} style={styles.camera} />
        }

        <View>
            {image ?
            <View>
                <TouchableOpacity style={styles.detectButton} onPress={() => setImage(null)}>
                    <Text icon = 'retweet' style={styles.buttonText}>RE-DETECT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveImage} >
                    <Text icon = 'check' style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={shareImage} >
                    <Text icon = 'check' style={styles.buttonText}>SHARE</Text>
                </TouchableOpacity>
            </View>
            :
            <TouchableOpacity style={styles.detectButton} onPress={takePicture}>
                <Text icon = 'camera' style={styles.buttonText}>DETECT</Text>
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
        top: 70,
    },
    camera: {
        backgroundColor: 'transparent',
        color: 'transparent',
        width: 320,
        height: 320,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 180,
    },
    detectButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 200,
        height: 40,
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 195,
    },
    buttonText: {
        alignSelf:'center',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 25,
        textAlign: 'center',
        position: 'absolute',
        top: 6,
    },
    saveButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 200,
        height: 40,
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 245,
    },
    shareButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 200,
        height: 40,
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 295,
    },
})