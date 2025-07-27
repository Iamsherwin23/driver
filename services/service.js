import { apiRoutes } from "../routes/apiRoutes";

export const loginTest = async (username, password) => { //test login
    try {
        const res = await fetch(apiRoutes.loginRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}




