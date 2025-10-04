import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Constants } from '../../../constants/constants';
import CustomText from '../../../components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import AnnouncementModal from '../announcement/Annnouncement';
import { globalStyle } from '../../../utils/styles.js';
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import PassengerTargetCard from './PassengerTargetCard.js';
import { BookingContainerPage } from './bookingPage/BookingContainerPage.js';
import CustomLoading from '../../../components/CustomLoading.js';
const Tab = createMaterialTopTabNavigator();

export default function Home() {
    const [announceVisible, setAnnounceVisible] = useState(false);
    const [netStatus, setNetStatus] = useState('Checking...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setNetStatus(state.isConnected ? 'Online' : 'Offline');
        });

        return () => {
            unsubscribe(); // cleanup on unmount
        };
    }, []);

    const triggerHomeLoadingTrue = () => {
        console.log("TRIGGERED TRUE")
        setLoading(true);
    }
    const triggerHomeLoadingFalse = () => {
        console.log("TRIGGERED FALSE")
        setLoading(false);
    }

    return (
        <View style={style.view}>
            {loading && <CustomLoading />}
            <View style={style.headerContainer}>
                <CustomText
                    style={[
                        style.netStatus,
                        {
                            color: netStatus === 'Online' ? Constants.COLORS.GREEN : Constants.COLORS.RED,
                            borderColor: netStatus === 'Online' ? Constants.COLORS.GREEN : Constants.COLORS.RED,
                        }
                    ]}
                >
                    {netStatus}
                </CustomText>
                {netStatus === 'Offline' &&
                    <CustomText style={style.warningMesage}>
                        Chek your internet connection.
                    </CustomText>
                }

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={globalStyle.iconContainer}
                    onPress={() => setAnnounceVisible(true)}
                >
                    <Ionicons
                        name={'megaphone-outline'}
                        size={30}
                        style={[globalStyle.announceIcon, { color: Constants.COLORS.BLACK }]}
                    />
                </TouchableOpacity>
            </View>

            <AnnouncementModal
                visible={announceVisible}
                onClose={() => setAnnounceVisible(false)}
            />

            {/*show this when offline */}
            {
                netStatus === "Offline" ?
                    <PassengerTargetCard netStatus={netStatus} />
                    : <BookingContainerPage
                        triggerHomeLoadingTrue={triggerHomeLoadingTrue}
                        triggerHomeLoadingFalse={triggerHomeLoadingFalse}
                    />
            }

            {/* show this when online */}

        </View>
    );
}


const style = StyleSheet.create({
    view: {
        flex: 1
    },
    headerContainer: {
        flex: 0,
        padding: Constants.PADDING.REGULAR,
        paddingTop: Constants.PADDING.MEDIUM,
    },
    netStatus: {
        marginBottom: 10,
        top: 15,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    warningMesage: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        top: 15,
    }

});
