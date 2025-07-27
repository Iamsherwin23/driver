import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomText from '../../../components/CustomText.js';
import { CustomButton } from '../../../components/CustomButton.js';
import { Constants } from '../../../constants/constants.js';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function TaripaSection({ navigation, routeName }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={style.titleContainer}>
                <CustomText style={style.title}>Taripa</CustomText>
            </View>

            <View style={style.tableContainer}>
                <View style={style.table}>
                    {/* Top Section */}
                    <View style={style.tableTop}>
                        <CustomText style={[
                            style.text,
                            {
                                fontFamily: 'Montserrat-Bold',
                                textAlign: 'center',
                                color: Constants.COLORS.WHITE,
                                borderWidth: 0
                            }
                        ]}>
                            Signal village Bicutan tricycle operators & drivers association (SVBTODA)
                        </CustomText>
                    </View>

                    {/* Mid Section */}
                    <View style={style.tableMid}>
                        {/* Mid section left side */}
                        <View style={style.tableMid_leftSection}>

                            <View style={style.leftSection_top}>
                                <View style={{ flexDirection: 'row' }}>
                                    <CustomText style={[style.text, { width: '25%', fontSize: Constants.SIZE.SMALL }]}>Minimum Fare (₱12.00)</CustomText>
                                    <CustomText style={[style.text, { width: '25%', fontSize: Constants.SIZE.SMALL }]}>In excess there of per km (₱1.00)</CustomText>
                                    <CustomText style={[style.text, { width: '25%', fontSize: Constants.SIZE.SMALL }]}>Discounted fare (20% Discount)</CustomText>
                                    <CustomText style={[style.text, { width: '25%', fontSize: Constants.SIZE.SMALL }]}>In excess there of per km (₱1.00)</CustomText>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <CustomText style={[style.text, { width: '50%', fontSize: Constants.SIZE.SMALL, fontFamily: 'Montserrat-Bold', fontSize: Constants.SIZE.REGULAR}]}>Regular</CustomText>
                                    <CustomText style={[style.text, { width: '50%', fontSize: Constants.SIZE.SMALL, fontFamily: 'Montserrat-Bold', backgroundColor: Constants.COLORS.RED }]}>Student/Senior Citizens/ PWDs/Pregnant/Solo Parent</CustomText>
                                </View>
                            </View>
                        </View>
                        {/* Mid section right side */}
                        <View style={style.tableMid_rightSection}>
                            <View style={{justifyContent:'center', width: '50%', borderWidth: 1, borderColor: Constants.COLORS.WHITE}}>
                                <CustomText style={[style.text, {fontSize: Constants.SIZE.SMALL, fontFamily: 'Montserrat-Bold', fontSize: Constants.SIZE.SMALL, borderWidth: 0, textAlign: 'center'}]}>Landmark (Vise-Versa)</CustomText>
                            </View>
                            <View style={{justifyContent:'center', width: '50%', borderWidth: 1, borderColor: Constants.COLORS.WHITE}}>
                                <CustomText style={[style.text, {fontSize: Constants.SIZE.SMALL, fontFamily: 'Montserrat-Bold', fontSize: Constants.SIZE.SMALL, borderWidth: 0, textAlign: 'center'}]}>Distance (Km)</CustomText>
                            </View>
                        </View>
                    </View>

                    {/* Bottom Section */}
                    <View style={style.tableBottom}>
                        <View style={style.tableBottom_right}>

                        </View>
                        <View style={style.tableBottom_left}>
                            
                        </View>
                    </View>
                </View>
            </View>

            <View style={style.footer}>
                <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.REGULAR} onPress={() => navigation.navigate(routeName)} text={'Back'} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    titleContainer: {
        padding: Constants.PADDING.SMALL,
        paddingBottom: 0,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.MEDIUM,
        color: Constants.COLORS.DARK_RED
    },
    tableContainer: {
        flex: 1,
        padding: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE
    },
    // table
    table: {
        flex: 1,
        borderWidth: 1,
        borderColor: Constants.COLORS.RED,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        paddingTop: Constants.PADDING.SMALL,
        paddingBottom: Constants.PADDING.SMALL
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: Constants.SIZE.REGULAR,
        color: Constants.COLORS.WHITE,
        textAlign: 'center',
        borderWidth: 1,
        padding: 2,
        borderColor: Constants.COLORS.WHITE
    },
    tableTop: {
        backgroundColor: Constants.COLORS.RED,
        padding: Constants.PADDING.SMALL
    },
    tableMid: {
        backgroundColor: Constants.COLORS.BLUE,
        flexDirection: 'row'
    },
    tableBottom: {
        flex: 1
    },
    tableMid_leftSection: {
        flexDirection: 'column',
        flex: 0.7
    },
    tableMid_rightSection: {
        flex: 0.3,
        flexDirection: 'row'
    },
    // footer section
    footer: {
        alignItems: 'center',
        padding: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE
    }
});