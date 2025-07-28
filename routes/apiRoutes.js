import { Constants } from "../constants/constants";
const mainRoute = Constants.API_ROUTE.API_ENDPOINT;

const apiRoutes = {
    loginRoute: mainRoute.concat("/api/login"),
    getProfile: mainRoute.concat("/api/driver/getProfile"),
    updateProfile: mainRoute.concat("/api/driver/updateProfile"),
}

export { apiRoutes };