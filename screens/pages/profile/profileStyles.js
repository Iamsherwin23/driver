import { StyleSheet } from 'react-native';
import { Constants } from '../../../constants/constants';

const profileStyles = StyleSheet.create({
    view: {
        flex: 1
    },
    main: {
        flex: 1,
        overflow: 'scroll',
        fontFamily: 'Montserrat',
    },
    form: {
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,

    },
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
        borderBottomWidth: 3,
        borderBottomColor: Constants.COLORS.WHITE
    },
    textProfileBold: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.X_MEDIUM
    },
    textProfile: {
        fontFamily: 'Montserrat'
    },
    nameContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    inputContainer: {
        width: '50%',
        paddingEnd: '5%',
    },

    inputContainer1: {
        width: '100%',
    },
    formLabel: {
        fontSize: 15,
        fontWeight: 800,
        paddingStart: 10,
        paddingBottom: 7,
        paddingTop: 15
    },
    formInput: {
        borderRadius: 100,
        
        padding: 10,
        paddingStart: 15,
        backgroundColor: Constants.COLORS.WHITE,
        borderColor: Constants.COLORS.FADED_BLACK
    },
    dropDown:{
        backgroundColor: Constants.COLORS.WHITE,
        borderRadius: Constants.BORDERS.RADIUS_SMALL
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Constants.COLORS.RED,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    selected: {
        backgroundColor: Constants.COLORS.RED,
    },
    radioLabel: {
        fontSize: 16,
        color: Constants.COLORS.BLACK,
    },
    customButton: {
        padding: 10,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontWeight: 800
    }

    // Form
})

export {profileStyles}