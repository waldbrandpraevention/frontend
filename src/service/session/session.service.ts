import { AxiosInstance } from "axios";
import SessionDetails from "./model/session-details";

const axios = require("axios");

class SessionService {
  private sessionDetails: SessionDetails;
  private client: AxiosInstance;

  constructor() {
    this.sessionDetails = {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),

      authenticated: false,
      authorized: false,
    };
  }

  public async validateSession(): Promise<SessionDetails> {
    const response = await axios.get(`${config.apiRoot}/session/validate`, {
      headers: { Authorization: `Token ${this.sessionDetails?.token}` },
    });

    const session = response.data as SessionDetails;

    this.setSessionDetails(session);

    return this.sessionDetails;
  }

  setSessionDetails(sessionDetails: SessionDetails) {
    this.sessionDetails = sessionDetails;
    this.persistToken(sessionDetails?.token);
    this.persistUsername(sessionDetails?.username);

    this.fireSessionDetailEvent(this.sessionDetails);
  }

  getSessionDetails(): SessionDetails {
    return this.sessionDetails;
  }

  private persistToken(token: string) {
    axios.defaults.headers.common = { Authorization: `token ${token}` };
    localStorage.setItem("token", token);
  }

  getToken(): string {
    return this.sessionDetails?.token;
  }

  private persistUsername(username: string) {
    localStorage.setItem("username", username);
  }

  getUsername(): string {
    return this.sessionDetails?.username;
  }

  isAuthenticated(): boolean {
    return this.sessionDetails?.authenticated;
  }

  isAuthorized(): boolean {
    return this.sessionDetails.authorized;
  }

  async signOut(): Promise<void> {
    const session: SessionDetails = {
      token: this.sessionDetails?.token,
      username: "",

      authenticated: false,
      authorized: false,
    };

    this.setSessionDetails(session);
  }

  private fireSessionDetailEvent(session: SessionDetails) {
    const event = new CustomEvent<SessionDetails>("session", {
      detail: session,
    });

    document.dispatchEvent(event);
  }
}

export default new SessionService();
