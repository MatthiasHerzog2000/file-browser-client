import axios from "axios";
const SERVER_URL = `http://${window.location.hostname}:8080/login`;
export class LoginService {
  /**
   * login
   */
  public static login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      const body = {
        username: username,
        password: password
      };
      console.log(body);
      axios
        .post(SERVER_URL, body, {
          headers: { "Content-type": "application/json" }
        })
        .then(data => {
          console.log(data);
          resolve(data.data);
        })
        .catch(err => resolve(err.response.data));
    });
  }
}
