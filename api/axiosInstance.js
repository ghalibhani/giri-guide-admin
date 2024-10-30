import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "http://10.10.102.25:8082/api/v1",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(`Full url is ${config.baseURL}${config.url}`);
      console.log("Token dari apinya", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAxiosResponseInterceptor = (navigation) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log(error);
        navigation.navigate("LoginSuccess");
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
