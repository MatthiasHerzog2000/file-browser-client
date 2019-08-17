import { IFooterComponentProps, styles } from "./IFooterComponentProps";
import { IFooterComponentState } from "./IFooterComponentState";
import React, { Component } from "react";
import classNames from "classnames";
import {
  Grid,
  withStyles,
  Typography,
  Tooltip,
  IconButton
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFileCode,
  faFileCsv,
  faFilePowerpoint,
  faFileArchive,
  faFileAudio,
  faFileVideo,
  faFile,
  faFolder
} from "@fortawesome/free-solid-svg-icons";
import { faJs, faHtml5, faJava } from "@fortawesome/free-brands-svg-icons";

class FooterComponent extends Component<
  IFooterComponentProps,
  IFooterComponentState
> {
  constructor(props: IFooterComponentProps) {
    super(props);
    this.state = {};
  }
  getFileIcon = () => {
    let jsx: any;
    if (!!this.props.selectedFile.extension) {
      switch (this.props.selectedFile.extension) {
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
      <footer className={classes.footer}>
        <div className={classes.floatright}>
          <Grid container spacing={4} justify="space-evenly">
            <Grid item>{this.getFileIcon()}</Grid>
          </Grid>
        </div>
        <div className={classes.floatleft}>
          <Grid container spacing={4} justify="space-between">
            <Grid xs={7} item>
              <Typography variant="h6" align="center">
                {this.props.selectedFile.name}
                <Tooltip title="Name">
                  <IconButton aria-label="Name">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid xs={5} item>
              {!!this.props.selectedFile.size ? (
                <Typography variant="h6" align="center">
                  {this.props.selectedFile.size / 1024 / 1024} MB
                  <Tooltip title="Größe">
                    <IconButton aria-label="Größe">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
              ) : (
                <Typography variant="h6" align="center">
                  {this.props.selectedFile.type}
                </Typography>
              )}
            </Grid>
            <Grid xs={7} item>
              {!!this.props.selectedFile.atime ? (
                <Typography variant="h6" align="center">
                  {new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(new Date(this.props.selectedFile.atime))}{" "}
                  <Tooltip title="Letzer Zugriff">
                    <IconButton aria-label="Letzter Zugriff">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
              ) : (
                <Typography variant="h6" align="center">
                  Root
                </Typography>
              )}
            </Grid>
            <Grid xs={5} item>
              {!!this.props.selectedFile.mtime ? (
                <Typography variant="h6" align="center">
                  {new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(new Date(this.props.selectedFile.mtime))}{" "}
                  <Tooltip title="Erstelldatum">
                    <IconButton aria-label="Erstelldatum">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
              ) : (
                <Typography variant="h6" align="center">
                  Root
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(FooterComponent);
