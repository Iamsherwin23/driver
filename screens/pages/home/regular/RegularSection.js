
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Constants } from '../../../../constants/constants.js';
import CustomText from '../../../../components/CustomText.js';
import { AuthContext } from '../../../../context/AuthContext.js';
import { Ionicons } from '@expo/vector-icons';

import { CustomButton } from '../../../../components/CustomButton.js';
import { MapSection } from '../MapSection.js';

export function RegularSection({navigation}) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [iconPickup, setIconPickup] = useState('radio-button-off');
    const [iconDropOff, setIconDropOff] = useState('radio-button-off');
    // const logOut = async () => {
    //     await AsyncStorage.removeItem('token');
    //     setIsAuthenticated(false);
    // }
    const pickUp = () => {
        if(iconPickup == 'radio-button-off'){
            setIconPickup('radio-button-on')
        }else{
            setIconPickup('radio-button-off')
        }
    }

    const dropOff = () => {
        if(iconDropOff == 'radio-button-off'){
            setIconDropOff('radio-button-on')
        }else{
            setIconDropOff('radio-button-off')
        }
    }

    return (
        <View style={{ flex: 1, padding: Constants.PADDING.REGULAR }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MapSection')}>
                <View style={style.card}>
                    <View style={style.card_right}>
                        <Ionicons name={iconPickup} size={24} color={Constants.COLORS.RED} />
                    </View>
                    <View style={style.card_left}>
                        <CustomText>Pick Up</CustomText>
                        <CustomText style={style.card_left_text}>Search Pickup Location</CustomText>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MapSection')}>
                <View style={style.card}>
                    <View style={style.card_right}>
                        <Ionicons name={iconDropOff} size={24} color={Constants.COLORS.BLUE} />
                    </View>
                    <View style={style.card_left}>
                        <CustomText>Drop-Off</CustomText>
                        <CustomText style={style.card_left_text}>Search Drop-off Location</CustomText>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{alignItems: 'center', marginTop: Constants.MARGIN.REGULAR}}>
                <CustomButton color={Constants.COLORS.GRAYISH_WHITE} fontSize={Constants.SIZE.REGULAR} onPress={()=>{}} text={'Done'} width={'50%'} />
            </View>
            <View style={{alignItems: 'center', marginTop: Constants.MARGIN.REGULAR}}>
                <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.REGULAR} onPress={()=>navigation.navigate('TaripaSection')} text={'Taripa'} width={'50%'} />
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    card: {
        backgroundColor: Constants.COLORS.WHITE,
        elevation: 5,
        padding: Constants.PADDING.REGULAR,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Constants.MARGIN.SMALL,
    },
    card_right: {
        marginRight: Constants.MARGIN.SMALL
    },
    card_left: {
    },
    card_left_text: {
        fontFamily: 'Montserrat-Bold'
    }
})