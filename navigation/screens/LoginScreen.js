import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ImageBackground, Image, StyleSheet, Text, Button, Dimensions, SafeAreaView, TouchableOpacity, StatusBar, TextInput, Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
//import { AsyncStorage } from 'react-native';


const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => {console.log(error)}
)
export default function App({navigation}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        createTable();
        getData();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users"
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Name TEXT, C1 TEXT, I1 BLOB, C2 TEXT, I2 BLOB, C3 TEXT, I3 BLOB, C4 TEXT, I4 BLOB, C5 TEXT, I5 BLOB);"
            )
        })
    } 

    const getData = () => {
        try {
            db.transaction((tx) => {
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
        if (email.length == 0 || name.length == 0) {
            Alert.alert('Warning!', 'Please input your info')
        }
        else {
            try {
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Users (Email, Name) VALUES (?,?)",
                        [email, name]
                    );
                })
                //navigation.navigate('HomeScreen')
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <View style={styles.body}>
            <Image style={styles.logo}
            source = {require('./logo.png')}/>
            <TextInput 
            style={styles.input}
            placeholder = 'Enter your email:' 
            onChangeText = {(value) => setEmail(value)}
            />
            <TextInput 
            style={styles.input}
            placeholder = 'Enter your name:' 
            onChangeText = {(value) => setName(value)}
            />
            <TouchableOpacity style={styles.login} onPress={setData}>
                <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 100,
        height: 100,
        margin: 20,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 130,
        marginBottom: 10,
    },
    login: {
        backgroundColor: '#95b08f',
        width: 200,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        top: 195,
    },
    text: {
        alignSelf:'center',
        color: 'white',
        fontStyle: 'normal',
        fontSize: 23,
        textAlign: 'center',
        position: 'absolute',
        top: 7,
    }
})