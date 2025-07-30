import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
import { reportStyles } from './reportStyles';
import { fetchReportBookings, submitBookingReport } from '../../../services/service';
import RNPickerSelect from 'react-native-picker-select';
import CustomMessageModal from '../../../components/CustomMessageModal';
import { Ionicons } from '@expo/vector-icons';

import AnnouncementModal from '../announcement/Annnouncement';

export default function Report() {
    const [concern, setConcern] = useState('');
    const [announceVisible, setAnnounceVisible] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const initBookingList = async () => {
            setLoading(true);
            const response = await fetchReportBookings();
            if (response.bookingData) {
                setData(response.bookingData);
            }
            setLoading(false);
        };

        initBookingList();
    }, [refreshKey]);

    const handleSubmit = async () => {
        if (!selectedBookingId) {
            setModalVisible(true)
            setResponseMsg('Please select a booking.')
            setResponseStatus(500)
            return;
        }
        if (concern.trim()) {
            const response = await submitBookingReport(selectedBookingId, concern);
            setModalVisible(true)
            setResponseMsg(response.message)
            setResponseStatus(response.status)
            setConcern('');
            if (response.status == 200) {
                setRefreshKey(prev => prev + 1);
            }
        } else {
            setModalVisible(true)
            setResponseMsg('Concern is empty.')
            setResponseStatus(500)
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        const response = await fetchReportBookings();
        if (response.bookingData) {
            setData(response.bookingData);
        }
        setRefreshing(false);
    };

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {/* Header */}
            <CustomMessageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message={responseMsg}
                response={responseStatus}
            />
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>Report</CustomText>
                <TouchableOpacity activeOpacity={0.5} style={globalStyle.iconContainer} onPress={() => setAnnounceVisible(true)}>
                    <Ionicons name={'megaphone-outline'} size={30} style={globalStyle.announceIcon} />
                </TouchableOpacity>
            </View>
            <AnnouncementModal visible={announceVisible} onClose={() => setAnnounceVisible(false)} />
            {/* mainContainer */}
            <View style={reportStyles.main}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={reportStyles.form}>
                        <View style={reportStyles.header}>
                            <CustomText style={reportStyles.headertext}>
                                Submit your report and the Organization will review your report
                            </CustomText>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedBookingId(value)}
                                value={selectedBookingId}
                                placeholder={{ label: 'Select unreported booking...', value: null }}
                                items={data.map((item) => ({
                                    label: `BOOK ID: ${item.bookid} - ${item.passenger_name}`,
                                    value: item.bookid,
                                }))}
                                style={{
                                    inputIOS: {
                                        fontSize: 16,
                                        paddingHorizontal: 10,
                                        borderRadius: 20,
                                        backgroundColor: Constants.COLORS.WHITE,
                                        color: Constants.COLORS.BLACK,
                                        paddingRight: 30,
                                        marginTop: 10,
                                    },
                                    inputAndroid: {
                                        fontSize: 16,
                                        paddingHorizontal: 10,
                                        borderRadius: 20,
                                        backgroundColor: Constants.COLORS.WHITE,
                                        color: Constants.COLORS.BLACK,
                                        paddingRight: 30,
                                        marginTop: 10,
                                    },
                                }}
                            />
                        </View>

                        <View style={reportStyles.concernHeader}>
                            <CustomText style={reportStyles.concernText}>Write your concern</CustomText>
                        </View>

                        <View style={reportStyles.inputContainer}>
                            <TextInput
                                style={reportStyles.textArea}
                                multiline
                                numberOfLines={15}
                                value={concern}
                                onChangeText={(text) => {
                                    if (text.length <= 200) {
                                        setConcern(text);
                                    }
                                }}
                                textAlignVertical="top"
                            />
                            <CustomText style={reportStyles.charCount}>
                                {concern.length}/200
                            </CustomText>
                        </View>
                    </View>
                </ScrollView>
                <View style={reportStyles.submitContainer}>
                    <TouchableOpacity activeOpacity={0.5} style={reportStyles.submitButton} onPress={handleSubmit}>
                        <CustomText style={reportStyles.submitText}>SUBMIT</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
