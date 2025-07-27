
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Constants } from '../../../constants/constants.js';
import CustomText from '../../../components/CustomText.js';
import { AuthContext } from '../../../context/AuthContext.js';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { CustomButton } from '../../../components/CustomButton.js';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export function MapSection({ navigation, backRoute, isSpecialPage }) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const initialLocation = {
        latitude: 10.319333,
        longitude: 123.972028,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }
    return (
        <View style={style.container}>

            {/* map section */}
            <View style={style.map}>
                <Text>
                    <MapView style={style.map_content} provider={PROVIDER_GOOGLE} initialRegion={initialLocation}>
                    </MapView>
                </Text>
            </View>

            {/* payment section */}
            <View style={style.payment_container}>
                <View style={style.payment}>
                    <CustomText style={style.payment_text}>Php 13.00</CustomText>
                </View>
            </View>

            {/* info section */}
            <View style={style.info}>
                <View style={style.info_card}>
                    <Ionicons name={'location-outline'} size={32} color={Constants.COLORS.RED} />
                    <View style={style.info_card_location}>
                        <CustomText style={{ fontFamily: 'Montserrat' }}>Pick up</CustomText>
                        <CustomText style={style.location_text}>San Isidro</CustomText>
                    </View>
                </View>

                <View style={style.info_card}>
                    <Ionicons name={'location-outline'} size={32} color={Constants.COLORS.BLUE} />
                    <View style={style.info_card_location}>
                        <CustomText style={{ fontFamily: 'Montserrat' }}>Drop off</CustomText>
                        <CustomText style={style.location_text}>Manila</CustomText>
                    </View>
                </View>
            </View>

            {/* navigation section */}
            <View style={style.navigation}>
                <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.REGULAR} onPress={() => navigation.navigate(backRoute)} text={'Back'} width={'auto'} />
                {isSpecialPage ?
                    <CustomButton color={Constants.COLORS.GREEN} fontSize={Constants.SIZE.REGULAR} onPress={() => { }} text={'Book'} width={'auto'} />
                    :
                    <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.REGULAR} onPress={() => navigation.navigate('TaripaSection')} text={'Taripa'} width={'auto'} />}

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLORS.WHITE
    },
    map: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE
    },
    map_content: {
        width: '100%',
        height: '100%'
    },
    payment_container: {
        paddingTop: Constants.PADDING.REGULAR,
        paddingBottom: Constants.PADDING.REGULAR,
        paddingLeft: Constants.PADDING.LARGE,
        paddingRight: Constants.PADDING.LARGE
    },
    payment: {
        backgroundColor: Constants.COLORS.RED,
        padding: Constants.PADDING.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL
    },
    payment_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.MEDIUM,
        color: Constants.COLORS.WHITE,
        textAlign: 'center'
    },
    info: {
        flex: 0.3,
        padding: Constants.PADDING.REGULAR,
        borderTopWidth: 1,
        borderColor: Constants.COLORS.BLACK,
    },
    info_card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Constants.PADDING.SMALL
    },
    info_card_location: {
        marginLeft: Constants.MARGIN.SMALL
    },
    location_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR
    },
    navigation: {
        paddingTop: Constants.PADDING.REGULAR,
        flexDirection: 'row',
        paddingBottom: Constants.PADDING.MEDIUM,
        justifyContent: 'space-evenly'
    }
})