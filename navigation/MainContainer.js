import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

// Screens
import HomeScreen from './screens/HomeScreen'
import RankingScreen from './screens/RankingScreen'
import CollectionScreen from './screens/CollectionScreen'
import LoginScreen from'./screens/LoginScreen';

// screen names
const homeName = 'Detect';
const rankingName = 'Ranking';
const collectionName = 'My Collection';
const loginName = "User";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteNAme = {homeName}
                screenOptions = {({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'camera' : 'camera-outline';
                        } else if (rn === rankingName) {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn === collectionName) {
                            iconName = focused ? 'book' : 'book-outline';
                        } else if (rn === loginName) {
                            iconName = focused ? 'ios-person' : 'ios-person-outline';
                        }
                        
                        return <Ionicons name={iconName} size={size} color={color}/>

                    },
                })}>
                
                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={rankingName} component={RankingScreen}/>
                <Tab.Screen name={collectionName} component={CollectionScreen}/>
                <Tab.Screen name={loginName} component={LoginScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}