import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import AnnouncementModal from '../announcement/Annnouncement';
import { useState } from 'react';
import { WebView } from 'react-native-webview';

export default function CCTV() {
    const [announceVisible, setAnnounceVisible] = useState(false);

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>CCTV</CustomText>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={globalStyle.iconContainer}
                    onPress={() => setAnnounceVisible(true)}
                >
                    <Ionicons name={'megaphone-outline'} size={30} style={globalStyle.announceIcon} />
                </TouchableOpacity>
            </View>

            <AnnouncementModal visible={announceVisible} onClose={() => setAnnounceVisible(false)} />

            {/* Main Content */}
            <View style={style.container}>
                <WebView
                    source={{ uri: 'httpss://www.youtube.com/watch?v=werZ36hNjMEs' }}  // <-- your ESP32 stream
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    style={style.stream}
                    allowsInlineMediaPlayback={true}
                />
                <CustomText style={style.text}>Camera 1</CustomText>
            </View>
            <View style={style.container}>
                <WebView
                    source={{ uri: 'httpss://www.youtube.com/watch?v=werZ36hNjMEs' }}  // <-- your ESP32 stream
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    style={style.stream}
                    allowsInlineMediaPlayback={true}
                />
                <CustomText style={style.text}>Camera 2</CustomText>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        padding: Constants.PADDING.REGULAR,
    },
    stream: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'black'
    },
    text: {
        textAlign: 'center',
        margin: 5,
        fontSize: Constants.SIZE.REGULAR,
        fontWeight: 'bold'
    }
});
