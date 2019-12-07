import Axios from "axios";
import { IPreviewOptions } from "../models/previewOptions";
const SERVER_URL = `http://${window.location.hostname}:8080/`;
const MICROSERVICE_GENERATE_PREVIEWS_URL = `http://${
  window.location.hostname
}:8081/`;
const MICROSERVICE_DOWNLOAD_FILE_URL = `http://${
  window.location.hostname
}:8082/`;

export class PathService {
  public static copyPDF(path: string, name: string): any {
    return new Promise((res, rej) => {
      Axios.post(
        MICROSERVICE_GENERATE_PREVIEWS_URL + "copyPDF",
        { path: path, name: name },
        { headers: { "Content-type": "application/json" } }
      )
        .then(data => {
          res(data.data);
        })
        .catch(err => res(err.response.data));
    });
  }
  public static getPDF(path: string) {
    return new Promise((resolve, reject) => {
      Axios.get(MICROSERVICE_GENERATE_PREVIEWS_URL + path, {
        responseType: "arraybuffer"
      }).then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        resolve(base64);
      });
    });
  }
  public static getFiles(path: String) {
    return new Promise((resolve, rejects) => {
      Axios.post(
        SERVER_URL + "getDirectory",
        { path: path, initPath: localStorage.getItem("initPath") },
        { headers: { "Content-type": "application/json" } }
      )
        .then(data => {
          resolve(data.data);
        })
        .catch(err => resolve(err.response.data));
    });
  }
  public static getInitialPath() {
    return new Promise((resolve, reject) => {
      Axios.get(SERVER_URL + "getInitialPath")
        .then(data => {
          resolve(data.data);
        })
        .catch(err => resolve(err.response.data));
    });
  }
  public static downloadFile(
    path: String,
    name: string,
    type: string,
    DownloadProgress: (value: ProgressEvent) => void
  ) {
    return new Promise((resolve, reject) => {
      Axios.post(
        MICROSERVICE_DOWNLOAD_FILE_URL + "downloadFile",
        { path: path, name: name, type: type, endType: 'desktop' },
        {
          headers: { "Content-type": "application/json" },
          responseType: "blob",
          onDownloadProgress: (progressEvent: ProgressEvent) =>
            DownloadProgress(progressEvent)
        }
      )
        .then(response => {

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          if (type === "directory") {
            link.setAttribute("download", name + ".zip");
          } else {
            link.setAttribute("download", name);
          }
          document.body.appendChild(link);
          link.click();
          resolve(true);
        })
        .catch(err => reject(err));
    });
  }
  public static newFolder(path: string, initPath: string, name: string) {
    return new Promise((resolve, reject) => {
      Axios.post(
        SERVER_URL + "newFolder",
        { path, initPath, name },
        { headers: { "Content-type": "application/json" } }
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(err => resolve(err.response.data));
    });
  }
  public static editName(newPath: string, initPath: string, oldPath: string) {
    return new Promise((resolve, reject) => {
      Axios.post(
        SERVER_URL + "editName",
        { newPath, initPath, oldPath },
        { headers: { "Content-type": "application/json" } }
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  }
  public static getPreview(outpath: string) {
    return new Promise((resolve, reject) => {
      Axios.get(MICROSERVICE_GENERATE_PREVIEWS_URL + outpath, {
        responseType: "arraybuffer"
      }).then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        resolve(base64);
      });
    });
  }
  public static generatePreview(path: string, options: IPreviewOptions) {
    return new Promise((resolve, reject) => {
      Axios.post(
        MICROSERVICE_GENERATE_PREVIEWS_URL + "generatePreview",
        { path, options },
        { headers: { "Content-type": "application/json" } }
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          if (err.response == undefined) {
            resolve({ success: false, err: err });
          } else {
            resolve(err.response.data);
          }
        });
    });
  }
}
