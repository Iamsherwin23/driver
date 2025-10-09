import { Constants } from "../constants/constants";
const mainRoute = Constants.API_ROUTE.API_ENDPOINT;

const apiRoutes = {
    loginRoute: mainRoute.concat("/api/logindriver"),
    createDriver: mainRoute.concat("/api/driver/createDriver"),

    getCurrentBookings: mainRoute.concat("/api/driver/getCurrentBookings"),
    getMyBookings: mainRoute.concat("/api/driver/getMyBookings"),
    getMyBookings: mainRoute.concat("/api/driver/getMyBookings"),
    acceptBookingStatus: mainRoute.concat("/api/driver/acceptBookingStatus"),
    cancelBookingStatus: mainRoute.concat("/api/driver/cancelBookingStatus"),
    startBookingStatus: mainRoute.concat("/api/driver/startBookingStatus"),
    finishBookingStatus: mainRoute.concat("/api/driver/finishBookingStatus"),


    getNewsFare: mainRoute.concat("/api/driver/getNewsFare"),
    getHistory: mainRoute.concat("/api/driver/getHistory"),
    getProfile: mainRoute.concat("/api/driver/getProfile"),
    updateProfile: mainRoute.concat("/api/driver/updateProfile"),
    getBookings: mainRoute.concat("/api/driver/getBookings"),
    sumbitReport: mainRoute.concat("/api/driver/sumbitReport"),
    getAnnouncement: mainRoute.concat("/api/driver/getAnnouncement"),

    sendEmail: mainRoute.concat("/api/sendEmail"),
    sendOTP: mainRoute.concat("/api/sendOTP"),
    setPassword: mainRoute.concat("/api/setPassword"),


}

export { apiRoutes };