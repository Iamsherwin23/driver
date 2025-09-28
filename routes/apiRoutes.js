import { Constants } from "../constants/constants";
const mainRoute = Constants.API_ROUTE.API_ENDPOINT;

const apiRoutes = {
    loginRoute: mainRoute.concat("/api/login"),
    createDriver: mainRoute.concat("/api/driver/createDriver"),
    getNewsFare: mainRoute.concat("/api/driver/getNewsFare"),
    getHistory: mainRoute.concat("/api/driver/getHistory"),
    getProfile: mainRoute.concat("/api/driver/getProfile"),
    updateProfile: mainRoute.concat("/api/driver/updateProfile"),
    getBookings: mainRoute.concat("/api/driver/getBookings"),
    sumbitReport: mainRoute.concat("/api/driver/sumbitReport"),
    getAnnouncement: mainRoute.concat("/api/driver/getAnnouncement"),
}

export { apiRoutes };