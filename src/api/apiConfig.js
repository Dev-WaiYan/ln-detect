import axios from "axios";
import { API_BASE_ENDPOINT } from "../constants/api";
import { AUTH_TOKEN } from "../constants/store";
import store from "../store/store";

const apiConfig = {
  getApiInstance: function () {
    return axios.create({
      baseURL: API_BASE_ENDPOINT,
      headers: { "Auth-Token": store.getItem(AUTH_TOKEN) },
    });
  },
};

export default apiConfig;
