import { User } from "../models/user";

export class AuthService {
  private static _instance: AuthService;

  private constructor(
    public token: string | null = "",
    public user: User | null = null
  ) {}

  public static Instantiate() {
    if (
      localStorage.hasOwnProperty("token") &&
      localStorage.hasOwnProperty("user")
    ) {
      this._instance = new AuthService(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user") as string)
      );
    }
  }
  public static get Instance() {
    if (
      localStorage.hasOwnProperty("token") &&
      localStorage.hasOwnProperty("user")
    ) {
      return (this._instance = new AuthService(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user") as string)
      ));
    } else {
      return (this._instance = new AuthService("", null));
    }
  }

  public static Logout() {
    this._instance = new AuthService("", null);
    localStorage.clear();
  }
}
