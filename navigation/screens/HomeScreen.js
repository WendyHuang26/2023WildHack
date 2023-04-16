import * as React from "react";
import {View, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from "react-native";

export default function HomeScreen({ navigation }) {
    return (<SafeAreaView style={styles.container}>
        <Text>                                                                                                       </Text>
        <Text style={styles.titleText}>AniCollect</Text>

        <View style={styles.cameraButton}>
            <Button
            //onPress={() => props.navigation.navigate('ScreenTwo')}
            title=" "
          />
        </View>

        <TouchableOpacity style={styles.detectButton}>
            <Text style={styles.buttonText}>DETECT</Text>
        </TouchableOpacity>

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
        top: 100,
    },
    cameraButton: {
        backgroundColor: 'transparent',
        color: 'transparent',
        width: 300,
        height: 300,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 210,
    },
    detectButton: {
        backgroundColor: '#95b08f',
        color: 'transparent',
        width: 200,
        height: 50,
        borderRadius: 10,
        alignSelf:'center',
        position: 'absolute',
        top: 570,
    },
    buttonText: {
        alignSelf:'center',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 25,
        textAlign: 'center',
        position: 'absolute',
        top: 8,
    }
})