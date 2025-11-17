import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Constants } from '../../../../constants/constants';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../../components/CustomText';
import { formatCurrency } from '../../../../assets/General/Utils';

export function ListBookingPage({ navigation, data, nodata }) {
    return (
        <View
            style={style.container}
        >
            {data?.length ? (
                data.map((data) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('StartBookPage', {
                                booking: data
                            });
                        }}
                        style={style.content}
                        key={data.bookid}
                    >
                        <View style={style.header}>
                            <View style={style.headerText}>
                                <Text style={style.headerText}>Pick Up Now</Text>
                                <Text style={style.headerText}>({data.distance ? data.distance : '0'} km) </Text>
                            </View>
                            <View style={style.headerText1}>
                                <Text style={style.headerText2}>

                                    {data.bookings_date}
                                </Text>
                                <Text style={style.headerText2}>

                                    {data.bookings_time}
                                </Text>
                            </View>
                        </View>
                        <View style={style.specialHeader}>
                            <Text style={style.specialtext}>{data.category}</Text>
                            <Text>{data.passenger_name}</Text>
                        </View>
                        <View style={style.bookingContent}>
                            <View style={style.detail1}>
                                <Ionicons
                                    name={'ellipse-outline'}
                                    size={25}
                                    style={style.icon}
                                />
                                <Text style={style.text}>{data.location_from}</Text>
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
                                <Text style={style.text}>{data.location_to}</Text>
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
                                    ₱{formatCurrency(data.fare)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <CustomText>{nodata}</CustomText>
            )}
        </View>
    );
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
    content: {
        backgroundColor: 'white',
        color: 'black',
        elevation: 5,
        borderRadius: 10,
        marginBottom: 10,
    },
    header: {
        paddingBottom: Constants.PADDING.SMALL,
        paddingTop: Constants.PADDING.SMALL,
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        backgroundColor: Constants.COLORS.RED,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: Constants.SIZE.REGULAR,
        color: Constants.COLORS.WHITE,
        fontWeight: 'bold'
    },
    headerText1: {
        fontSize: Constants.SIZE.SMALL,
        paddingLeft: Constants.PADDING.SMALL,
    },
    headerText2: {
        color: Constants.COLORS.WHITE,
        textAlign: 'right',
        justifyContent: 'right',
    },
    specialHeader: {
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        paddingTop: Constants.PADDING.XSMALL,
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
        paddingBottom: Constants.PADDING.XSMALL,
    },
    text: {
        fontSize: Constants.SIZE.X_SMALL,
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
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        paddingBottom: Constants.PADDING.REGULAR,
    },
    bookingSummaryWrapper: {
        paddingTop: Constants.PADDING.SMALL,
        borderTopWidth: 2,
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
    }
})