import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Constants } from '../../../constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { fetchAnnouncement } from '../../../services/service';
import RenderHtml from 'react-native-render-html';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';


export default function AnnouncementModal({ visible, onClose, homeColor }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const { width } = useWindowDimensions();

    useEffect(() => {
        const initAnnouncementList = async () => {
            setLoading(true);
            const response = await fetchAnnouncement();
            if (response.announcementData) {
                setData(response.announcementData);
            }
            setLoading(false);
        };

        initAnnouncementList();
    }, [refreshKey]);

    const markedDates = data.reduce((acc, event) => {
        const start = new Date(event.event_date);
        const end = new Date(event.event_date_end);
        const current = new Date(start);

        while (current <= end) {
            const dateStr = current.toISOString().split('T')[0];
            acc[dateStr] = {
                marked: true,
                dotColor: 'red',
                selected: dateStr === selectedDate,
                selectedColor: '#ff6347',
            };
            current.setDate(current.getDate() + 1);
        }

        return acc;
    }, {});


    const matchingEvents = data.filter(event => {
        const selected = new Date(selectedDate);
        return (
            selected >= new Date(event.event_date) &&
            selected <= new Date(event.event_date_end)
        );
    });

    const onRefresh = async () => {
        setRefreshing(true);
        const response = await fetchAnnouncement();
        if (response.announcementData) {
            setData(response.announcementData);
        }
        setRefreshing(false);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <ScrollView style={styles.modalContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={{paddingBottom: 50}}>
                        <Text style={styles.title}>Announcement</Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.5}>
                            <Ionicons style={styles.closeText} name={'close-outline'} size={30} />
                        </TouchableOpacity>
                        <Calendar
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={markedDates}
                            style={styles.calendar}
                            theme={{
                                selectedDayBackgroundColor: Constants.COLORS.RED,
                                todayTextColor: Constants.COLORS.RED,
                                arrowColor: Constants.COLORS.RED,
                            }}
                        />

                        {selectedDate && matchingEvents.length > 0 && matchingEvents.map((event, idx) => (
                            <View key={idx} style={styles.eventBox}>
                                <Text style={styles.eventTitle}>{event.event_name}</Text>
                                <ScrollView style={styles.descriptionScroll}>
                                    <Text style={{ fontWeight: '600' }}>{event.description}</Text>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={{ html: event.details }}
                                    />
                                </ScrollView>
                            </View>
                        ))}
                    </View>
                </ScrollView>

            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'center',
        backgroundColor: Constants.COLORS.RED_TINT,
    },
    descriptionScroll: {
        maxHeight: 300, // adjust as needed
        marginTop: 5,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    calendar: {
        borderRadius: 10,
    },
    eventBox: {
        marginTop: 15,
        padding: 10,
        backgroundColor: Constants.COLORS.RED_TINT,
        borderRadius: 10,
    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    closeBtn: {
        position: 'absolute',
        alignSelf: 'center',
        padding: 8,
        backgroundColor: Constants.COLORS.RED_TINT,
        borderRadius: 50,
        right: '5%',
    },
    closeText: {
        color: Constants.COLORS.RED,
        fontSize: 15,
        fontWeight: 800,
    },
});
