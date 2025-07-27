import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../../../context/AuthContext';
import React, { useContext, useState } from 'react';
import CustomText from '../../../components/CustomText';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        setIsAuthenticated(false);
    }
    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, style.view]}>
            {/* Header */}
            <View style={style.headerContainer}>
                <CustomText style={style.textTitle}>Profile</CustomText>
            </View>

            {/* Main Content */}
            <View style={{ flex: 1 }}>
                <View style={style.profileHeader}>
                    <Ionicons name={'person-circle'} size={120} color={Constants.COLORS.BLACK} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <CustomText style={[style.textProfileBold]}>Juan DeLa Cruz</CustomText>
                        <CustomText style={[style.textProfile]}>delacruzjuan@gmail.com</CustomText>
                        <CustomText style={[style.textProfile]}>+639123456789</CustomText>
                    </View>
                    <View style={{padding: Constants.PADDING.REGULAR}}>
                        <TouchableOpacity>
                            <Ionicons name={'create'} size={24} color={Constants.COLORS.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.profileDetails}>

                </View>
                {/* <TouchableOpacity onPress={() => { logOut() }}>
                    <CustomText style={{ fontFamily: 'Montserrat' }}>Log out</CustomText>
                </TouchableOpacity> */}
            </View>
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
        fontFamily: 'Montserrat-Bold'
    },
    profileHeader: {
        flexDirection: 'row',
        paddingLeft: Constants.PADDING.SMALL,
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLORS.BLACK
    },
    profileDetails: {

    },
    textProfileBold: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.X_MEDIUM
    },
    textProfile: {
        fontFamily: 'Montserrat'
    }
})