import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config/config";

class ApiClientService {
  async configureClient() {
    axios.defaults.baseURL = config.apiRoot;
    axios.defaults.timeout = config.timeout;
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(this.onRequest);
    axios.interceptors.response.use(this.onResponse, this.onResponseError);
  }

  onRequest(request: AxiosRequestConfig) {
    return request;
  }

  onResponse(response: AxiosResponse) {
    console.log(response);
    return response;
  }

  onResponseError(error: AxiosError) {
    return Promise.reject(error);
  }
}

export default new ApiClientService();
