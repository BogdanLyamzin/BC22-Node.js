import axios from "axios";

const {REACT_APP_API_URL} = process.env;

const instance = axios.create({
    baseURL: REACT_APP_API_URL
});

// instance.interceptors.request.use(config => {
//     const accessToken = localStorage.getItem("accessToken");
//     config.headers.common.authorization = `Bearer ${accessToken}`;

//     return config;
// })

instance.interceptors.response.use(response => response, async (error) => {
    if(error.response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
            const {data} = await instance.post("/auth/refresh", {refreshToken});
            setToken(data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return axios(error.config);
        }
        catch(error) {
            return Promise.reject(error)
        }
        
    }
    return Promise.reject(error);
})

const setToken = (token) => {
    if(token) {
        return instance.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    instance.defaults.headers.common.authorization = "";
}

export const signup = async (data) => {
    const {data: result} = await instance.post("/auth/register", data);
    return result;
}

export const login = async (data) => {
    const {data: result} = await instance.post("/auth/login", data);
    setToken(result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    return result;
}

export const logout = async() => {
    const data = await instance.get("/auth/logout");
    setToken();
    return data;
}

export const getCurrent = async(accessToken) => {
    try {
        setToken(accessToken);
        const {data} = await instance.get("/auth/current");
        return data;
    } catch (error) {
        setToken();
        throw error;
    }
}

export default instance;