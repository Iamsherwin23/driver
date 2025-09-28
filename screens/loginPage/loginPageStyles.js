import { StyleSheet } from 'react-native';
import { Constants } from '../../constants/constants';

const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLORS.RED,
    },
    header: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 3,
        borderColor: Constants.COLORS.BLACK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flex: 0.7,
        marginTop: 10,
        backgroundColor: Constants.COLORS.RED,
        alignItems: 'center',
        position: 'relative'
    },
    label: {
        fontSize: Constants.SIZE.X_LARGE,
        color: Constants.COLORS.FADED_BLACK,
        fontFamily: 'Blinker-Bold'
    },
    label2: {
        fontSize: Constants.SIZE.HEADINGS,
        color: Constants.COLORS.RED,
        marginTop: 10,
        fontFamily: 'Montserrat-Bold'
    },
    // Form
    formContainer: {
        position: 'absolute',
        top: '-20%',
        backgroundColor: Constants.COLORS.WHITE,
        width: '80%',
        zIndex: 100,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        height: '105%',
        paddingTop: Constants.PADDING.MEDIUM,
        padding: Constants.PADDING.REGULAR,
        overflow: 'hidden'
    },
    formInput: {
        flex: 1,
        fontFamily: 'Montserrat',
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        fontSize: Constants.SIZE.REGULAR,
        color: Constants.COLORS.BLACK
    },
    inputContainer: {
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        borderRadius: 100,
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        paddingTop: Constants.PADDING.XSMALL,
        paddingBottom: Constants.PADDING.XSMALL,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Constants.MARGIN.REGULAR
    },
    loginBtn: {
        backgroundColor: Constants.COLORS.RED,
        color: Constants.COLORS.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR,
        textAlign: 'center',
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        padding: Constants.PADDING.SMALL
    },
    forgotPassword: {
        fontSize: 15,
        fontFamily: 'Montserrat',
        marginBottom: Constants.MARGIN.SMALL,
        color: Constants.COLORS.BLUE
    },
    icon: {
        marginRight: Constants.MARGIN.SMALL
    },
    createAccount: {
        marginTop: Constants.MARGIN.REGULAR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label3: {
        fontSize: 15,
    },
    createAccountLabel: {
        fontSize: 15,
        color: Constants.COLORS.BLUE
    },
    logoContainer: {
        flexDirection: 'row',
    }

})

export {loginStyle}