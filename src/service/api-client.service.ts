import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import sessionService from "./session/session.service";

class ApiClientService {
  async configureClient() {
    const session = await sessionService.validateSession();

    axios.defaults.baseURL = config.apiRoot;
    axios.defaults.timeout = 10000;
    axios.defaults.headers.common = { Authorization: `token ${session.token}` };

    axios.interceptors.request.use(this.onRequest);
    axios.interceptors.response.use(this.onResponse, this.onResponseError);
  }

  onRequest(request: AxiosRequestConfig) {
    return request;
  }

  onResponse(response: AxiosResponse) {
    return response;
  }

  onResponseError(error: AxiosError) {
    if (error?.response?.status === 429) sessionService.validateSession();

    return Promise.reject(error);
  }
}

export default new ApiClientService();
