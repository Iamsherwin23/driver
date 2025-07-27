import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
export default function Rating() {
    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>Rate Us</CustomText>
            </View>

            {/* Choices */}
            <View style={globalStyle.choicesContainer}>
            </View>

            {/* Main Content */}
            <View></View>
        </View>
    )
}