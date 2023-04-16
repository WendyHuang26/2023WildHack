import * as React from "react";
import {View, ScrollView, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from "react-native";
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => {console.log(error)}
)

export default function CollectionScreen({ navigation }) {
    const [rectangles, setRectangles] = React.useState(1); // state to keep track of the number of rectangles

    // function to add a new rectangle
    function addRectangle() {
        setRectangles((count) => count + 1); // increase the count of rectangles by 1
    }

    // event handler for onScroll event
    function handleScroll(event) {
        const { contentOffset } = event.nativeEvent;
        if (contentOffset.y < 50) {
            event.nativeEvent.contentOffset.y = 50;
        }
    }

    return (
    <View style={styles.container}>
        <Text>                                                                                                       </Text>
        <Text style={styles.titleText}>My Collection</Text>

        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            onScroll={handleScroll} // add onScroll event handler
            scrollEventThrottle={16} // set the throttle to 16ms to ensure that the onScroll event is called frequently enough
        >
            {[...Array(rectangles)].map((_, index) => (
                <View style={styles.collection} key={index}></View>
            ))}
        </ScrollView>

        <TouchableOpacity onPress={addRectangle} style={styles.button}>
            <Text style={styles.buttonText}>Add Rectangle</Text>
        </TouchableOpacity>

    </View>)
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
        fontSize: 52,
        lineHeight: 90,
        fontWeight: 'bold',
        textAlign: 'center',
        position: "absolute",
        top: 25,
    },
    scrollContainer: {
        alignItems: "center",
        justifyContent: "center",
        top: 25,
        paddingTop: 10, // add top padding to avoid content clipping
        paddingBottom: 40,
    },
    collection: {
        backgroundColor: 'white',
        shadowOffset: {width:10, height:7,},
        shadowOpacity: 0.2,
        shadowColor: 'grey',
        shadowRadius: 3,
        width: 320,
        height: 120,
        borderRadius:20,
        alignSelf: 'center',
        marginTop: 20,
        top: 50,
    },

    button: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    },
})