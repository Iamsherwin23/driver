import { StyleSheet } from "react-native";
import { Constants } from "../../../constants/constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

const createUserStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE
        // alignItems: 'center'
    },
    header: {
        flex: 0.3,
        paddingTop: Constants.PADDING.REGULAR,
        paddingLeft: Constants.PADDING.SMALL,
        paddingRight: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.RED,
        borderBottomLeftRadius: Constants.BORDERS.RADIUS_NORMAL,
        borderBottomRightRadius: Constants.BORDERS.RADIUS_NORMAL,
        marginBottom: Constants.MARGIN.SMALL
    },
    headerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: Constants.PADDING.SMALL,
        paddingRight: Constants.PADDING.SMALL,
    },  
    headerTitleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.HEADINGS,
        color: Constants.COLORS.WHITE
    },
    form: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        // paddingTop: Constants.PADDING.REGULAR,
        justifyContent: 'center'
    },
    form_Name: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Constants.SIZE.REGULAR
    },
    icon: {
        width: '10%'
    },
    navigation: {
        backgroundColor: Constants.COLORS.RED
    },
    dropDown:{
        backgroundColor: Constants.COLORS.WHITE,
        borderRadius: Constants.BORDERS.RADIUS_SMALL
    },
    footer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Constants.PADDING.LARGE
    }
});

export { createUserStyle };