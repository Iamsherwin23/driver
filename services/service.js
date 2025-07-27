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



