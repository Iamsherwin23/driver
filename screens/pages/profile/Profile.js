import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Constants } from '../../../constants/constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../../../context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import CustomText from '../../../components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { profileStyles } from './profileStyles';
import { Button } from '@react-navigation/elements';
import { fetchUserProfile, updateUserProfile } from '../../../services/service';

export default function Profile() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState('N/A');
    const [fullname, setFullname] = useState('N/A');
    const [contact, setContact] = useState('N/A');
    const [selectedGender, setSelectedGender] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [license, setLicense] = useState('');
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState([]);

    useEffect(() => {
        const initProfile = async () => {
            setUser(await AsyncStorage.getItem('user'));
            setFullname(await AsyncStorage.getItem('fullname'));
            setContact(await AsyncStorage.getItem('contact'));
            setLoading(true);
            const response = await fetchUserProfile();
            // console.log(response.profile)
            if (response.profile) {
                setFirstName(response.profile.first_name || '');
                setLastName(response.profile.last_name || '');
                setEmail(response.profile.email || '');
                setAddress(response.profile.address || '');
                setContactNumber(response.profile.contact_number || '');
                setLicense(response.profile.license || '');
                setSelectedGender(response.profile.gender || null);
            }
            setLoading(false);
        };

        initProfile();
    }, [trigger]);

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('fullname');
        await AsyncStorage.removeItem('contact');
        setIsAuthenticated(false);
    };

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await fetch('http://10.0.2.2:8000/api/updateProfile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    address,
                    contact_number: contactNumber,
                    license,
                    gender: selectedGender,
                }),
            });

            const result = await res.json();
            console.log("Profile updated:", result);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, profileStyles.view]}>
            <View style={profileStyles.headerContainer}>
                <CustomText style={profileStyles.textTitle}>Profile</CustomText>
            </View>
            <View style={{ flex: 1 }}>
                <View style={profileStyles.profileHeader}>
                    <Ionicons name={'person-circle'} size={120} color={Constants.COLORS.BLACK} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <CustomText style={[profileStyles.textProfileBold]}>{fullname}</CustomText>
                        <CustomText style={[profileStyles.textProfile]}>{user}</CustomText>
                        <CustomText style={[profileStyles.textProfile]}>{contact}</CustomText>
                    </View>
                    <View style={{ padding: Constants.PADDING.REGULAR }}>
                        <TouchableOpacity>
                            <Ionicons name={'create-outline'} size={24} color={Constants.COLORS.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={profileStyles.main}>
                    <ScrollView>
                        <View style={profileStyles.form}>
                            <View style={profileStyles.nameContainer}>
                                <View style={profileStyles.inputContainer}>
                                    <CustomText style={profileStyles.formLabel}>First Name</CustomText>
                                    <TextInput style={profileStyles.formInput} value={firstName} onChangeText={setFirstName} />
                                </View>
                                <View style={profileStyles.inputContainer}>
                                    <CustomText style={profileStyles.formLabel}>Last Name</CustomText>
                                    <TextInput style={profileStyles.formInput} value={lastName} onChangeText={setLastName} />
                                </View>
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Contact Number</CustomText>
                                <TextInput style={profileStyles.formInput} value={contactNumber} onChangeText={setContactNumber} />
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Driver License</CustomText>
                                <TextInput style={profileStyles.formInput} value={license} onChangeText={setLicense} />
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Gender</CustomText>
                                <View style={profileStyles.radioGroup}>
                                    <TouchableOpacity
                                        style={profileStyles.radioButton}
                                        onPress={() => setSelectedGender('Male')}
                                    >
                                        <View style={[profileStyles.radioCircle, selectedGender === 'Male' && profileStyles.selected]} />
                                        <Text style={profileStyles.radioLabel}>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={profileStyles.radioButton}
                                        onPress={() => setSelectedGender('Female')}
                                    >
                                        <View style={[profileStyles.radioCircle, selectedGender === 'Female' && profileStyles.selected]} />
                                        <Text style={profileStyles.radioLabel}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={profileStyles.inputContainer1}>
                                <CustomText style={profileStyles.formLabel}>Email</CustomText>
                                <TextInput style={profileStyles.formInput} value={email} onChangeText={setEmail} />
                            </View>
                            <View style={[profileStyles.inputContainer1, { paddingBottom: 15 }]}>
                                <CustomText style={profileStyles.formLabel}>Complete Address</CustomText>
                                <TextInput style={profileStyles.formInput} value={address} onChangeText={setAddress} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <TouchableOpacity onPress={logOut} style={{backgroundColor: Constants.COLORS.RED_TINT }}>
                        <CustomText style={[profileStyles.customButton, {color: Constants.COLORS.RED }]}>Log out</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={{backgroundColor: Constants.COLORS.RED }}>
                        <CustomText style={[profileStyles.customButton,{ color: Constants.COLORS.WHITE }]}>SAVE</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
