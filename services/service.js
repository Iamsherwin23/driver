import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRoutes } from "../routes/apiRoutes";

export const loginTest = async (username, password, access_level) => { //test login
    try {
        const res = await fetch(apiRoutes.loginRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, access_level}),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}


//Profile Page
export const fetchUserProfile = async () => {
    try {
        const res = await fetch(apiRoutes.getProfile, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        return await res.json();
    } catch (err) {
        console.error('Error fetching profile:', err);
    }
};

export const updateUserProfile = async (firstName, lastName, email, address, contactNumber, license, selectedGender) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const res = await fetch(apiRoutes.updateProfile, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    contact: contactNumber,
                    email,
                    address,
                    contact_number: contactNumber,
                    id_number: license,
                    gender: selectedGender,
                }),
            });

            return await res.json();

    } catch (err) {
        console.error('Error fetching profile:', err);
    }
};



