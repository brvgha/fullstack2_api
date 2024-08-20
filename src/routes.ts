import { userApi } from "./api/user-api";
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "GET", path: "/api/callback", config: userApi.googleLogin },
];

export default apiRoutes;