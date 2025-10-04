import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Constants } from '../../../../constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fetchCurrentBookings, fetchMyBookings } from '../../../../services/service';
import CustomText from '../../../../components/CustomText';
import { formatCurrency } from '../../../../assets/General/Utils';
import { StartMapBooking } from './StartMapBooking';
import { ListBookingPage } from './ListBookingPage';

export function BookingNavigator({ triggerHomeLoadingTrue, triggerHomeLoadingFalse, navigation }) {
    const [showList, setShowList] = useState(true);

    const [data, setData] = useState([]);
    const [nodata, setNoData] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const [reload, setReload] = useState(false);

    const [mybooking, setMyBooking] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const init = async () => {
                try {
                    triggerHomeLoadingTrue();

                    // Check if user has ongoing booking
                    const myResponse = await fetchMyBookings();
                    if (myResponse.status === 200) {
                        setMyBooking(myResponse.myBookingData);
                        setShowList(false);
                        setRefreshing(false);
                        return;
                    }
                    // Otherwise fetch all current bookings
                    const response = await fetchCurrentBookings();
                    if (response.status === 200) {
                        setShowList(true);
                        setData(response.bookingData);
                        response.bookingData.length < 1 && setNoData("No Bookings.");
                    }
                    else if (response.status === 500) {
                        setShowList(true);
                        setNoData("Booking didn't load right. Please refresh.");
                    }
                } catch (err) {
                    setShowList(true);
                    setNoData("Something went wrong. Please check your internet connection.");
                } finally {
                    triggerHomeLoadingFalse();
                    setReload(false);
                }
            };

            init();
        }, [navigation, reload])
    );

    const handleReload = () => {
        setReload(true);
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            // Check if user has ongoing booking
            const myResponse = await fetchMyBookings();
            if (myResponse.status === 200) {
                setMyBooking(myResponse.myBookingData);
                setShowList(false);
                setRefreshing(false);
                return;
            }
            // Otherwise fetch all current bookings
            const response = await fetchCurrentBookings();
            if (response.status === 200) {
                setShowList(true);
                setData(response.bookingData);
                response.bookingData.length < 1 && setNoData("No Bookings.");
            }
            else if (response.status === 500) {
                setShowList(true);
                setNoData("Booking didn't load right. Please refresh.");
            }
            setRefreshing(false);
        } catch (err) {
            setRefreshing(false);
            setShowList(true);
            setNoData("Something went wrong. Please check your internet connection.");
        } finally {
            setRefreshing(false);
        }

    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {
                showList ?
                    <ListBookingPage
                        data={data}
                        nodata={nodata}
                        navigation={navigation}
                    /> :
                    <StartMapBooking
                        data={mybooking}
                        nodata={nodata}
                        handleReload={handleReload}
                        navigation={navigation}
                        triggerHomeLoadingTrue={triggerHomeLoadingTrue}
                        triggerHomeLoadingFalse={triggerHomeLoadingFalse}
                    />

            }
        </ScrollView>
    )

}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'black',
        paddingBottom: Constants.PADDING.REGULAR,
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        flex: 1
    },
})