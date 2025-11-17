import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Constants } from '../../../constants/constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../../../context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import CustomText from '../../../components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from './profileStyles';
import { Button } from '@react-navigation/elements';
import { fetchUserProfile, updateUserProfile, uploadIdPicture } from '../../../services/service';
import CustomLoading from '../../../components/CustomLoading';
import CustomMessageModal from '../../../components/CustomMessageModal';

import AnnouncementModal from '../announcement/Annnouncement';
import { globalStyle } from '../../../utils/styles.js';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Profile() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [announceVisible, setAnnounceVisible] = useState(false);
    const [idPicture, setIdPicture] = useState(null);
    const [user, setUser] = useState('');
    const [fullname, setFullname] = useState('');
    const [contact, setContact] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [license, setLicense] = useState('');
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [licensePicture, setLicensePicture] = useState(null);

    useEffect(() => {
        const initProfile = async () => {
            setUser(await AsyncStorage.getItem('user'));
            setFullname(await AsyncStorage.getItem('fullname'));
            setContact(await AsyncStorage.getItem('contact'));
            setLoading(true);
            const response = await fetchUserProfile();
            if (response.profile) {
                setUser(response.profile.username);
                setFullname(response.profile.fullname);
                setContact(response.profile.contact);
                setFirstName(response.profile.first_name || '');
                setMiddleName(response.profile.middle_name || '');
                setLastName(response.profile.last_name || '');
                setPlateNumber(response.profile.plate_number || '');
                setEmail(response.profile.email || '');
                setAddress(response.profile.address || '');
                setContactNumber(response.profile.contact || '');
                setLicense(response.profile.id_number || '');
                setSelectedGender(response.profile.gender || null);
                setLicensePicture(response.profile.license_picture);
                setIdPicture(response.profile.id_picture);
            }
            else {
                setModalVisible(true)
                setResponseMsg(response)
            }
            setLoading(false);
        };

        initProfile();
    }, []);

    const handleCancel = () => {
        setEdit(false);
        const reloadProfile = async () => {
            setLoading(true);
            const response = await fetchUserProfile();
            if (response.profile) {
                setUser(response.profile.username);
                setFullname(response.profile.fullname);
                setContact(response.profile.contact);
                setFirstName(response.profile.first_name || '');
                setMiddleName(response.profile.middle_name || '');
                setLastName(response.profile.last_name || '');
                setPlateNumber(response.profile.plate_number || '');
                setEmail(response.profile.email || '');
                setAddress(response.profile.address || '');
                setContactNumber(response.profile.contact || '');
                setLicense(response.profile.id_number || '');
                setSelectedGender(response.profile.gender || null);
                setLicensePicture(response.profile.license_picture);
            }
            else {
                setModalVisible(true)
                setResponseMsg(response)
            }
            setLoading(false);
        };
        reloadProfile();
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('fullname');
        await AsyncStorage.removeItem('contact');
        setIsAuthenticated(false);
    };

    const handleSave = async () => {
        if (firstName && lastName && email && address && contactNumber && license) {
            setLoading(true);
            const response = await updateUserProfile(firstName, middleName, lastName, plateNumber, email, address, contactNumber, license, selectedGender);

            if (response.status == 200) {
                setUser(response.profile.username);
                setFullname(response.profile.fullname);
                setContact(response.profile.contact);
                setEdit(false)

                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
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
            setLoading(false);
        }
    };

    const handleSelectIdPicture = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Permission required to select image.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const response = await uploadIdPicture(result.assets[0]);

            if (response.image_url) {
                setIdPicture(response.image_url);   // ← 🔥 FIXED
            } else {
                console.log("Upload failed:", response);
            }
        }
    };






    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, profileStyles.view]}>
            {loading && <CustomLoading />}
            <CustomMessageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message={responseMsg}
                response={responseStatus}
            />
            <View style={profileStyles.headerContainer}>
                <CustomText style={profileStyles.textTitle}>Profile</CustomText>
                <TouchableOpacity activeOpacity={0.5} style={globalStyle.iconContainer} onPress={() => setAnnounceVisible(true)}>
                    <Ionicons name={'megaphone-outline'} size={30} style={globalStyle.announceIcon} />
                </TouchableOpacity>
            </View>
            <AnnouncementModal visible={announceVisible} onClose={() => setAnnounceVisible(false)} />

            <View style={{ flex: 1 }}>
                <View style={profileStyles.profileHeader}>
                    {/* <Ionicons name={'person-circle-outline'} size={120} color={Constants.COLORS.BLACK} /> */}
                    {/* <Image
                        source={require('../../../assets/img/tricycle.png')} // put your image in assets folder
                        style={{ margin: 10, marginLeft: 0, width: 80, height: 80, borderRadius: 50, borderWidth: 2, borderColor: Constants.COLORS.RED, transform: [{ scaleX: -1 }] }} // adjust size & spacing
                        resizeMode="contain"
                    /> */}
                    <TouchableOpacity onPress={handleSelectIdPicture}>
                        <Image
                            source={
                                idPicture
                                    ? { uri: `${idPicture}?t=${Date.now()}` }
                                    : require('../../../assets/img/tricycle.png')
                            }
                            style={{
                                margin: 10,
                                width: 80,
                                height: 80,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: Constants.COLORS.RED
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <CustomText style={[profileStyles.textProfileBold]}>{fullname}</CustomText>
                        <CustomText style={[profileStyles.textProfile]}>{user}</CustomText>
                        <CustomText style={[profileStyles.textProfile]}>{contact}</CustomText>
                    </View>
                    <View style={{ padding: Constants.PADDING.REGULAR }}>
                        {!edit ?
                            <TouchableOpacity onPress={() => { setEdit(true) }}>
                                <Ionicons name={'create-outline'} size={30} color={Constants.COLORS.BLACK} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={handleCancel}>
                                <Ionicons name={'close-circle-outline'} size={30} color={Constants.COLORS.BLACK} />
                            </TouchableOpacity>
                        }

                    </View>
                </View>
                <View style={profileStyles.main}>
                    <ScrollView>
                        <View style={profileStyles.form}>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>First Name</CustomText>
                                <TextInput editable={edit} style={[profileStyles.formInput, !firstName && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={firstName.toLocaleUpperCase()} onChangeText={setFirstName} />
                                <CustomText style={profileStyles.formLabel}>Middle Name</CustomText>
                                <TextInput editable={edit} style={[profileStyles.formInput, !middleName && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={middleName.toLocaleUpperCase()} onChangeText={setMiddleName} />
                                <CustomText style={profileStyles.formLabel}>Last Name</CustomText>
                                <TextInput editable={edit} style={[profileStyles.formInput, !lastName && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={lastName.toLocaleUpperCase()} onChangeText={setLastName} />
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Contact Number</CustomText>
                                <TextInput keyboardType="number-pad" editable={edit} style={[profileStyles.formInput, !contactNumber && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={contactNumber} onChangeText={setContactNumber} />
                            </View>
                            {licensePicture &&
                                <Image
                                    // source={{ uri: licensePicture }}
                                    source={{ uri: `${licensePicture}?t=${Date.now()}` }}
                                    style={{
                                        width: '100%',
                                        marginTop: 10,
                                        height: 150,
                                        backgroundColor: Constants.COLORS.WHITE,
                                        alignSelf: 'center',
                                    }}
                                    onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                                />
                            }

                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Driver License</CustomText>
                                <TextInput editable={edit} style={[profileStyles.formInput, !license && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={license} onChangeText={setLicense} />
                                <CustomText style={profileStyles.formLabel}>Plate Number</CustomText>
                                <TextInput editable={edit} style={[profileStyles.formInput, !plateNumber && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={plateNumber} onChangeText={setPlateNumber} />
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Gender</CustomText>
                                <View style={profileStyles.radioGroup}>
                                    <TouchableOpacity
                                        style={profileStyles.radioButton}
                                        onPress={() => setSelectedGender('M')}
                                        disabled={!edit}
                                    >
                                        <View style={[profileStyles.radioCircle, selectedGender === 'M' && profileStyles.selected]} />
                                        <Text style={profileStyles.radioLabel}>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={profileStyles.radioButton}
                                        onPress={() => setSelectedGender('F')}
                                        disabled={!edit}
                                    >
                                        <View style={[profileStyles.radioCircle, selectedGender === 'F' && profileStyles.selected]} />
                                        <Text style={profileStyles.radioLabel}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Email</CustomText>
                                <TextInput editable={edit} keyboardType="email-address" autoCapitalize="none" style={[profileStyles.formInput, !email && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={email} onChangeText={setEmail} />
                            </View>
                            <View style={[profileStyles.inputContainer1, { paddingBottom: 15 }]}>
                                <CustomText style={profileStyles.formLabel}>Complete Address</CustomText>
                                <TextInput editable={edit} style={[profileStyles.formInput, !address && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={address} onChangeText={setAddress} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity onPress={logOut} style={{ backgroundColor: Constants.COLORS.RED_TINT }}>
                        <CustomText style={[profileStyles.customButton, { color: Constants.COLORS.RED }]}>Log out</CustomText>
                    </TouchableOpacity>
                    {edit &&
                        <TouchableOpacity activeOpacity={0.5} onPress={handleSave} style={{ backgroundColor: Constants.COLORS.RED }}>
                            <CustomText style={[profileStyles.customButton, { color: Constants.COLORS.WHITE }]}>SAVE</CustomText>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}
