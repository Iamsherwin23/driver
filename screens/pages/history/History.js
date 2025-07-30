import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
import { CustomCard } from '../../../components/CustomCard';
import { CustomModal } from '../../../components/CustomModal';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { fetchHistory } from '../../../services/service';
import CustomLoading from '../../../components/CustomLoading';

import AnnouncementModal from '../announcement/Annnouncement';

export default function History() {
    const [isModal, setIsModal] = useState(false);
    const [viewData, setViewData] = useState({});
    const [announceVisible, setAnnounceVisible] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const initHistory = async () => {
            setLoading(true);
            const response = await fetchHistory();
            if (response.historyData) {
                setData(response.historyData);
            }
            setLoading(false);
        };

        initHistory();
    }, []);

    const openModal = (trigger, data) => {
        setIsModal(trigger);
        if (data) {
            viewData.rate = data.rate ?? 0
            viewData.name = data.passenger_name
            viewData.date = data.date_booked
            viewData.time = data.time_booked
            viewData.pickUpLoc = data.location_from
            viewData.dropOffLoc = data.location_to
            viewData.distance = data.distance
            viewData.fare = data.fare
            viewData.ride = data.category
            viewData.bookid = data.bookid
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        const response = await fetchHistory();
        if (response.historyData) {
            setData(response.historyData);
        }
        setRefreshing(false);
    };

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE, position: 'relative' }, globalStyle.container]}>
            {loading && <CustomLoading />}

            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>History</CustomText>
                <TouchableOpacity activeOpacity={0.5} style={globalStyle.iconContainer} onPress={() => setAnnounceVisible(true)}>
                    <Ionicons name={'megaphone-outline'} size={30} style={globalStyle.announceIcon} />
                </TouchableOpacity>
            </View>
            <AnnouncementModal visible={announceVisible} onClose={() => setAnnounceVisible(false)} />

            {/* Main Content */}
            <ScrollView style={style.main}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {
                    data.map((data, index) => {
                        return (
                            <CustomCard details={data} key={index} pressFunc={() => openModal(true, data)} />
                        )
                    })
                }
            </ScrollView>
            {/* Modal Content */}
            {
                isModal ? <CustomModal pressFunc={() => openModal(false, {})}>
                    <View style={style.modalContainer}>
                        {/* modal top bar */}
                        <View style={style.modalTopBar}>
                            <Ionicons name={'person-circle'} size={124} color={Constants.COLORS.BLACK} />
                            <View style={{ marginLeft: Constants.MARGIN.SMALL }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name={'star'} size={30} color={Constants.COLORS.YELLOW} />
                                    <CustomText style={[style.textHeader, { fontSize: Constants.SIZE.MEDIUM }]}>{viewData.rate}</CustomText>
                                </View>
                                <CustomText style={style.textHeader}>
                                    {viewData.name}
                                </CustomText>
                                <CustomText style={style.textHeader1}>
                                    Book ID: <CustomText style={{ color: Constants.COLORS.RED }}>
                                        {viewData.bookid}
                                    </CustomText>
                                </CustomText>
                            </View>
                        </View>
                        {/* modal details */}
                        <View style={{ paddingTop: Constants.PADDING.MEDIUM }}>
                            <CustomText style={style.text}>
                                Date: <CustomText style={[style.detailsText]}>{viewData.date}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Time: <CustomText style={[style.detailsText]}>{viewData.time}</CustomText>
                            </CustomText>
                            <CustomText style={[style.text, { marginTop: Constants.MARGIN.REGULAR }]}>
                                Pickup Location: <CustomText style={[style.detailsText]}>{viewData.pickUpLoc}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Drop-off Location: <CustomText style={[style.detailsText]}>{viewData.dropOffLoc}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Distance: <CustomText style={[style.detailsText]}>{viewData.distance}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Fare: <CustomText style={[style.detailsText]}>{viewData.fare}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Ride: <CustomText style={[style.detailsText]}>{viewData.ride}</CustomText>
                            </CustomText>
                        </View>

                    </View>
                </CustomModal> : null
            }
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        padding: Constants.PADDING.SMALL,
        overflow: 'scroll'
    },
    text: {
        fontFamily: 'Montserrat'
    },
    textHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR
    },
    textHeader1: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12
    },
    modalContainer: {
        flex: 1
    },
    modalTopBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsText: {
        fontFamily: 'Montserrat-Bold'
    }
});