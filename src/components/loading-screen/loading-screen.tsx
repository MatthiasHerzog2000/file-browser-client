import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { ILoadingScreenProps, styles } from "./ILoadingScreenProps";
import { withStyles } from "@material-ui/core";
import "./LoadingScreen.scss";

class LoadingScreen extends Component<ILoadingScreenProps> {
  constructor(props: ILoadingScreenProps) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.maxHeight}>
        <div className={classes.topHalf}>
          <img
            src={process.env.PUBLIC_URL + "/file-browser-logo.png"}
            alt=""
            width="100"
            className="pulse"
          />
        </div>
        <div className={classes.bottomHalf}>
          <div className="bar bar1" />
          <div className="bar bar2" />
          <div className="bar bar3" />
          <div className="bar bar4" />
          <div className="bar bar5" />
          <div className="bar bar6" />
          <div className="bar bar7" />
          <div className="bar bar8" />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(LoadingScreen);
