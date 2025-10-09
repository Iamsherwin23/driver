import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRoutes } from "../routes/apiRoutes";

export const loginTest = async (username, password, access_level) => { //test login
    try {
        const res = await fetch(apiRoutes.loginRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, access_level }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

//Home Page
export const fetchCurrentBookings = async () => {
    try {
        const res = await fetch(apiRoutes.getCurrentBookings, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();

    } catch (err) {
        console.log('Error fetching bookings:', err);
        return `Something went wrong fetching bookings.`;
        // return `Error fetching bookings: ${err}`;
    }
};

//Home Page
export const fetchMyBookings = async () => {
    try {
        const res = await fetch(apiRoutes.getMyBookings, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();

    } catch (err) {
        console.log('Error fetching current booking.', err);
        return `Something went wrong fetching current bookings.`;
        // return `Error fetching bookings: ${err}`;
    }
};

export const handleAcceptNow = async (bookid) => {
    try {
        const res = await fetch(apiRoutes.acceptBookingStatus, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookid
            }),
        });
        console.log(res);
        return await res.json();
    } catch (err) {
        console.log('Something went wrong accepting booking:', err);
        return `Something went wrong accepting booking.`;
    }
};

export const handleCancelNow = async (bookid) => {
    try {
        const res = await fetch(apiRoutes.cancelBookingStatus, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookid
            }),
        });
        console.log(res);
        return await res.json();
    } catch (err) {
        console.log('Something went wrong cancelling booking:', err);
        return `Something went wrong cancelling booking.`;
    }
};
export const handleStartNow = async (bookid) => {
    try {
        const res = await fetch(apiRoutes.startBookingStatus, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookid
            }),
        });
        console.log(res);
        return await res.json();
    } catch (err) {
        console.log('Something went wrong starting booking:', err);
        return `Something went wrong starting booking.`;
    }
};

export const handleFinishNow = async (bookid) => {
    try {
        const res = await fetch(apiRoutes.finishBookingStatus, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookid
            }),
        });
        console.log(res);
        return await res.json();
    } catch (err) {
        console.log('Something went wrong compeleting booking:', err);
        return `Something went wrong cmpleting booking.`;
    }
};


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
        console.log('Error fetching news fare:', err);
        return `Something went wrong fetching news fare.`;
    }
};

//Reprt Page
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
        console.log('Error fetching history:', err);
        return `Something went wrong fetching history.`;
    }
};

// Report Page
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
        console.log('Something went wrong fetching bookings:', err);
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
        console.log('Something went wrong submitting report:', err);
    }
};


//Annoucement Page
export const fetchAnnouncement = async () => {
    try {
        const res = await fetch(apiRoutes.getAnnouncement, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    } catch (err) {
        return `Something went wrong fetching annoucement.`;
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
        return `Something went wrong fetching profile.`;
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
        return `Something went wrong updating profile.`;
    }
};

export const createDriver = async (
    firstName,
    lastName,
    email,
    address,
    contactNumber,
    license,
    selectedGender,
    password,
    licenseImage // 👈 new param
) => {
    try {
        const genderValue = selectedGender === "Male" ? "M" : selectedGender === "Female" ? "F" : null;

        // 🔹 Build form data for multipart upload
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('contact_number', contactNumber);
        formData.append('id_number', license);
        formData.append('gender', genderValue);
        formData.append('password', password);

        // 👇 Append the image file (required for license upload)
        formData.append('license_picture', {
            uri: licenseImage,
            name: 'license_image.jpg',
            type: 'image/jpeg',
        });

        const res = await fetch(apiRoutes.createDriver, {
            method: 'POST',
            headers: {
                Accept: 'application/json', // no Content-Type, let fetch set it automatically
            },
            body: formData,
        });

        return await res.json();
    } catch (err) {
        console.log('Error uploading driver:', err);
        return { status: 500, message: 'Something went wrong creating driver.' };
    }
};

export const sendEmailVerification = async (email) => {
    try {
        const res = await fetch(apiRoutes.sendEmail, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
        return { status: 500, message: 'Something went wrong sending email.' };
    }
};

export const sendOTPVerification = async (code, email) => {
    try {
        const res = await fetch(apiRoutes.sendOTP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, email }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
        return { status: 500, message: 'Something went wrong sending code.' };
    }
};

export const setNewPassword = async (password, email) => {
    try {
        const res = await fetch(apiRoutes.setPassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, email }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
        return { status: 500, message: 'Something went wrong setting password.' };
    }
};



