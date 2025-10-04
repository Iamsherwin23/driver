import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Constants } from '../../../../constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../../../assets/General/Utils';
import { handleCancelNow, handleStartNow, handleFinishNow } from '../../../../services/service';
import CustomMessageModal from '../../../../components/CustomMessageModal';

export function StartMapBooking({ navigation, data, nodata, triggerHomeLoadingFalse, triggerHomeLoadingTrue, handleReload }) {
    const [region, setRegion] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');

    const handleCancel = async () => {
        try {
            triggerHomeLoadingTrue();
            const response = await handleCancelNow(data.bookid);
            if (response.status == 200) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message);
                handleReload();
            }
            else if (response.status == 500 || response.status == 404) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            else {
                setModalVisible(true)
                setResponseMsg(response)
            }

        } catch (err) {
            setModalVisible(true)
            setResponseStatus(500);
            setResponseMsg(err.toString())
        }
        triggerHomeLoadingFalse();
    }

    const handleStart = async () => {
        try {
            triggerHomeLoadingTrue();
            const response = await handleStartNow(data.bookid);
            if (response.status == 200) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message);
                handleReload();
            }
            else if (response.status == 500 || response.status == 404) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            else {
                setModalVisible(true)
                setResponseMsg(response)
            }

        } catch (err) {
            setModalVisible(true)
            setResponseStatus(500);
            setResponseMsg(err.toString())
        }
        triggerHomeLoadingFalse();
    }

    const handleFinish = async () => {
        try {
            triggerHomeLoadingTrue();
            const response = await handleFinishNow(data.bookid);
            if (response.status == 200) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message);
                handleReload();
            }
            else if (response.status == 500 || response.status == 404) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            else {
                setModalVisible(true)
                setResponseMsg(response)
            }

        } catch (err) {
            setModalVisible(true)
            setResponseStatus(500);
            setResponseMsg(err.toString())
        }
        triggerHomeLoadingFalse();
    }

    return (
        <View style={styles.container}>
            <CustomMessageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message={responseMsg}
                response={responseStatus}
            />
            <Text style={styles.title}>Pick Up</Text>

            <Text style={styles.category}>{data.category}</Text>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                {/* {maploading || !region ? (
                        <ActivityIndicator size="large" color={Constants.COLORS.RED} style={{ flex: 1 }} />
                    ) : (
                        <MapView
                            style={styles.map}
                            initialRegion={region}
                            showsUserLocation
                        />
                    )} */}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={region}
                    showsUserLocation
                />
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.price}>₱{formatCurrency(data.fare)} </Text>
                <View style={styles.bookingContent}>
                    <View style={styles.passengerRow}>
                        <View>
                            <Text style={styles.passenger}>{data.passenger_name}</Text>
                        </View>
                        <View>
                            <Text style={styles.passenger}>{data.passenger_contact}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name={'location-sharp'} size={35} style={styles.icon} />
                        <View>
                            <Text style={styles.text}>Pick Up</Text>
                            <Text style={styles.text1}>{data.location_from}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name={'ellipsis-vertical-outline'} size={35} style={styles.icon} />
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name={'location-sharp'} size={35} style={styles.icon} />
                        <View>
                            <Text style={styles.text}>Drop off</Text>
                            <Text style={styles.text1}>{data.location_to}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        {(data.cancel_flag != 1 && data.start_flag != 1 && data.finish_flag != 1) &&
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleCancel}
                            >
                                <Ionicons name="close-circle-outline" size={20} color="white" />
                                <Text style={styles.buttonText}>Cancel Book</Text>

                            </TouchableOpacity>
                        }

                        {data.start_flag != 1 &&
                            <TouchableOpacity
                                style={[styles.button, styles.startButton]}
                                onPress={handleStart}
                            >
                                <Ionicons name="golf-outline" size={20} color="white" />
                                <Text style={styles.buttonText}>Start </Text>
                            </TouchableOpacity>
                        }

                        {(data.start_flag == 1 && data.finish_flag != 1) &&
                            <TouchableOpacity
                                style={[styles.button, styles.startButton]}
                                onPress={handleFinish}
                            >
                                <Ionicons name="golf-outline" size={20} color="white" />
                                <Text style={styles.buttonText}>Finish </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: {
        padding: Constants.PADDING.SMALL,
        paddingBottom: Constants.PADDING.REGULAR,
        fontSize: Constants.SIZE.LARGE,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mainContainer: {
        backgroundColor: Constants.COLORS.WHITE,
        paddingBottom: 40
    },
    category: {
        fontSize: Constants.SIZE.MEDIUM,
        backgroundColor: Constants.COLORS.RED,
        color: Constants.COLORS.WHITE,
        padding: Constants.PADDING.SMALL,
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    mapContainer: {
        width: '100%',
        height: 250,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    price: {
        fontSize: Constants.SIZE.MEDIUM,
        margin: 25,
        marginLeft: 100,
        marginRight: 100,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: Constants.COLORS.RED,
        color: Constants.COLORS.WHITE,
        padding: Constants.PADDING.SMALL,
    },
    bookingContent: {
        paddingHorizontal: Constants.PADDING.REGULAR,
    },
    detailRow: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    text: {
        fontSize: Constants.SIZE.REGULAR,
        marginLeft: 10,
    },
    text1: {
        fontSize: Constants.SIZE.REGULAR,
        marginLeft: 10,
        color: Constants.COLORS.RED,
        fontWeight: 'bold',
    },
    icon: {
        color: Constants.COLORS.RED,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderColor: Constants.COLORS.RED,
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    startButton: { backgroundColor: Constants.COLORS.BLUE },
    cancelButton: { backgroundColor: Constants.COLORS.RED },
    buttonText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    passengerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    passenger: {
        fontWeight: 'bold',
        fontSize: Constants.SIZE.LABELS,
    }
});
