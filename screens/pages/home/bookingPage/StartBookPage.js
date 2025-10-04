import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../../../../assets/General/Utils';
import { Constants } from '../../../../constants/constants';
import { handleAcceptNow } from '../../../../services/service';
import CustomMessageModal from '../../../../components/CustomMessageModal';

export function StartBookPage({ route, navigation, triggerHomeLoadingFalse, triggerHomeLoadingTrue }) {
    const { booking } = route.params || {};

    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');

    const handleAccept = async () => {
        try {
            triggerHomeLoadingTrue();
            const response = await handleAcceptNow(booking.bookid);
            if (response.status == 200) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message);

                setTimeout(() => {
                    setModalVisible(false);
                    navigation.navigate('BookingNavigator');
                }, 3000);
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

    // Animated value must be defined inside the component
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // create the looped animation and keep a reference so we can stop on unmount
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(slideAnim, {
                    toValue: 8, // how far arrow moves to the right
                    duration: 500,
                    easing: Easing.inOut(Easing.linear),
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.inOut(Easing.linear),
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        // cleanup: stop animation on unmount
        return () => animation.stop();
    }, [slideAnim]);

    return (
        <View style={style.container}>
            <CustomMessageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message={responseMsg}
                response={responseStatus}
            />
            {/* Show booking details */}
            <View >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name={'caret-back'} size={35} color={Constants.COLORS.RED} />
                </TouchableOpacity>
            </View>
            <Text style={style.title}>Pick Up Now</Text>
            {booking ? (
                <>
                    <Text style={style.distance}>{booking.distance ? booking.distance : '0'}km</Text>
                    <View style={style.content}>
                        <View style={style.specialHeader}>
                            <Text style={style.specialtext}>{booking.category}</Text>
                            <Text>{booking.passenger_name}</Text>
                        </View>
                        <View style={style.bookingContent}>
                            <View style={style.detail1}>
                                <Ionicons
                                    name={'ellipse-outline'}
                                    size={25}
                                    style={style.icon}
                                />
                                <Text style={style.text}>{booking.location_from}</Text>
                            </View>
                            <View style={style.detail2}>
                                <Ionicons
                                    name={'ellipsis-vertical-outline'}
                                    size={25}
                                    style={style.icon}
                                />
                            </View>
                            <View style={style.detail2}>
                                <Ionicons
                                    name={'ellipsis-vertical-outline'}
                                    size={25}
                                    style={style.icon}
                                />
                            </View>
                            <View style={style.detail3}>
                                <Ionicons
                                    name={'location-sharp'}
                                    size={25}
                                    style={style.icon}
                                />
                                <Text style={style.text}>{booking.location_to}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={style.bookingSummary}>
                        <View style={style.bookingSummaryWrapper}>
                            <Ionicons
                                name={'cash-sharp'}
                                size={30}
                                style={style.icon}
                            />
                            <Text style={style.summary2}>
                                ₱{formatCurrency(booking.fare)}
                            </Text>
                        </View>
                    </View>
                    {/* Button to go to map */}
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('BookingNavigator')}
                        onPress={handleAccept}
                        style={style.button}
                    >
                        <Animated.View
                            style={[
                                style.iconButton,
                                { transform: [{ translateX: slideAnim }] },
                            ]}
                        >
                            <Ionicons name={'arrow-forward-outline'} size={36} color={Constants.COLORS.WHITE} />
                        </Animated.View>
                        <Text style={style.buttonText}>Start Now</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={style.text}>No booking data found</Text>
            )}

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingBottom: Constants.PADDING.REGULAR,
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        flex: 1
    },
    title: {
        paddingLeft: Constants.PADDING.SMALL,
        fontSize: Constants.SIZE.HEADINGS,
        fontWeight: 'bold',
        color: Constants.COLORS.RED,
    },
    distance: {
        paddingLeft: Constants.PADDING.SMALL,
        fontSize: Constants.SIZE.MEDIUM,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        backgroundColor: 'white',
        color: 'black',
        elevation: 5,
        borderRadius: 10,
        marginBottom: 10,
        paddingBottom: Constants.PADDING.REGULAR,
    },

    specialHeader: {
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        paddingTop: Constants.PADDING.REGULAR,
        paddingBottom: Constants.PADDING.SMALL,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    specialtext: {
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        alignSelf: 'flex-start',
        paddingHorizontal: 6,   // add some spacing inside the highlight
        paddingVertical: 0,
    },
    bookingContent: {
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
    },
    text: {
        fontSize: Constants.SIZE.REGULAR,
        paddingLeft: 10,
        paddingRight: 10,
    },
    detail1: {
        flexDirection: 'row'
    },
    detail2: {
        flexDirection: 'row'
    },
    detail3: {
        flexDirection: 'row'
    },
    bookingSummary: {
        backgroundColor: 'white',
        color: 'black',
        elevation: 5,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 18,
        padding: Constants.PADDING.SMALL,
    },
    bookingSummaryWrapper: {
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        paddingTop: Constants.PADDING.SMALL,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        color: Constants.COLORS.RED,
        fontWeight: 'bold'
    },
    summary2: {
        fontSize: Constants.SIZE.MEDIUM,
        fontWeight: 'bold',
        color: Constants.COLORS.RED,
    },
    button: {
        backgroundColor: Constants.COLORS.RED,
        flexDirection: 'row',
        padding: 25,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',   // makes children centered horizontally
        position: 'relative',       // so we can absolutely position the icon
    },
    iconButton: {
        color: Constants.COLORS.WHITE,
        position: 'absolute',
        left: 10,                   // stick to left edge
    },
    buttonText: {
        color: Constants.COLORS.WHITE,
        fontSize: Constants.SIZE.MEDIUM,
        fontWeight: 'bold',
    },

});
