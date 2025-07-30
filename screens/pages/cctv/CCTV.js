import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
export default function CCTV() {
    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>CCTV</CustomText>
            </View>

            {/* Main Content */}
            <View style={style.container}>
                
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