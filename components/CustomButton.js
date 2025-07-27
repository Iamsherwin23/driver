import { Constants } from "../constants/constants";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';

import CustomText from "./CustomText";

const CustomButton = ({ color, fontSize, onPress, text, width }) => {

    const [fontsLoaded] = useFonts({
        'Blinker-Bold': require("../assets/fonts/Blinker-Bold.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
        'Montserrat': require("../assets/fonts/Montserrat-Regular.ttf")
    });

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    return (
        <View style={[style.container, {width: width}]}>
            <TouchableOpacity onPress={onPress}>
                <CustomText style={[style.text, {
                    backgroundColor: color,
                    fontSize: fontSize,
                }]}>
                    {text}
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        color: Constants.COLORS.WHITE,
        padding: Constants.PADDING.SMALL,
        paddingLeft: Constants.PADDING.MEDIUM,
        paddingRight: Constants.PADDING.MEDIUM,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        textAlign: 'center'
    }
})

export { CustomButton };