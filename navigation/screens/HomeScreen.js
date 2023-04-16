import React, { useState, useRef, useEffect} from 'react';
import { View, ImageBackground, Image, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from 'react-native';
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
      
            // // Make a POST request to the backend server with the image URI
            // const response = await fetch('http://localhost:3000/process-image', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ uri: data.uri }),
            // });
      
            // const result = await response.json();
            // console.log(result);
      
            // Update the state with the processed image
            setImage(data.uri);
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
                <TouchableOpacity style={styles.redetectButton} onPress={() => setImage(null)}>
                    <Text icon = 'retweet' style={styles.buttonText}>RE-DETECT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveImage} >
                    <Text icon = 'check' style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={shareImage} >
                    <Text icon = 'check' style={styles.buttonText}>SHARE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.collectButton} >
                    <Text icon = 'check' style={styles.buttonText}>COLLECT</Text>
                </TouchableOpacity>
                <Text style={styles.detectionText}>dont know</Text>
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
        top: 60,
    },
    camera: {
        backgroundColor: 'transparent',
        color: 'transparent',
        width: 320,
        height: 310,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 160,
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
        top: 140,
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
})