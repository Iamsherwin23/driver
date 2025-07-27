// External imports
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { Constants } from '../../constants/constants';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Custom Components
import CustomText from '../../components/CustomText';
import { loginStyle } from './loginPageStyles';
import { AuthContext } from '../../context/AuthContext.js';
import { loginTest } from '../../services/service.js';
import { CustomMessage } from '../../components/Message.js';
import CustomLoadingBar from '../../components/CustomLoadingBar.js'; 

export default function LoginPage({ navigation }) {

    // Variables
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);

    const [msg, setMsg] = useState(false);
    const [messageColor, setMessageColor] = useState(Constants.COLORS.GREEN);
    const [isLoading, setIsLoading] = useState(false);

    const { setIsAuthenticated } = useContext(AuthContext);
    const access_level = 10;

    // call api login
    const loginUser = async () => {

        // if (username == '' || password == '') {
        //     setMsg(true);
        //     setTimeout(() => {
        //         setMsg(false);
        //     }, 2000);
        //     setMessageColor(Constants.COLORS.YELLOW);
        //     setData("Please don't leave any blanks");
        // } else {
            setIsLoading(true);
            const apiResult = await loginTest('jenna@gmail.com', 'Sarco123!', access_level);
            setIsLoading(false);
            if (apiResult.status == 400) { 
                setMsg(true);
                setTimeout(() => {
                    setMsg(false);
                }, 2000);
                setMessageColor(Constants.COLORS.RED);
                setData(apiResult.message);

            } else if (apiResult.status == 200) {
                setMessageColor(Constants.COLORS.GREEN);
                setMsg(true);
                setData(apiResult.message);
                await AsyncStorage.setItem('token', apiResult.access_token);
                await AsyncStorage.setItem('user', apiResult.user);
                await AsyncStorage.setItem('fullname', apiResult.fullname);
                await AsyncStorage.setItem('contact', apiResult.contact);
                setIsAuthenticated(true); // this triggers page change
            }

        // }


    }

    // Render the component
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-60}
        >
            <View style={loginStyle.container}>
                {
                    isLoading ? <CustomLoadingBar/> : null
                }
                {/* Header */}
                <View style={loginStyle.header}>
                    <CustomText style={loginStyle.label}>Hi! Welcome To</CustomText>
                    <CustomText style={loginStyle.label2}>TrikeFare</CustomText>

                    {/* {loadingBar ? <Text>please wait...</Text> : null} */}
                </View>
                <View style={loginStyle.main}>

                    <View style={loginStyle.formContainer}>

                        {msg ? <CustomMessage color={messageColor} message={data} /> : null}

                        <View style={loginStyle.inputContainer}>
                            <Ionicons name={'person'} size={20} color={Constants.COLORS.BLACK} style={loginStyle.icon} />
                            <TextInput style={loginStyle.formInput} placeholder='Enter Username' onChangeText={setUserName} />
                        </View>


                        <View style={loginStyle.inputContainer}>
                            <Ionicons name={'lock-closed'} size={20} color={Constants.COLORS.BLACK} style={loginStyle.icon} />
                            <TextInput style={loginStyle.formInput} placeholder='Enter Password' secureTextEntry={true} onChangeText={setPassword} />
                        </View>

                        <View style={loginStyle.misc}>
                            <TouchableOpacity>
                                <Text style={loginStyle.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => { loginUser() }}>
                            <Text style={loginStyle.loginBtn}>Login</Text>
                        </TouchableOpacity>

                        <View style={loginStyle.createAccount}>
                            <Text style={loginStyle.label3}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('CreateUserPage')}><Text style={loginStyle.createAccountLabel}>Create an account</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}