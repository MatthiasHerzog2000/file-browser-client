import React, { Component, SyntheticEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFileComponentProps, styles } from "./IFileComponentProps";

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
import { faJs, faHtml5, faJava } from "@fortawesome/free-brands-svg-icons";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Typography,
  withStyles,
  IconButton,
  Grid,
  TextField
} from "@material-ui/core";
import { IFileComponentState } from "./IFileComponentState";
import { PathService } from "../../utils/path-service";
import { IFile } from "../../models/file";
import DetailedFileView from "../detailed-file-view/detailed-file-view";
import { IPreviewOptions } from "../../models/previewOptions";

class FileComponent extends Component<
  IFileComponentProps,
  IFileComponentState
> {
  constructor(props: IFileComponentProps) {
    super(props);
    this.state = {
      editClicked: false,
      newName: "",
      base64: undefined,
      open: false
    };
  }
  async componentWillMount() {
    if (this.props.file.type !== "directory") {
      const options: IPreviewOptions = {
        quality: 70,
        width: 120,
        height: 170,
        isDetailed: false
      };
      const response: any = await PathService.generatePreview(
        this.props.file.path,
        options
      );
      if (response.success) {
        console.log(response);
        const base = await PathService.getPreview(response.outpath);
        this.setState({ base64: "data:;base64," + base });
      } else {
        this.setState({ base64: undefined });
      }
    }
  }
  DownloadProgress = (value: ProgressEvent) => {
    this.props.onProgress(
      this.props.file.name,
      Math.round((value.loaded * 100) / value.total),
      "downloading"
    );
  };
  handleClick = () => {
    this.props.handleClick(this.props.file);
  };
  getImage = () => {
    return (
      <img
        style={{ margin: "auto", display: "block" }}
        src={this.state.base64}
      />
    );
  };
  handleDoubleClick = async () => {
    if (!!this.props.file.extension) {
      this.setState({ open: true });
    } else {
      const newDir: any = await PathService.getFiles(this.props.file.path);
      if (!!newDir.directoryTree.children) {
        this.props.handleDoubleClick(newDir.directoryTree as IFile);
      }
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  downloadClick = async () => {
    this.props.downloadStarted(this.props.file.name, "preparing", 0);
    const success = await PathService.downloadFile(
      this.props.file.path,
      this.props.file.name,
      this.props.file.type,
      this.DownloadProgress
    );
    console.log(success);
    this.props.downloadFinished(this.props.file.name);
  };
  editClick = () => {
    this.setState({
      editClicked: !this.state.editClicked,
      newName: this.props.file.name
    });
  };
  onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (this.props.file.type === "directory") {
      if (this.state.newName.split(".").length === 0) {
        this.props.changeName(this.state.newName, this.props.file.path);
      } else {
        this.props.changeName(
          this.state.newName.split(".")[0],
          this.props.file.path
        );
      }
    } else {
      this.props.changeName(
        this.state.newName.split(".")[0] + this.props.file.extension,
        this.props.file.path
      );
    }
    this.setState({ editClicked: false });
  };
  getFileIcon = () => {
    let jsx: any;
    if (!!this.props.file.extension) {
      switch (this.props.file.extension) {
        case ".jpeg":
        case ".jpg":
        case ".svg":
          jsx = (
            <FontAwesomeIcon
              color="darkGrey"
              className={this.props.classes.icon}
              size="5x"
              icon={faFileImage}
            />
          );
          break;
        case ".pdf":
          jsx = (
            <FontAwesomeIcon
              color="red"
              className={this.props.classes.icon}
              size="5x"
              icon={faFilePdf}
            />
          );
          break;
        case ".docx":
        case ".doc":
          jsx = (
            <FontAwesomeIcon
              color="blue"
              className={this.props.classes.icon}
              size="5x"
              icon={faFileWord}
            />
          );
          break;
        case ".xlsx":
        case ".xls":
          jsx = (
            <FontAwesomeIcon
              color="green"
              className={this.props.classes.icon}
              size="5x"
              icon={faFileExcel}
            />
          );
          break;
        case ".js":
          jsx = (
            <FontAwesomeIcon
              color="yellow"
              className={this.props.classes.icon}
              size="5x"
              icon={faJs}
            />
          );
          break;
        case ".html":
          jsx = (
            <FontAwesomeIcon
              color="lightOrange"
              className={this.props.classes.icon}
              size="5x"
              icon={faHtml5}
            />
          );
          break;
        case ".java":
          jsx = (
            <FontAwesomeIcon
              color="lightGrey"
              className={this.props.classes.icon}
              size="5x"
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
              className={this.props.classes.icon}
              size="5x"
              icon={faFileCode}
            />
          );
          break;
        case ".csv":
          jsx = (
            <FontAwesomeIcon
              color="green"
              className={this.props.classes.icon}
              size="5x"
              icon={faFileCsv}
            />
          );
          break;
        case ".pptx":
        case ".ppt":
          jsx = (
            <FontAwesomeIcon
              color="orange"
              className={this.props.classes.icon}
              size="5x"
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
              className={this.props.classes.icon}
              size="5x"
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
              className={this.props.classes.icon}
              size="5x"
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
              className={this.props.classes.icon}
              size="5x"
              icon={faFileVideo}
            />
          );
          break;
        default:
          jsx = (
            <FontAwesomeIcon
              color="lightGrey"
              className={this.props.classes.icon}
              size="5x"
              icon={faFile}
            />
          );
          break;
      }
    } else {
      return (
        <FontAwesomeIcon
          color="lightGrey"
          className={this.props.classes.icon}
          size="5x"
          icon={faFolder}
        />
      );
    }
    return jsx;
  };
  render() {
    const { classes } = this.props;
    return (
      <div
        onDoubleClick={this.handleDoubleClick}
        onClick={this.handleClick}
        style={{ backgroundColor: this.props.backgroundColor }}
        className={classes.border}
      >
        <Grid container justify="space-between">
          <IconButton onClick={() => this.downloadClick()}>
            <CloudDownloadIcon />
          </IconButton>
          <IconButton onClick={() => this.editClick()}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => this.downloadClick()}>
            <DeleteIcon />
          </IconButton>
        </Grid>
        <div className={classes.padding}>
          {this.state.base64 != undefined
            ? this.getImage()
            : this.getFileIcon()}
          <div>
            {this.state.editClicked ? (
              <form onSubmit={e => this.onSubmit(e)}>
                <TextField
                  id="standard-uncontrolled"
                  margin="none"
                  onBlur={() => this.setState({ editClicked: false })}
                  onChange={e => this.setState({ newName: e.target.value })}
                  value={this.state.newName}
                  autoFocus
                  required
                />
              </form>
            ) : (
              <Typography
                variant="h6"
                className={`${classes.txtOverflow} ${classes.allignment}`}
              >
                {this.props.file.name}
              </Typography>
            )}
          </div>
        </div>
        {this.state.open ? (
          <DetailedFileView
            open={this.state.open}
            handleClose={this.handleClose}
            file={this.props.file}
          />
        ) : null}
      </div>
    );
  }
}
export default withStyles(styles)(FileComponent);
