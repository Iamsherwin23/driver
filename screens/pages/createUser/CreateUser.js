// External imports
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Custom imports
import { Constants } from '../../../constants/constants';
import { createUserStyle } from './CreateUserStyle';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CustomInput } from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import { CustomDropdown } from '../../../components/CustomDropDown';
import { CustomButton } from '../../../components/CustomButton';

export default function CreateUserPage({ navigation }) {

    const [data, setData] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={createUserStyle.mainContainer}>
                {/* header */}
                <View style={createUserStyle.header}>
                    <View style={createUserStyle.navigation}>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={createUserStyle.icon}>
                            <Ionicons name={'caret-back-outline'} size={35} color={Constants.COLORS.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <View style={createUserStyle.headerTitle}>
                        <CustomText style={createUserStyle.headerTitleText}>CREATE YOUR ACCOUNT</CustomText>
                    </View>
                </View>

                {/* Form */}
                <View style={createUserStyle.form}>
                    {/* Name Section */}
                    <View style={createUserStyle.form_Name}>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            inputValue={setData}
                            placeholderValue={'Enter First Name'}
                            flexValue={1} />

                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            inputValue={setData}
                            placeholderValue={'Enter Last Name'}
                            flexValue={1} />
                    </View>
                    {/* Email section */}
                    <View>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            inputValue={setData}
                            placeholderValue={'Enter Email'}
                            flexValue={0} />
                    </View>
                    {/* Gender section */}
                    <View style={{marginBottom: Constants.SIZE.REGULAR}}>
                        <CustomDropdown
                            items={[
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' }
                            ]}
                            value={selectedGender}
                            setValue={setSelectedGender}
                            placeholder="Gender"
                            style={createUserStyle.dropDown}
                        />
                    </View>
                    {/* Mobile Number section */}
                    <View>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={false}
                            inputValue={setData}
                            placeholderValue={'Enter Mobile Number'}
                            flexValue={0}
                            keyboardTypeValue='numeric' />
                    </View>
                    {/* Password section */}
                    <View>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={true}
                            inputValue={setData}
                            placeholderValue={'Enter Password'}
                            flexValue={0} />
                    </View>
                    <View>
                        <CustomInput
                            fontFamily={'Montserrat'}
                            color={Constants.COLORS.WHITE}
                            isSecure={true}
                            inputValue={setData}
                            placeholderValue={'Re-enter Password'}
                            flexValue={0} />
                    </View>
                    {/* Category section */}
                    <View style={{marginBottom: Constants.SIZE.REGULAR}}>
                        <CustomDropdown
                            items={[
                                { label: 'Driver', value: 'Driver' },
                                { label: 'Commuter', value: 'Commuter' }
                            ]}
                            value={selectedCategory}
                            setValue={setSelectedCategory}
                            placeholder="Select Category"
                            style={createUserStyle.dropDown}
                        />
                    </View>
                </View>

                {/* Footer */}
                <View style={createUserStyle.footer}>
                    <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.MEDIUM} onPress={()=>{}}/>
                </View>
            </View>
        </KeyboardAvoidingView>

    )
}