import axios from "axios";
import { BASE_URL } from "../config";
export const API_PREFIX = "";
const axiosApi = axios.create({
  baseURL: `${BASE_URL}/${API_PREFIX}`,
});
export const axiosInstance = axiosApi;
