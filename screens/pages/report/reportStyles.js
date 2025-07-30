import { StyleSheet } from 'react-native';
import { Constants } from '../../../constants/constants';

const reportStyles = StyleSheet.create({
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
    header: {
        marginTop: 20,
        padding: 10,
        backgroundColor:Constants.COLORS.RED,
        borderRadius: 20,
    },

    headertext: {
        color: Constants.COLORS.WHITE,
        textAlign: 'center',
        fontSize: 25
    },
    concernHeader: {
        marginTop: 20,
        padding: 10,
        backgroundColor:Constants.COLORS.RED,
        borderRadius: 20,
    },
    concernText: {
        color: Constants.COLORS.WHITE,
        textAlign: 'center',
        fontSize: 17
    },
    textArea: {
        borderColor: Constants.COLORS.GRAY,
        borderRadius: 10,
        padding: 20,
        fontSize: 15,
        backgroundColor: Constants.COLORS.WHITE,
        minHeight: 200,
        marginTop: 10,
    },

    inputContainer: {
        marginTop: 10,
    },

    submitContainer: {
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'Montserrat',
    },
    submitButton: {
        backgroundColor: Constants.COLORS.RED,
        paddingVertical: 10,
        paddingHorizontal: 30,

    },
    submitText: {
        color: Constants.COLORS.WHITE,
        textAlign: 'center',
        fontWeight: 800
    },
    charCount: {
        textAlign: 'right',
        color: Constants.COLORS.GRAY,
        marginTop: 5,
        marginRight: 5,
        fontSize: 12,
    },

})

export {reportStyles}