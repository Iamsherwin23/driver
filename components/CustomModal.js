import { Constants } from "../constants/constants";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import CustomText from "./CustomText";
import { fonts } from "../utils/fonts";
import { Ionicons } from '@expo/vector-icons';

const CustomModal = ({ pressFunc, children }) => {

    return (
        <View style={style.modal_container}>
            <View style={style.modal_content}>

                <View style={style.modal_header}>
                    <TouchableOpacity onPress={pressFunc}>
                        <Ionicons name={'close'} size={24} color={Constants.COLORS.WHITE} />
                    </TouchableOpacity>
                </View>

                <View style={style.modal_main}>
                    {children}
                </View>

                <View style={style.modal_footer}>

                </View>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    modal_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constants.COLORS.RED_TINT
    },
    modal_main: {
        flex: 1,
        padding: Constants.PADDING.REGULAR
    },
    modal_content: {
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        backgroundColor: Constants.COLORS.WHITE,
        width: '90%',
        height: '60%',
        elevation: 10,
        overflow: 'hidden',
    },
    modal_header: {
        alignItems: 'flex-end',
        padding: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.DARK_RED
    },
    modal_footer: {
        padding: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.DARK_RED
    }
})

export { CustomModal };