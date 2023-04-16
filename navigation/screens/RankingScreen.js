import * as React from "react";
import {View, ScrollView, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from "react-native";

export default function RankingScreen({ navigation }) {
    return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text>                                                                                                       </Text>
        <Text style={styles.titleText}>Ranking</Text>

    </ScrollView>)
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