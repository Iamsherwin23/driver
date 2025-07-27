import { Constants } from "../constants/constants";
import { StyleSheet, View, Text } from "react-native";

const CustomMessage = ({message, color}) => {
    return (
        <View style={[style.message, { backgroundColor: color }]}>
            <Text style={style.messageText}>{message}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    message: {
        marginBottom: Constants.MARGIN.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        fontFamily: 'Montserrat-Bold',
        color: Constants.COLORS.WHITE
    }
})

export { CustomMessage };