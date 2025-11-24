import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';

import { Ionicons } from '@expo/vector-icons';
import AnnouncementModal from '../announcement/Annnouncement';
import { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { fetchCamera } from '../../../services/service';

export default function CCTV() {
    const [announceVisible, setAnnounceVisible] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadCameraData();
    }, []);

    const loadCameraData = async () => {
        setLoading(true);
        const response = await fetchCamera();
        if (response.camera) {
            setData(response.camera);
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadCameraData();
        setRefreshing(false);
    };

    const cam1 = data?.camera1?.ip_address;
    const cam2 = data?.camera2?.ip_address;

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

            <AnnouncementModal
                visible={announceVisible}
                onClose={() => setAnnounceVisible(false)}
            />

            <ScrollView
                style={style.main}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                {/* Camera 1 */}
                <View style={style.container}>
                    {cam1 ? (
                        <WebView
                            source={{ uri: `http://${cam1}/` }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            mediaPlaybackRequiresUserAction={false}
                            allowsInlineMediaPlayback={true}
                            style={style.stream}
                        />
                    ) : (
                        <Text style={style.offline}>Camera 1 Offline</Text>
                    )}
                    <CustomText style={style.text}>Camera 1</CustomText>
                    <CustomText style={style.text1}>{`http://${cam1}`}</CustomText>
                </View>

                {/* Camera 2 */}
                <View style={style.container}>
                    {cam2 ? (
                        <WebView
                            source={{ uri: `http://${cam2}/` }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            mediaPlaybackRequiresUserAction={false}
                            allowsInlineMediaPlayback={true}
                            style={style.stream}
                        />
                    ) : (
                        <Text style={style.offline}>Camera 2 Offline</Text>
                    )}
                    <CustomText style={style.text}>Camera 2</CustomText>
                    <CustomText style={style.text1}>{`http://${cam2}`}</CustomText>
                </View>

            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    main: {
        padding: Constants.PADDING.SMALL,
    },
    container: {
        flex: 1,
        marginBottom: 10,
        borderRadius: 10,
        padding: Constants.PADDING.REGULAR,
    },
    stream: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        backgroundColor: Constants.COLORS.WHITE_GRAY,
    },
    text: {
        textAlign: 'center',
        fontSize: Constants.SIZE.REGULAR,
        fontWeight: 'bold',
    },
    text1: {
        textAlign: 'center',
        fontSize: Constants.SIZE.X_SMALL,
        color: Constants.COLORS.RED,
    },
    offline: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        backgroundColor: '#ddd',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
    },
});
