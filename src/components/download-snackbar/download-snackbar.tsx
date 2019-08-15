import React, { Component } from "react";
import { IDownloadSnackbarProps, styles } from "./IDownloadSnackbarProps";
import { IDownloadSnackbarState } from "./IDownloadSnackbarState";
import {
  Snackbar,
  SnackbarContent,
  CircularProgress,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";

class DownloadSnackbar extends Component<
  IDownloadSnackbarProps,
  IDownloadSnackbarState
> {
  constructor(props: IDownloadSnackbarProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { open, classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={open}
        >
          <SnackbarContent
            className={classes.info}
            aria-describedby="client-snackbar"
            message={this.props.downloads.map((val, ind, arr) => {
              return (
                <div key={ind}>
                  {val.state === "preparing" ? (
                    <span id="client-snackbar" className={classes.message}>
                      <CircularProgress className={classes.progress} />
                      Preparing File {val.key}...
                    </span>
                  ) : (
                    <span id="client-snackbar" className={classes.message}>
                      <CircularProgress
                        variant="static"
                        value={val.progress}
                        className={classes.progress}
                      />
                      Downloading File {val.key}...
                    </span>
                  )}
                </div>
              );
            })}
            action={[]}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(DownloadSnackbar);
