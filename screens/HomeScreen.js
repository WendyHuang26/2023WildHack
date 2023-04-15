import React from "react";
import {View, StyleSheet, Text, SafeAreaView} from "react-native";

const HomeScreen = () => {
    return (<SafeAreaView style={styles.container}>
        <Text>HomeScreen</Text>
    </SafeAreaView>)
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})