import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Constants } from '../../../constants/constants';

import { RegularPage } from './regular/Regular.js';
import { SpecialPage } from './special/Special.js';
import CustomText from '../../../components/CustomText';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
    return (
        <View style={style.view}>
            <View style={style.headerContainer}>
                <CustomText style={style.textTitle}>TrikeFare</CustomText>
            </View>

            <Tab.Navigator initialRouteName='Regular'
                screenOptions={({ route, navigation }) => ({
                    tabBarStyle: {
                        backgroundColor: Constants.COLORS.DARK_RED,
                        elevation: 0
                    },
                    tabBarLabelStyle: {
                        fontSize: Constants.SIZE.REGULAR,
                        fontWeight: 'bold'
                    },
                    tabBarActiveTintColor: Constants.COLORS.WHITE,
                    tabBarInactiveTintColor: Constants.COLORS.RED,
                    tabBarIndicatorStyle: {
                        backgroundColor: Constants.COLORS.WHITE
                    }
                })}>
                <Tab.Screen name='Regular' component={RegularPage} />
                <Tab.Screen name='Special' component={SpecialPage} />
            </Tab.Navigator>

        </View>
    )
}

const style = StyleSheet.create({
    view: {
        flex: 1
    },

    // Header
    headerContainer: {
        flex: 0,
        padding: Constants.PADDING.REGULAR,
        paddingTop: Constants.PADDING.MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constants.COLORS.RED
    },
    textTitle: {
        color: Constants.COLORS.WHITE,
        fontSize: Constants.SIZE.HEADINGS,
        fontFamily: 'Blinker-Bold'
    },

    // Choices
    choicesContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    choices: {
        flex: 1,
        padding: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.DARK_RED,
        justifyContent: 'center',
        alignItems: 'center'
    }
})