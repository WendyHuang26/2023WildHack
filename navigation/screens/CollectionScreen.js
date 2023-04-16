import * as React from "react";
import {View, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from "react-native";

export default function CollectionScreen({ navigation }) {
    return (<SafeAreaView style={styles.container}>
        <Text>                                                                                                       </Text>
        <Text style={styles.titleText}>Collection</Text>

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
    }
})