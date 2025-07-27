import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Constants } from '../constants/constants';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import About from './pages/about/About';
import History from './pages/history/History';
import NewsFeed from './pages/newsFeed/NewsFeed';
import Rating from './pages/rate/Rate';


const Tab = createBottomTabNavigator();

export default function MainLayout({ setIsAuthenticated }) {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    else if (route.name === 'About') {
                        iconName = focused ? 'book' : 'book-outline';
                    }
                    else if (route.name === 'History') {
                        iconName = focused ? 'time' : 'time-outline';
                    }
                    else if (route.name === 'Rate Us') {
                        iconName = focused ? 'star' : 'star-outline';
                    }
                    else if (route.name === 'News Fare') {
                        iconName = focused ? 'newspaper' : 'newspaper-outline';
                    }

                    return <Ionicons name={iconName} size={24} color={Constants.COLORS.RED} />
                },
                tabBarActiveTintColor: Constants.COLORS.RED,
                tabBarInactiveTintColor: Constants.COLORS.RED,
                tabBarShowLabel: true,
                headerShown: false,
                tabBarStyle: {
                    flex: 0.07,
                    paddingTop: 10,
                    border: 'none',
                    elevation: 0,
                },
                swipeEnabled: true,
                animation: 'shift'
            })}
        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Profile' component={Profile} />
            <Tab.Screen name='About' component={About} />
            <Tab.Screen name='History' component={History} />
            <Tab.Screen name='Rate Us' component={Rating} />
            <Tab.Screen name='News Fare' component={NewsFeed} />
        </Tab.Navigator>
    )
}