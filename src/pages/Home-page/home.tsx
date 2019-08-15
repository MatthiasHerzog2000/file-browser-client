import React, { Component } from "react";
import NavbarComponent from "../../components/navBar-component/navbarComponent";
import { IHomeState } from "./IHomeState";
import { PathService } from "../../utils/path-service";
import DownloadSnackbar from "../../components/download-snackbar/download-snackbar";
import {
  Grid,
  withStyles,
  CircularProgress,
  Typography
} from "@material-ui/core";
import FileComponent from "../../components/file-component/file-component";
import SnackbarComponent from "../../components/snackBar-component/snackbarComponent";
import { IFile } from "../../models/file";
import { styles, IHomeProps } from "./IHomeProps";
import FooterComponent from "../../components/footer-component/footer-component";
import { withRouter } from "react-router";

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      files: { path: "", name: "", atime: "", mtime: "", type: "" },
      open: false,
      isLoading: true,
      message: "",
      type: "error",
      backButton: false,
      downloads: [],
      downloadOpen: false,
      selectedFile: { path: "", name: "", atime: "", mtime: "", type: "" },
      showFile: { path: "", name: "", atime: "", mtime: "", type: "" },
      handleClose: () => this.handleClose()
    };
  }
  async componentWillMount() {
    const path = window.location.pathname;
    if (path !== localStorage.getItem("initPath")) {
      this.setState({ backButton: true });
    }
    const x = await this.reInitDirectory({ success: true, err: "" });
    if (this.state.showFile.path)
      window.history.pushState(
        this.state.showFile,
        "",
        this.state.showFile.path
      );
    console.log(this.state.files);
    window.onpopstate = e => {
      console.log(e);
      this.setState({ showFile: e.state as IFile });
    };
  }
  downloadStarted = (key: string, state: string, progress: number) => {
    this.setState({
      downloads: [...this.state.downloads, { key, state, progress }],
      downloadOpen: true
    });
  };
  onDownloadProgress = (key: string, progress: number, state: string) => {
    const copyArray = this.state.downloads;
    const downloadToUpdate = copyArray.find(val => val.key === key);
    downloadToUpdate!.progress = progress;
    downloadToUpdate!.state = "downloading";
    this.setState({ downloads: copyArray });
  };
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };
  finishedDownload = (key: string) => {
    const copyArray = this.state.downloads;
    copyArray.splice(copyArray.findIndex(val => val.key === key), 1);
    this.setState({ downloads: copyArray });
    if (this.state.downloads.length === 0) {
      this.setState({ downloadOpen: false });
    }
  };
  handleClick = (file: IFile) => {
    this.setState({ selectedFile: file });
  };
  handleDoubleClick = (file: IFile) => {
    this.setState({ showFile: file, backButton: true });
    let lastSlash = file.path.lastIndexOf("/");
    let path = file.path.slice(lastSlash, file.path.length);
    window.history.pushState(file, "", window.location.href + path);
    console.log(this.state.showFile);
  };
  reInitDirectory = async (response: any) => {
    if (response.success) {
      const path = window.location.pathname;
      const fileObject: any = await PathService.getFiles(path);
      console.log(fileObject);
      if (fileObject.success) {
        this.setState({ files: fileObject.directoryTree as IFile });
        this.setState({ selectedFile: this.state.files });
        this.setState({ showFile: this.state.files });
      } else {
        this.setState({ open: true, message: fileObject.err });
      }
      this.setState({ isLoading: false });
    } else {
      this.setState({ open: true, message: response.err });
    }
  };
  newFolderAdded = (response: any) => {
    this.reInitDirectory(response);
  };
  changeName = async (newName: string, path: string) => {
    const newPath = path.substr(0, path.lastIndexOf("/")) + "/" + newName;
    const response: any = await PathService.editName(
      newPath,
      localStorage.getItem("initPath") as string,
      path
    );
    if (response.success) {
      this.reInitDirectory(response);
    }
  };
  backButtonClicked = async () => {
    this.setState({ isLoading: true });
    let lastSlash = this.state.showFile.path.lastIndexOf("/");
    let path = this.state.showFile.path.slice(0, lastSlash);
    console.log(path);
    const res: any = await PathService.getFiles(path);
    if (res.directoryTree != null) {
      this.setState({ showFile: res.directoryTree as IFile, isLoading: false });
      if (res.directoryTree.path === this.state.files.path) {
        this.setState({ backButton: false });
      }
    }
    window.history.back();
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <header>
          <NavbarComponent
            newFolderAdded={this.newFolderAdded}
            selectedPath={this.state.showFile.path}
            backButtonClicked={this.backButtonClicked}
            backButton={this.state.backButton}
          />
        </header>
        <main className={classes.spacing}>
          {!this.state.isLoading ? (
            <div>
              <Typography variant="h2">Folders</Typography>
              <Grid container spacing={24}>
                {this.state.showFile.children!.map((val, index) => {
                  return val.type != undefined ? (
                    <Grid key={`${index} Grid`} item xs={2}>
                      <FileComponent
                        key={`${val.path} ${index} File`}
                        changeName={this.changeName}
                        handleDoubleClick={this.handleDoubleClick}
                        downloadFinished={this.finishedDownload}
                        downloadStarted={this.downloadStarted}
                        onProgress={this.onDownloadProgress}
                        handleClick={this.handleClick}
                        backgroundColor={
                          val.name === this.state.selectedFile.name
                            ? "aliceblue"
                            : "transparent"
                        }
                        file={val}
                      />
                    </Grid>
                  ) : null;
                })}
              </Grid>
              <Typography variant="h2" style={{ marginTop: "2em" }}>
                Files
              </Typography>
              <Grid container spacing={24}>
                {this.state.showFile.children!.map((val, index) => {
                  return val.type != "directory" ? (
                    <Grid key={`${index} Grid`} item xs={2}>
                      <FileComponent
                        key={`${val.path} ${index} File`}
                        changeName={this.changeName}
                        downloadFinished={this.finishedDownload}
                        downloadStarted={this.downloadStarted}
                        onProgress={this.onDownloadProgress}
                        handleDoubleClick={this.handleDoubleClick}
                        handleClick={this.handleClick}
                        backgroundColor={
                          val.name === this.state.selectedFile.name
                            ? "aliceblue"
                            : "transparent"
                        }
                        file={val}
                      />
                    </Grid>
                  ) : null;
                })}
              </Grid>
            </div>
          ) : (
            <CircularProgress
              style={{ margin: "auto" }}
              className={classes.progress}
            />
          )}
          <SnackbarComponent
            handleClose={this.state.handleClose}
            message={this.state.message}
            type={this.state.type}
            open={this.state.open}
          />
          <DownloadSnackbar
            downloads={this.state.downloads}
            open={this.state.downloadOpen}
          />
        </main>

        {this.state.selectedFile.name !== "" ? (
          <FooterComponent selectedFile={this.state.selectedFile} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Home));
