import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { fonts } from '../utils/fonts';
import CustomText from './CustomText';
import { Constants } from '../constants/constants';

export default function CustomLoadingBar(props) {

    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) {
        return null; // or a loading screen
    }
    return (
        <View style={style.container}>
            <View style={style.content}>
                <CustomText style={[style.text]}>Please Wait ...</CustomText>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    text:{
        fontFamily: 'Montserrat-Bold',
    },
    content:{
        backgroundColor: Constants.COLORS.WHITE,
        padding: Constants.PADDING.MEDIUM,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        elevation: 3
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: Constants.COLORS.RED_TINT,
        zIndex: 1000
    }
})
