import React, { Component } from "react";
import { ISecondNavigationProps, styles } from "./ISecondNavigationProps";
import { ISecondNavigationState } from "./ISecondNavigationState";
import { Link as RouterLink } from "react-router-dom";
import {
  withStyles,
  Paper,
  Link,
  Typography,
  Breadcrumbs
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

class SecondNavigation extends Component<
  ISecondNavigationProps,
  ISecondNavigationState
> {
  constructor(props: ISecondNavigationProps) {
    super(props);
    this.state = {
      pathArray: []
    };
  }
  handleClick = () => {};
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
            {this.props.path.map((val, ind, arr) => {
              return (
                <Link
                  color="inherit"
                  onClick={() => this.props.onSecondNavClicked(val, arr)}
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
