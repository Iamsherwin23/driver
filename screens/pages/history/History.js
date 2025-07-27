import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
import { CustomCard } from '../../../components/CustomCard';
import { CustomModal } from '../../../components/CustomModal';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function History() {
    const [isModal, setIsModal] = useState(false);
    const [viewData, setViewData] = useState({});

    const openModal = (trigger, data) => {
        setIsModal(trigger);
        if (data) {
            viewData.name = data.name
            viewData.plateNumber = data.plateNumber
            viewData.date = data.date
            viewData.time = data.time
            viewData.pickUpLoc = data.pickUpLoc
            viewData.dropOffLoc = data.dropOffLoc
            viewData.distance = data.distance
            viewData.fare = data.fare
            viewData.ride = data.ride
        }
    }

    const data = [
        {
            name: "Kianu",
            plateNumber: "XXX-123-ZQB",
            date: "25-07-2-25",
            time: "10:23 pm",
            pickUpLoc: "San Isidro",
            dropOffLoc: "California, USA",
            distance: "1650.67 km",
            fare: "Php 150,675.00",
            ride: "Special"
        },
        {
            name: "Invoker Kael",
            plateNumber: "QQWER-750",
            date: "25-07-2-25",
            time: "10:23 pm",
            pickUpLoc: "San Isidro",
            dropOffLoc: "California, USA",
            distance: "1650.67 km",
            fare: "Php 150,675.00",
            ride: "Special"
        },
        {
            name: "Lalatina",
            plateNumber: "DRKNSS-404",
            date: "25-07-2-25",
            time: "10:23 pm",
            pickUpLoc: "San Isidro",
            dropOffLoc: "Tokyo, Japan",
            distance: "2500.67 km",
            fare: "Php 350,675.00",
            ride: "Special"
        },
        {
            name: "Lalatina",
            plateNumber: "DRKNSS-404",
            date: "25-07-2-25",
            time: "10:23 pm",
            pickUpLoc: "San Isidro",
            dropOffLoc: "Tokyo, Japan",
            distance: "2500.67 km",
            fare: "Php 350,675.00",
            ride: "Special"
        }
    ]
    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE, position: 'relative' }, globalStyle.container]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>History</CustomText>
            </View>

            {/* Main Content */}
            <ScrollView style={style.main}>
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
                                    <CustomText style={[style.textHeader, { fontSize: Constants.SIZE.MEDIUM }]}>5</CustomText>
                                </View>
                                <CustomText style={style.textHeader}>
                                    {viewData.name}
                                </CustomText>
                                <CustomText style={style.textHeader}>
                                    {viewData.plateNumber}
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
                            <CustomText style={[style.text, {marginTop: Constants.MARGIN.REGULAR}]}>
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