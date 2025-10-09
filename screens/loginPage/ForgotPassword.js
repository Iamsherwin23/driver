// External imports
import { View, TouchableOpacity, Text, Alert, Image, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomLoading from '../../components/CustomLoading';
import CustomMessageModal from '../../components/CustomMessageModal';
import { Constants } from '../../constants/constants';
import { CustomInput } from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import { isEmail } from '../../assets/General/Utils';
import { sendEmailVerification, sendOTPVerification, setNewPassword } from '../../services/service';

// Custom imports


export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const [process, setProcess] = useState(1);

    const handleEmail = async () => {
        if (!email) {
            setModalVisible(true)
            setResponseMsg('Email is required.')
            setResponseStatus(500)
            return;
        }

        if (!isEmail(email)) {
            setModalVisible(true)
            setResponseMsg('Email is invalid.')
            setResponseStatus(500)
            return;
        }
        setLoading(true);

        try {
            const response = await sendEmailVerification(email);
            if (response.status == 200) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
                // setEmail('');
                setProcess(2);
            }
            else if (response.status == 500 || response.status == 404) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            else {
                setModalVisible(true)
                setResponseStatus(500);
                setResponseMsg(response)
            }
            console.log("RESPONSE: ", response)
        } catch (err) {
            setModalVisible(true)
            setResponseStatus(500);
            setResponseMsg(err.toString())
        }
        setLoading(false);

    };

    const handleCode = async () => {
        if (!code) {
            setModalVisible(true)
            setResponseMsg('OTP Code is required.')
            setResponseStatus(500)
            return;
        }
        setLoading(true);

        try {
            const response = await sendOTPVerification(code,email);
            if (response.status == 200) {
                // setModalVisible(true)
                // setResponseStatus(response.status);
                // setResponseMsg(response.message)
                // setCode('');
                setProcess(3);
            }
            else if (response.status == 500 || response.status == 404) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            else {
                setModalVisible(true)
                setResponseStatus(500);
                setResponseMsg(response)
            }
            console.log("RESPONSE: ", response)
        } catch (err) {
            setModalVisible(true)
            setResponseStatus(500);
            setResponseMsg(err.toString())
        }
        setLoading(false);

    };

    const handlePassword = async () => {
        if (!password) {
            setModalVisible(true)
            setResponseMsg('Password is required.')
            setResponseStatus(500)
            return;
        }
        setLoading(true);

        try {
            const response = await setNewPassword(password,email);
            if (response.status == 200) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
                setEmail('');
                setCode('');
                setPassword('');
                setProcess(1);
            }
            else if (response.status == 500 || response.status == 404) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            else {
                setModalVisible(true)
                setResponseStatus(500);
                setResponseMsg(response)
            }
            console.log("RESPONSE: ", response)
        } catch (err) {
            setModalVisible(true)
            setResponseStatus(500);
            setResponseMsg(err.toString())
        }
        setLoading(false);

    };


    return (
        <View style={style.mainContainer}>
            {/* header */}
            {loading && <CustomLoading />}

            <CustomMessageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message={responseMsg}
                response={responseStatus}
            />
            <View style={style.header}>
                <View style={style.headerTitle}>
                    <View style={style.navigation}>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={style.icon}>
                            <Ionicons name={'caret-back-outline'} size={35} color={Constants.COLORS.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <CustomText style={style.headerTitleText}>Forgot</CustomText>
                    <CustomText style={style.headerTitleText}>Password</CustomText>
                </View>
            </View>
            <View style={style.form}>
                <ScrollView>
                    <View style={style.iconContainer}>
                        <Ionicons name={'lock-closed'} size={70} color={Constants.COLORS.RED} />
                    </View>
                    {process == 1 &&
                        <>
                            <CustomText style={style.direction}>Enter your email and we'll send you a verification code to reset your password.</CustomText>
                            <View style={{ marginTop: 10 }}>
                                <CustomInput
                                    fontFamily={'Montserrat'}
                                    color={Constants.COLORS.WHITE}
                                    isSecure={false}
                                    value={email}
                                    inputValue={setEmail}
                                    flexValue={0}
                                    keyboardTypeValue="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </>
                    }
                    {process == 2 &&
                        <>
                            <CustomText style={style.direction}>Enter the verification code sent to your email.</CustomText>
                            <CustomInput
                                fontFamily={'Montserrat'}
                                color={Constants.COLORS.WHITE}
                                isSecure={false}
                                value={code}
                                inputValue={setCode}
                                flexValue={1}
                            />
                        </>
                    }
                    {process == 3 &&
                        <>
                            <CustomText style={style.direction}>Set new password.</CustomText>
                            <CustomInput
                                fontFamily={'Montserrat'}
                                color={Constants.COLORS.WHITE}
                                isSecure={false}
                                value={password}
                                inputValue={setPassword}
                                flexValue={1}
                            />
                        </>
                    }
                </ScrollView>

                {/* Footer */}
                <View style={style.footer}>
                    {process == 1 &&
                        <TouchableOpacity onPress={handleEmail}>
                            <Text style={style.signupBtn}>Send Email</Text>
                        </TouchableOpacity>
                    }
                    {process == 2 &&
                        <TouchableOpacity onPress={handleCode}>
                            <Text style={style.signupBtn}>Send Code</Text>
                        </TouchableOpacity>
                    }
                    {process == 3 &&
                        <TouchableOpacity onPress={handlePassword}>
                            <Text style={style.signupBtn}>Submit</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {/* </KeyboardAwareScrollView> */}
        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE
        // alignItems: 'center'
    },
    header: {
        flex: 0.3,
        paddingTop: Constants.PADDING.REGULAR,
        paddingLeft: Constants.PADDING.SMALL,
        paddingRight: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.RED,
        borderBottomLeftRadius: Constants.BORDERS.RADIUS_NORMAL,
        borderBottomRightRadius: Constants.BORDERS.RADIUS_NORMAL,
        marginBottom: Constants.MARGIN.SMALL
    },
    headerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        paddingLeft: Constants.PADDING.SMALL,
        paddingRight: Constants.PADDING.SMALL,
    },
    headerTitleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.HEADINGS,
        color: Constants.COLORS.WHITE
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    direction: {
        fontSize: Constants.SIZE.REGULAR,
        textAlign: 'center',
        marginTop: 10,
        padding: 10,
    },
    form: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        paddingLeft: Constants.PADDING.REGULAR,
        paddingRight: Constants.PADDING.REGULAR,
        // paddingTop: Constants.PADDING.REGULAR,
        justifyContent: 'center'
    },
    icon: {
        width: '10%'
    },
    navigation: {
        backgroundColor: Constants.COLORS.RED
    },
    footer: {
        justifyContent: 'center',
        paddingBottom: Constants.PADDING.LARGE,
        paddingTop: Constants.PADDING.SMALL
    },
    signupBtn: {
        backgroundColor: Constants.COLORS.RED,
        color: Constants.COLORS.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR,
        textAlign: 'center',
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        padding: Constants.PADDING.SMALL
    },
});
