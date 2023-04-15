import React from "react";
import {View, StyleSheet, Text} from "react-native";

const HomeScreen = () => {
    return (<View style={styles.container}>
        <Text>HomeScreen</Text>
    </View>)
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