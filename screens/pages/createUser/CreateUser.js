// External imports
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Custom imports
import { Constants } from '../../../constants/constants';
import { createUserStyle } from './CreateUserStyle';
import { CustomInput } from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import { createDriver } from '../../../services/service';
import CustomMessageModal from '../../../components/CustomMessageModal';
import { isEmail, isValidPassword } from '../../../assets/General/Utils';
import CustomLoading from '../../../components/CustomLoading';

export default function CreateUserPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [license, setLicense] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !firstName || !lastName || !mobileNumber || !license || !address || !selectedGender || !password || !confirmPassword) {
            setModalVisible(true)
            setResponseMsg('All fields are required.')
            setResponseStatus(500)
            return;
        }

        if (!isEmail(email)) {
            setModalVisible(true)
            setResponseMsg('Email is invalid.')
            setResponseStatus(500)
            return;
        }

        if (!isValidPassword(password)) {
            setModalVisible(true)
             setResponseMsg(
                'Password must be 8-24 characters long and include at least one uppercase letter and one number.'
            );
            setResponseStatus(500)
            return;
        }
        if (password !== confirmPassword) {
            setModalVisible(true)
            setResponseMsg('Password does not match.')
            setResponseStatus(500)
            return;
        }
        setLoading(true);

        try {
            const response = await createDriver(firstName, lastName, email, address, mobileNumber, license, selectedGender, password);
            if (response.status == 200) {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
                setEmail('');
                setFirstName('');
                setLastName('');
                setMobileNumber('');
                setLicense('');
                setAddress('');
                setPassword('');
                setConfirmPassword('');
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
        setLoading(false);

    };

    return (
        <View style={createUserStyle.mainContainer}>
            {/* header */}
            {loading && <CustomLoading />}

            <CustomMessageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message={responseMsg}
                response={responseStatus}
            />
            <View style={createUserStyle.header}>
                <View style={createUserStyle.headerTitle}>
                    <View style={createUserStyle.navigation}>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={createUserStyle.icon}>
                            <Ionicons name={'caret-back-outline'} size={35} color={Constants.COLORS.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <CustomText style={createUserStyle.headerTitleText}>CREATE YOUR</CustomText>
                    <CustomText style={createUserStyle.headerTitleText}>ACCOUNT</CustomText>
                </View>
            </View>

            {/* Form */}
            {/* <KeyboardAwareScrollView
                style={{ flex: 1 }}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
            > */}
                <View style={createUserStyle.form}>
                    {/* Email */}
                    <View style={{ marginTop: 10 }}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            value={email}
                            inputValue={setEmail}
                            placeholderValue={'Email'}
                            flexValue={0}
                            keyboardTypeValue="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* First & Last Name */}
                    <View style={createUserStyle.form_Name}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            value={firstName}
                            inputValue={setFirstName}
                            placeholderValue={'First Name'}
                            flexValue={1}
                        />
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            value={lastName}
                            inputValue={setLastName}
                            placeholderValue={'Last Name'}
                            flexValue={1}
                        />
                    </View>

                    {/* Mobile Number */}
                    <View style={{ marginTop: 10 }}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            value={mobileNumber}
                            inputValue={setMobileNumber}
                            placeholderValue={'Mobile Number'}
                            flexValue={0}
                            keyboardTypeValue="numeric"
                        />
                    </View>

                    {/* Driver License */}
                    <View style={{ marginTop: 10 }}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            value={license}
                            inputValue={setLicense}
                            placeholderValue={'Driver License (VALID ID)'}
                            flexValue={0}
                        />
                    </View>

                    {/* Address */}
                    <View style={{ marginTop: 10 }}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            value={address}
                            inputValue={setAddress}
                            placeholderValue={'Complete Address'}
                            flexValue={0}
                        />
                    </View>

                    {/* Gender */}
                    <View style={{ marginBottom: Constants.SIZE.REGULAR, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {['Male', 'Female'].map((gender) => (
                                <TouchableOpacity
                                    key={gender}
                                    onPress={() => setSelectedGender(gender)}
                                    style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                >
                                    <Ionicons
                                        name={selectedGender === gender ? 'radio-button-on' : 'radio-button-off'}
                                        size={25}
                                        color={Constants.COLORS.FADED_BLACK}
                                    />
                                    <Text style={{ color: Constants.COLORS.FADED_BLACK, marginLeft: 5, fontSize: Constants.SIZE.REGULAR }}>
                                        {gender}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Passwords */}
                    <View style={{ marginTop: 10 }}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={true}
                            value={password}
                            inputValue={setPassword}
                            placeholderValue={'Enter Password'}
                            flexValue={0}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={true}
                            value={confirmPassword}
                            inputValue={setConfirmPassword}
                            placeholderValue={'Re-enter Password'}
                            flexValue={0}
                        />
                    </View>

                    {/* Footer */}
                    <View style={createUserStyle.footer}>
                        <TouchableOpacity onPress={handleSignup}>
                            <Text style={createUserStyle.signupBtn}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </KeyboardAwareScrollView> */}
        </View>
    );
}
