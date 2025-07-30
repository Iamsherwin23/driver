import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import AnnouncementModal from '../announcement/Annnouncement';
import { useState } from 'react';

export default function CCTV() {
    const [announceVisible, setAnnounceVisible] = useState(false);

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>CCTV</CustomText>
                <TouchableOpacity activeOpacity={0.5} style={globalStyle.iconContainer} onPress={() => setAnnounceVisible(true)}>
                    <Ionicons name={'megaphone-outline'} size={30} style={globalStyle.announceIcon} />
                </TouchableOpacity>
            </View>
            <AnnouncementModal visible={announceVisible} onClose={() => setAnnounceVisible(false)} />

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