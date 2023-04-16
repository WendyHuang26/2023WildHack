import * as React from "react";
import {View, ScrollView, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from "react-native";

const dog = require('./dog.jpg');
const willow = require('./willow.jpg');
const daffodil = require('./daffodil.jpg');

export default function CollectionScreen({ navigation }) {
    const [rectangles, setRectangles] = React.useState(1); // state to keep track of the number of rectangles

    const count = 1;
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
        <Text style={styles.titleText}>Ranking</Text>

        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            onScroll={handleScroll} // add onScroll event handler
            scrollEventThrottle={16} // set the throttle to 16ms to ensure that the onScroll event is called frequently enough
        >
            {[...Array(rectangles)].map((_, index) => (
                <View style={styles.collection} key={index}>
                    <View style={styles.verticalLine1}></View>
                    <View style={styles.verticalLine2}></View>
                </View>
            ))}
        </ScrollView>

        <TouchableOpacity onPress={addRectangle} style={styles.button}>
            <Text style={styles.buttonText}>Add Rectangle</Text>
        </TouchableOpacity>

        <Text style = {styles.number1}>1</Text>
        <Text style = {styles.number2}>2</Text>
        <Text style = {styles.number3}>3</Text>
        <Text style = {styles.score} top = {110}>9</Text>
        <Text style = {styles.score} top = {200}>7</Text>
        <Text style = {styles.score} top = {290}>3</Text>
        <Text style = {styles.name} top = {110}>Wendy Huang</Text>
        <Text style = {styles.name} top = {200}>Kefan Yu</Text>
        <Text style = {styles.name} top = {290}>Tony Yang</Text>

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
        height: 70,
        borderRadius:20,
        alignSelf: 'center',
        marginTop: 20,
        top: 50,
    },
    verticalLine1: {
        shadowOffset: {width:0, height:0,},
        shadowOpacity: 0.8,
        shadowColor: 'grey',
        shadowRadius: 2,
        height: '70%',
        opacity: 0.45,
        width: 1,
        marginTop: 10,
        marginLeft: -180,
        backgroundColor: 'grey',
        alignSelf: 'center',
    },
    verticalLine2: {
        shadowOffset: {width:0, height:0,},
        shadowOpacity: 0.8,
        shadowColor: 'grey',
        shadowRadius: 2,
        height: '70%',
        opacity: 0.45,
        width: 1,
        marginTop: -50,
        marginLeft: 180,
        backgroundColor: 'grey',
        alignSelf: 'center',
    },
    number1: {
        color: 'grey',
        fontStyle: 'normal',
        fontSize: 40,
        lineHeight: 90,
        textAlign: 'center',
        position: "absolute",
        top: 110,
        left: 455,
    },
    number2: {
        color: 'grey',
        fontStyle: 'normal',
        fontSize: 40,
        lineHeight: 90,
        textAlign: 'center',
        position: "absolute",
        top: 200,
        left: 455,
    },
    number3: {
        color: 'grey',
        fontStyle: 'normal',
        fontSize: 40,
        lineHeight: 90,
        textAlign: 'center',
        position: "absolute",
        top: 290,
        left: 455,
    },
    score: {
        color: 'grey',
        fontStyle: 'normal',
        fontSize: 23,
        lineHeight: 90,
        textAlign: 'center',
        position: "absolute",
        left: 707,
    },
    name: {
        color: 'grey',
        fontStyle: 'normal',
        fontSize: 26,
        lineHeight: 90,
        textAlign: 'center',
        position: "absolute",
    },

    button: {
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
    color: "transparent",
    fontWeight: "bold",
    fontSize: 16,
    },
})