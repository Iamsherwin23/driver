import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
export default function About() {
    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>About</CustomText>
            </View>

            {/* Main Content */}
            <View style={style.container}>
                <CustomText style={style.paragraph}>
                    At TrikeFare, we’re committed to making local transportation more convenient and transparent for everyone. We understand the challenges commuters face when it comes to estimating fair and accurate tricycle fares. That's why we developed TrikeFare a user-friendly solution designed to simplify fare calculation for tricycle rides.
                </CustomText>

                <CustomText style={style.paragraph}>
                    Whether you're a daily commuter, or a tricycle driver, TrikeFare takes the guesswork out of fare pricing. Our platform uses standard fare rates to ensure every ride is calculated with fairness and accuracy. By bridging the gap between drivers and passengers, we aim to promote trust, reduce fare disputes, and enhance the overall commuting experience.
                </CustomText>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: Constants.PADDING.REGULAR
    },
    paragraph: {
        fontFamily: 'Montserrat-Bold',
        textAlign: 'justify',
        fontSize: 20,
        marginBottom: Constants.MARGIN.REGULAR,
        color: Constants.COLORS.BLACK
    }
});