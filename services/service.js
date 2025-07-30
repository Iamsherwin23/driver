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

//News Fare Page
export const fetchNewsFare = async (sortOrder, dateFilter) => {
    try {
        const res = await fetch(apiRoutes.getNewsFare, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                sort: sortOrder,     // e.g., 'Latest' or 'Oldest'
                date: dateFilter,    // e.g., 'Last 24h' or 'This Year'
            }),
        });

        return await res.json();
    } catch (err) {
        console.error('Error fetching news fare:', err);
    }
};

//News Fare Page
export const fetchHistory = async () => {
    try {
        const res = await fetch(apiRoutes.getHistory, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

        return await res.json();
    } catch (err) {
        console.error('Error fetching history:', err);
    }
};

//News Fare Page
export const fetchReportBookings = async () => {
    try {
        const res = await fetch(apiRoutes.getBookings, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

        return await res.json();
    } catch (err) {
        console.error('Error fetching history:', err);
    }
};

export const submitBookingReport = async (selectedBookingId, concern) => {
    try {
        const res = await fetch(apiRoutes.sumbitReport, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bookid: selectedBookingId,
            concern,
        }),
    });
        return await res.json();
    } catch (err) {
        console.error('Error fetching history:', err);
    }
};


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



