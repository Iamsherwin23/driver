import { StyleSheet } from 'react-native';
import { Constants } from '../constants/constants';

const globalStyle = StyleSheet.create({
    container: {
        flex: 1
    },

    // Header
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
    iconContainer: {
        position: 'absolute',
        right: '10%',
        top: 50,
    },
    announceIcon: {
        transform: [{ rotate: '-30deg' }],
        color: Constants.COLORS.WHITE
    },

});

export { globalStyle };