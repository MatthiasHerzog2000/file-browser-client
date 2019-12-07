import React, { Props } from "react";
import {
  faFilePdf,
  faFolder,
  faFileImage,
  faFile,
  faFileWord,
  faFileExcel,
  faFileArchive,
  faFileCsv,
  faFileCode,
  faFilePowerpoint,
  faFileAudio,
  faFileVideo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJs, faHtml5, faJava } from "@fortawesome/free-brands-svg-icons";
import { IFile } from "../models/file";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

const classes = {
  icon: {
    margin: "auto",
    display: "flex",
    padding: "1rem",
  }
}
export default class IconFinder {
  public static getFileIcon = (file: IFile, icon: any, size: SizeProp) => {
    let jsx: any;
    if (file.extension) {
      switch (file.extension) {
        case ".jpeg":
        case ".jpg":
        case ".svg":
          jsx = (
            <FontAwesomeIcon
              color="darkGrey"
              style={icon}
              size={size}
              icon={faFileImage}
            />
          );
          break;
        case ".pdf":
          jsx = (
            <FontAwesomeIcon
              color="red"
              style={icon}
              size={size}
              icon={faFilePdf}
            />
          );
          break;
        case ".docx":
        case ".doc":
          jsx = (
            <FontAwesomeIcon
              color="blue"
              style={icon}
              size={size}
              icon={faFileWord}
            />
          );
          break;
        case ".xlsx":
        case ".xls":
          jsx = (
            <FontAwesomeIcon
              color="green"
              style={icon}
              size={size}
              icon={faFileExcel}
            />
          );
          break;
        case ".js":
          jsx = (
            <FontAwesomeIcon
              color="yellow"
              style={icon}
              size={size}
              icon={faJs}
            />
          );
          break;
        case ".html":
          jsx = (
            <FontAwesomeIcon
              color="lightOrange"
              style={icon}
              size={size}
              icon={faHtml5}
            />
          );
          break;
        case ".java":
          jsx = (
            <FontAwesomeIcon
              color="lightGrey"
              style={icon}
              size={size}
              icon={faJava}
            />
          );
          break;
        case ".cs":
        case ".c":
        case ".h":
          jsx = (
            <FontAwesomeIcon
              color="violet"
              style={icon}
              size={size}
              icon={faFileCode}
            />
          );
          break;
        case ".csv":
          jsx = (
            <FontAwesomeIcon
              color="green"
              style={icon}
              size={size}
              icon={faFileCsv}
            />
          );
          break;
        case ".pptx":
        case ".ppt":
          jsx = (
            <FontAwesomeIcon
              color="orange"
              style={icon}
              size={size}
              icon={faFilePowerpoint}
            />
          );
          break;
        case ".zip":
        case ".targz":
        case ".rar":
          jsx = (
            <FontAwesomeIcon
              color="black"
              style={icon}
              size={size}
              icon={faFileArchive}
            />
          );
          break;
        case ".mp3":
        case ".wav":
        case ".wma":
          jsx = (
            <FontAwesomeIcon
              color="lightGrey"
              style={icon}
              size={size}
              icon={faFileAudio}
            />
          );
          break;
        case ".avi":
        case ".mp4":
        case ".wmv":
        case ".mpg":
          jsx = (
            <FontAwesomeIcon
              color="turquoise"
              style={icon}
              size={size}
              icon={faFileVideo}
            />
          );
          break;
        default:
          jsx = (
            <FontAwesomeIcon
              color="lightGrey"
              style={icon}
              size={size}
              icon={faFile}
            />
          );
          break;
      }
    } else {
      return (
        <FontAwesomeIcon
          color="lightGrey"
          style={icon}
          size={size}
          icon={faFolder}
        />
      );
    }
    return jsx;
  };
}
