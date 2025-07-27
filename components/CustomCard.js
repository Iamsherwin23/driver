import { Constants } from "../constants/constants";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import CustomText from "./CustomText";
import { fonts } from "../utils/fonts";
import { Ionicons } from '@expo/vector-icons';

const CustomCard = ({ details, pressFunc }) => {

    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    return (
        <View style={[style.card]}>

            <View style={style.icon}>
                <Ionicons name={'person-circle'} size={64} color={Constants.COLORS.BLACK} />
            </View>

            <View style={style.details}>

                {/* Name */}
                <View style={[{ flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.BLACK }]}>Name: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.name}</CustomText>
                </View>

                {/* Plate No */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.BLACK }]}>Plate Number: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.plateNumber}</CustomText>
                </View>

                {/* Date */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.RED }]}>Date: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.date}</CustomText>
                </View>

                {/* Time */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.RED }]}>Time: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.time}</CustomText>
                </View>

                {/* Pick Up Loc */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.BLUE }]}>Pickup Location: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.pickUpLoc}</CustomText>
                </View>

                {/* Drop off Loc */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.RED }]}>Drop-off Location: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.dropOffLoc}</CustomText>
                </View>

            </View>
            <View style={style.more}>
                <TouchableOpacity onPress={pressFunc}>
                    <Ionicons name={'ellipsis-horizontal'} size={24} color={Constants.COLORS.BLACK} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    icon: {
        marginRight: Constants.MARGIN.SMALL
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Constants.COLORS.WHITE,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        padding: Constants.PADDING.SMALL,
        elevation: 5,
        marginBottom: Constants.MARGIN.SMALL
    },
    messageLabel: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.LABELS
    },
    messageValue: {
        fontFamily: 'Montserrat',
        fontSize: Constants.SIZE.LABELS
    },
    details: {
    },
    more: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

export { CustomCard };