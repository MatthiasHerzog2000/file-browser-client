import React, { Component } from "react";
import { ISecondNavigationProps, styles } from "./ISecondNavigationProps";
import { ISecondNavigationState } from "./ISecondNavigationState";
import {
  withStyles,
  Paper,
  Link,
  Typography,
  Breadcrumbs
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import classes from "*.module.css";

class SecondNavigation extends Component<
  ISecondNavigationProps,
  ISecondNavigationState
> {
  constructor(props: ISecondNavigationProps) {
    super(props);
    this.state = {
      pathArray: this.props.path.split("/")
    };
  }
  handleClick = () => {};
  static getDerivedStateFromProps(props: ISecondNavigationProps) {
    return { pathArray: props.path.split("/") };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={0} className={classes.paper}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="default" />}
            aria-label="breadcrumb"
            classes={{
              root: classes.body1
            }}
          >
            {this.state.pathArray.map((val, ind, arr) => {
              return (
                <Link
                  color="inherit"
                  href="/"
                  onClick={this.handleClick}
                  key={ind}
                >
                  {val}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(SecondNavigation);
