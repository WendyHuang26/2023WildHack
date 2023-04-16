import * as React from "react";
import {View, Image, ScrollView, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, font} from "react-native";

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
        <Text style={styles.titleText}>My Collection</Text>

        <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            onScroll={handleScroll} // add onScroll event handler
            scrollEventThrottle={16} // set the throttle to 16ms to ensure that the onScroll event is called frequently enough
        >
            {[...Array(rectangles)].map((_, index) => (
                <View style={styles.collection} key={index}>
                    <View style={styles.verticalLine}></View>
                </View>
            ))}
        </ScrollView>

        <TouchableOpacity onPress={addRectangle} style={styles.button}>
            <Text style={styles.buttonText}>Add Rectangle</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
            <Image source={dog} style={styles.logo} top={-160}></Image>
        </View>

        <View style={styles.logoContainer}>
            <Image source={daffodil} style={styles.logo} top={-20}></Image>
        </View>

        <View style={styles.logoContainer}>
            <Image source={willow} style={styles.logo} top={120}></Image>
        </View>

        <Text style = {styles.name} top = {110}>Husky Shephard</Text>
        <Text style = {styles.name} top = {250}>Daffodil</Text>
        <Text style = {styles.name} top = {390}>Willow</Text>

        <Text style = {styles.name} top = {160}>Date: 04/16/2023</Text>
        <Text style = {styles.name} top = {300}>Date: 04/16/2023</Text>
        <Text style = {styles.name} top = {440}>Date: 04/16/2023</Text>

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
    verticalLine: {
        shadowOffset: {width:0, height:0,},
        shadowOpacity: 0.8,
        shadowColor: 'grey',
        shadowRadius: 2,
        height: '80%',
        opacity: 0.45,
        width: 1,
        marginTop: 10,
        backgroundColor: 'grey',
        alignSelf: 'center',
    },
    name: {
        color: 'grey',
        fontStyle: 'normal',
        fontSize: 17,
        lineHeight: 90,
        textAlign: 'center',
        position: "absolute",
        left: 605,
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

    logoContainer: {
        position: 'absolute',
        left: 0,
        right: 160,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 0, // Add padding for devices with a status bar (e.g., Android)
      },
      logo: {
        width: 100,
        height: 100,
        borderRadius:10,
      },
    
})