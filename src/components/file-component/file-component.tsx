import React, { Component, SyntheticEvent } from "react";

import { IFileComponentProps, styles } from "./IFileComponentProps";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Typography,
  withStyles,
  IconButton,
  Grid,
  TextField,
  Tooltip
} from "@material-ui/core";
import { IFileComponentState } from "./IFileComponentState";
import { PathService } from "../../utils/path-service";
import { IFile } from "../../models/file";
import DetailedFileView from "../detailed-file-view/detailed-file-view";
import { IPreviewOptions } from "../../models/previewOptions";
import IconFinder from "../../utils/IconFinder";
import { DELETE_TOOLTIP, RENAME_TOOLTIP, DOWNLOAD_TOOLTIP } from "../../static/static-strings";

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
        className={this.props.classes.padding}
        style={{ margin: "auto", display: "block" }}
        src={this.state.base64}
        alt={this.props.file.name}
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
  
  
  render() {
    const { classes } = this.props;
    return (
      <div
        onDoubleClick={this.handleDoubleClick}
        onClick={this.handleClick}
        className={classes.border}
        style={{borderColor: this.props.currentDraggedOverFileId === this.props.file.key ? '#039BE5' : 'lightGrey'}}
      >
        <Grid container justify="space-between">
          <Tooltip placement='top' title={DOWNLOAD_TOOLTIP}>
          <IconButton onClick={() => this.downloadClick()}>
            <CloudDownloadIcon />
          </IconButton>
          </Tooltip>
          <Tooltip placement='top' title={RENAME_TOOLTIP}>
          <IconButton onClick={() => this.editClick()}>
            <EditIcon />
          </IconButton>
          </Tooltip>
          <Tooltip placement='top' title={DELETE_TOOLTIP}>
          <IconButton onClick={() => this.downloadClick()}>
            <DeleteIcon />
          </IconButton>
          </Tooltip>
        </Grid>
        <div>
          {this.state.base64 != undefined
            ? this.getImage()
            : IconFinder.getFileIcon(this.props.file, {margin: 'auto', display: 'flex', padding: '1rem'}, '5x')}
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
                style={{ backgroundColor: this.props.backgroundColor, color: this.props.backgroundColor === 'transparent' ? 'black' : 'white' }}
                variant="body1"
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
