import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.10.102.67:8080/api/v1",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token when request", token);
      console.log("usrl when request", config.baseURL + config.url);
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