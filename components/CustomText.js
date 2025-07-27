import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { fonts } from '../utils/fonts';

export default function CustomText(props) {

    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) {
        return null; // or a loading screen
    }
    return (
        <Text {...props} style={[props.style]}>
            {props.children}
        </Text>
    );
}