import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { apiRoot, apiTimeout } from "../config/config";
import { hasLocalToken, loadLocalToken } from "./auth";

class ApiClientService { /* only one instance -> static */
  static configureClient() {
    axios.defaults.baseURL = apiRoot;
    axios.defaults.timeout = apiTimeout;

    if (hasLocalToken())
      axios.defaults.headers["Authorization"] = "Bearer " + loadLocalToken()

    axios.interceptors.request.use(this.onRequest);
    axios.interceptors.response.use(this.onResponse, this.onResponseError);
  }

  static onRequest(request: AxiosRequestConfig) {
    return request;
  }

  static onResponse(response: AxiosResponse) {
    return response;
  }

  static onResponseError(error: AxiosError) {
    return Promise.reject(error);
  }

  static setToken(token: string) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
  }

  static deleteToken() {
    delete axios.defaults.headers["Authorization"];
  }
}

export default ApiClientService;
