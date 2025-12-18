import axios from "axios";
axios.defaults.baseURL = "http://192.168.0.160:5173/";
const customFetch = axios.create({
  baseURL: "/api/v1",
});

export default customFetch;
