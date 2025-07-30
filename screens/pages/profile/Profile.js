import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Constants } from '../../../constants/constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../../../context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import CustomText from '../../../components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from './profileStyles';
import { Button } from '@react-navigation/elements';
import { fetchUserProfile, updateUserProfile } from '../../../services/service';
import CustomLoading from '../../../components/CustomLoading';
import CustomMessageModal from '../../../components/CustomMessageModal';

export default function Profile() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [fullname, setFullname] = useState('');
    const [contact, setContact] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [license, setLicense] = useState('');
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const [imageSource, setImageSource] = useState('');

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
                setLastName(response.profile.last_name || '');
                setEmail(response.profile.email || '');
                setAddress(response.profile.address || '');
                setContactNumber(response.profile.contact || '');
                setLicense(response.profile.id_number || '');
                setSelectedGender(response.profile.gender || null);
                setImageSource(response.profile.id_picture);
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
                setLastName(response.profile.last_name || '');
                setEmail(response.profile.email || '');
                setAddress(response.profile.address || '');
                setContactNumber(response.profile.contact || '');
                setLicense(response.profile.id_number || '');
                setSelectedGender(response.profile.gender || null);
                setImageSource(response.profile.id_picture);
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
            const response = await updateUserProfile(firstName, lastName, email, address, contactNumber, license, selectedGender);

            if(response.status == 200) {
                setUser(response.profile.username);
                setFullname(response.profile.fullname);
                setContact(response.profile.contact);
                setEdit(false)

                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            else {
                setModalVisible(true)
                setResponseStatus(response.status);
                setResponseMsg(response.message)
            }
            setLoading(false);
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
            </View>
            <View style={{ flex: 1 }}>
                <View style={profileStyles.profileHeader}>
                    {/* <View style={{padding: 10}}>

                        {imageSource &&
                        <Image
                        resizeMode="cover"
                            source={{ uri: imageSource }}
                            style={profileStyles.imageProfile}
                            />
                        }
                    </View> */}
                    <Ionicons name={'person-circle-outline'} size={120} color={Constants.COLORS.BLACK} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <CustomText style={[profileStyles.textProfileBold]}>{fullname}</CustomText>
                        <CustomText style={[profileStyles.textProfile]}>{user}</CustomText>
                        <CustomText style={[profileStyles.textProfile]}>{contact}</CustomText>
                    </View>
                    <View style={{ padding: Constants.PADDING.REGULAR }}>
                        {!edit ?
                            <TouchableOpacity onPress={() => {setEdit(true)} }>
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
                            <View style={profileStyles.nameContainer}>
                                <View style={profileStyles.inputContainer}>
                                    <CustomText style={profileStyles.formLabel}>First Name</CustomText>
                                    {/* <CustomText style={profileStyles.formLabel}>{imageSource}</CustomText> */}
                                    <TextInput  editable={edit}  style={[profileStyles.formInput, !firstName && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={firstName} onChangeText={setFirstName} />
                                </View>
                                <View style={profileStyles.inputContainer}>
                                    <CustomText style={profileStyles.formLabel}>Last Name</CustomText>
                                    <TextInput  editable={edit}  style={[profileStyles.formInput, !lastName && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={lastName} onChangeText={setLastName} />
                                </View>
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Contact Number</CustomText>
                                <TextInput keyboardType="number-pad"  editable={edit}  style={[profileStyles.formInput, !contactNumber && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={contactNumber} onChangeText={setContactNumber} />
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Driver License</CustomText>
                                <TextInput  editable={edit}  style={[profileStyles.formInput, !license && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={license} onChangeText={setLicense} />
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
                                <TextInput  editable={edit} keyboardType="email-address" autoCapitalize="none" style={[profileStyles.formInput, !email && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={email} onChangeText={setEmail} />
                            </View>
                            <View style={[profileStyles.inputContainer1, { paddingBottom: 15 }]}>
                                <CustomText style={profileStyles.formLabel}>Complete Address</CustomText>
                                <TextInput  editable={edit}  style={[profileStyles.formInput, !address && edit && { borderWidth: 2, borderColor: Constants.COLORS.RED }]} value={address} onChangeText={setAddress} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity onPress={logOut} style={{backgroundColor: Constants.COLORS.RED_TINT }}>
                        <CustomText style={[profileStyles.customButton, {color: Constants.COLORS.RED }]}>Log out</CustomText>
                    </TouchableOpacity>
                    {edit &&
                        <TouchableOpacity activeOpacity={0.5} onPress={handleSave} style={{backgroundColor: Constants.COLORS.RED }}>
                            <CustomText style={[profileStyles.customButton,{ color: Constants.COLORS.WHITE }]}>SAVE</CustomText>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}
