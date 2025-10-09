import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Constants } from '../../../../constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../../../assets/General/Utils';
import { handleCancelNow, handleStartNow, handleFinishNow } from '../../../../services/service';
import CustomMessageModal from '../../../../components/CustomMessageModal';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

export function StartMapBooking({ navigation, data, nodata, triggerHomeLoadingFalse, triggerHomeLoadingTrue, handleReload }) {
    const [mapLoading, setMapLoading] = useState(true);
    const [region, setRegion] = useState(null);
    const [driverLocation, setDriverLocation] = useState(null);
    const [distanceToPickup, setDistanceToPickup] = useState(null);
    const [distanceToDropoff, setDistanceToDropoff] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        const setupSocket = async () => {
            const userId = await AsyncStorage.getItem('user');

            // Create the socket connection once
            socketRef.current = io('https://trikefarewebsocket.onrender.com', {
                transports: ['websocket', 'polling'],
            });

            // Join user-specific room
            socketRef.current.emit('join', userId);


            socketRef.current.emit('rider_location', (driverLocation) => {
                console.log('rider_location', driverLocation);
            });
        };

        setupSocket();

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.off('rider_location');
                socketRef.current.disconnect();
            }
        };
    }, [driverLocation])

    // Ask for permission and get driver location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Start watching driver's location in real time
            const locationWatcher = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 1, // update every 1 meter
                },
                (loc) => {
                    const current = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    };
                    setDriverLocation(current);

                    if (data?.coordinates_from_lat && data?.coordinates_from_long) {
                        const distance = getDistanceFromLatLonInMeters(
                            current.latitude,
                            current.longitude,
                            parseFloat(data.coordinates_from_lat),
                            parseFloat(data.coordinates_from_long)
                        );
                        setDistanceToPickup(distance);
                    }

                    if (data?.coordinates_to_lat && data?.coordinates_to_long) {
                        const distanceDrop = getDistanceFromLatLonInMeters(
                            current.latitude,
                            current.longitude,
                            parseFloat(data.coordinates_to_lat),
                            parseFloat(data.coordinates_to_long)
                        );
                        setDistanceToDropoff(distanceDrop);
                    }
                }
            );

            return () => {
                locationWatcher && locationWatcher.remove();
            };
        })();
    }, [data]);

    // Calculate distance between two GPS coordinates
    function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // distance in meters
    }

    useEffect(() => {
        if (!data) return;

        const fromLat = parseFloat(data.coordinates_from_lat);
        const fromLng = parseFloat(data.coordinates_from_long);
        const toLat = parseFloat(data.coordinates_to_lat);
        const toLng = parseFloat(data.coordinates_to_long);

        const hasStart = !isNaN(fromLat) && !isNaN(fromLng);
        const hasEnd = !isNaN(toLat) && !isNaN(toLng);

        let calculatedRegion;
        if (hasStart && hasEnd) {
            const midLat = (fromLat + toLat) / 2;
            const midLng = (fromLng + toLng) / 2;

            calculatedRegion = {
                latitude: midLat,
                longitude: midLng,
                latitudeDelta: Math.abs(fromLat - toLat) * 2 || 0.02,
                longitudeDelta: Math.abs(fromLng - toLng) * 2 || 0.02,
            };
        } else if (hasStart) {
            calculatedRegion = {
                latitude: fromLat,
                longitude: fromLng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };
        } else if (hasEnd) {
            calculatedRegion = {
                latitude: toLat,
                longitude: toLng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };
        } else {
            calculatedRegion = {
                latitude: 14.5995, // Manila fallback
                longitude: 120.9842,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };
        }

        setRegion(calculatedRegion);
    }, [data]);

    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');

    const handleCancel = async () => {
        try {
            triggerHomeLoadingTrue();
            const response = await handleCancelNow(data.bookid);
            setModalVisible(true);
            setResponseStatus(response.status);
            setResponseMsg(response.message);
            handleReload();
        } catch (err) {
            setModalVisible(true);
            setResponseStatus(500);
            setResponseMsg(err.toString());
        }
        triggerHomeLoadingFalse();
    };

    const handleStart = async () => {
        try {
            triggerHomeLoadingTrue();
            const response = await handleStartNow(data.bookid);
            setModalVisible(true);
            setResponseStatus(response.status);
            setResponseMsg(response.message);
            handleReload();
        } catch (err) {
            setModalVisible(true);
            setResponseStatus(500);
            setResponseMsg(err.toString());
        }
        triggerHomeLoadingFalse();
    };

    const handleFinish = async () => {
        try {
            triggerHomeLoadingTrue();
            const response = await handleFinishNow(data.bookid);
            setModalVisible(true);
            setResponseStatus(response.status);
            setResponseMsg(response.message);
            handleReload();
        } catch (err) {
            setModalVisible(true);
            setResponseStatus(500);
            setResponseMsg(err.toString());
        }
        triggerHomeLoadingFalse();
    };

    const handleNavigate = () => {
        if (data?.coordinates_to_lat && data?.coordinates_to_long) {
            const lat = parseFloat(data.coordinates_to_lat);
            const lng = parseFloat(data.coordinates_to_long);
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
            Linking.openURL(url);
        } else {
            setModalVisible(true);
            setResponseStatus(400);
            setResponseMsg('Destination coordinates not available.');
        }
    };



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
                {!region ? (
                    <ActivityIndicator size="large" color={Constants.COLORS.RED} style={{ flex: 1 }} />
                ) : (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={region}
                        showsUserLocation
                        onMapReady={() => setMapLoading(false)}
                    >
                        {data?.coordinates_from_lat && data?.coordinates_from_long && (
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(data.coordinates_from_lat),
                                    longitude: parseFloat(data.coordinates_from_long),
                                }}
                                title="Pick Up"
                                pinColor={Constants.COLORS.RED}
                            />
                        )}

                        {data?.coordinates_to_lat && data?.coordinates_to_long && (
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(data.coordinates_to_lat),
                                    longitude: parseFloat(data.coordinates_to_long),
                                }}
                                title="Drop Off"
                                pinColor={Constants.COLORS.BLUE}
                            />
                        )}

                        {driverLocation && (
                            <Marker
                                coordinate={driverLocation}
                                title="Driver Location"
                                description="You are here"
                                pinColor="green"
                            />
                        )}

                        <MapViewDirections
                            origin={{
                                latitude: parseFloat(data.coordinates_from_lat),
                                longitude: parseFloat(data.coordinates_from_long),
                            }}
                            destination={{
                                latitude: parseFloat(data.coordinates_to_lat),
                                longitude: parseFloat(data.coordinates_to_long),
                            }}
                            apikey="AIzaSyD9pyFO6fpx_--KOUHD26p4ZeNKFrY3nM8"
                            strokeWidth={3}
                            strokeColor={Constants.COLORS.RED}
                        />
                    </MapView>
                )}
            </View>

            <View style={styles.mainContainer}>
                <Text style={styles.price}>₱{formatCurrency(data.fare)}</Text>
                <View style={styles.bookingContent}>
                    <View style={styles.passengerRow}>
                        <Text style={styles.passenger}>{data.passenger_name}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (data.passenger_contact) {
                                        Linking.openURL(`tel:${data.passenger_contact}`);
                                    } else {
                                        setModalVisible(true);
                                        setResponseStatus(400);
                                        setResponseMsg('No contact number available.');
                                    }
                                }}
                                style={{ flexDirection: 'column', alignItems: 'center' }}
                            >
                                <Ionicons name="call-outline" size={20} color={Constants.COLORS.GREEN} style={{ marginRight: 5 }} />
                                <Text
                                    style={[
                                        styles.passenger,
                                        { color: Constants.COLORS.GREEN},
                                    ]}
                                >
                                    {data.passenger_contact}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={styles.detailRow}>
                        <Ionicons name="location-sharp" size={35} style={styles.icon} />
                        <View>
                            <Text style={styles.text}>Pick Up</Text>
                            <Text style={styles.text1}>{data.location_from}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name="ellipsis-vertical-outline" size={35} style={styles.icon} />
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name="location-sharp" size={35} style={styles.icon} />
                        <View>
                            <Text style={styles.text}>Drop off</Text>
                            <Text style={styles.text1}>{data.location_to}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        {(data.cancel_flag != 1 && data.start_flag != 1 && data.finish_flag != 1) && (
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                <Ionicons name="close-circle-outline" size={20} color="white" />
                                <Text style={styles.buttonText}>Cancel Book</Text>
                            </TouchableOpacity>
                        )}

                        {(data.start_flag != 1 && distanceToPickup !== null && distanceToPickup <= data.distance_limit) && (
                            <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStart}>
                                <Ionicons name="golf-outline" size={20} color="white" />
                                <Text style={styles.buttonText}>Start</Text>
                            </TouchableOpacity>
                        )}

                        {(data.start_flag == 1 && distanceToDropoff !== null && distanceToDropoff <= data.distance_limit && data.finish_flag != 1) && (
                            <>
                                <TouchableOpacity style={[styles.button, styles.navigateButton]} onPress={handleNavigate}>
                                    <Ionicons name="navigate-outline" size={20} color="white" />
                                    <Text style={styles.buttonText}>Navigate</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleFinish}>
                                    <Ionicons name="flag-outline" size={20} color="white" />
                                    <Text style={styles.buttonText}>Finish</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </View>
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

    navigateButton: { backgroundColor: Constants.COLORS.GREEN },
    startButton: { backgroundColor: Constants.COLORS.BLUE },
    cancelButton: { backgroundColor: Constants.COLORS.RED },
    buttonText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    passengerRow: {
        alignItems: 'center'
    },
    passenger: {
        fontWeight: 'bold',
        fontSize: Constants.SIZE.REGULAR,
    }
});
