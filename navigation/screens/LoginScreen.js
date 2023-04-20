import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import * as SQLite from 'expo-sqlite';
import ConfettiCannon from 'react-native-confetti-cannon';
import Modal from 'react-native-modal';

const myImage = require('./logo.png');

export default function App({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [db, setDb] = useState(SQLite.openDatabase('MainDB.db'));
    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        createTable();
        getData();
    }, []);

    const createTable = () => {
        db && db.transaction((tx) => { // Check if db is not null before accessing it
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users"
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Name TEXT, C1 TEXT, I1 BLOB, C2 TEXT, I2 BLOB, C3 TEXT, I3 BLOB, C4 TEXT, I4 BLOB, C5 TEXT, I5 BLOB, num INTEGER);"
            )
        })
    }

    const getData = () => {
        try {
            db && db.transaction((tx) => { // Check if db is not null before accessing it
                tx.executeSql(
                    "SELECT Email, Name FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            //navigation.navigate('HomeScreen');
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async () => {
        if (email.length === 0 || name.length === 0) {
            Alert.alert('Warning!', 'Please input your info')
        }
        else {
            try {
                db && db.transaction(async (tx) => { // Check if db is not null before accessing it
                    await tx.executeSql(
                        "INSERT INTO Users (Email, Name) VALUES (?,?)",
                        [email, name]
                    );
                })
                //navigation.navigate('HomeScreen');
                setLoginSuccess(true);
                setTimeout(() => {
                setLoginSuccess(false); // Hide success message after 2 seconds
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <View style={styles.body}>
            <View style={styles.logoContainer}>
                <Image source={myImage} style={styles.logo} resizeMode="contain"></Image>
            </View>
            <TextInput
                style={styles.input}
                placeholder='Enter your email:'
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your name:'
                onChangeText={(value) => setName(value)}
            />
            <TouchableOpacity style={styles.login} onPress={setData}>
                <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>
            {/* {loginSuccess && ( // Render success message if login is successful
                <Text style={styles.successText}>Login successful!</Text>
            )} */}
            <Modal
                isVisible={loginSuccess}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={800}
                backdropTransitionOutTiming={800}
                style={styles.modal}
                onBackdropPress={() => setLoginSuccess(false)}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Login Successful!</Text>
                    <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c4d7aa',
    },
    logoContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 0, // Add padding for devices with a status bar (e.g., Android)
      },
    logo: {
    width: 600,
    height: 135,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 30,
        marginBottom: 10,
        top: 220,
    },
    login: {
        backgroundColor: '#95b08f',
        width: 200,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        top: 430,
    },
    text: {
        alignSelf:'center',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 23,
        textAlign: 'center',
        position: 'absolute',
        top: 7,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    }
})