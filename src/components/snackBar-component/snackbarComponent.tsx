import React, { Component } from "react";
import {
  Snackbar,
  Button,
  IconButton,
  withStyles,
  SnackbarContent
} from "@material-ui/core";
import { ISnackbarComponentState } from "./ISnackbarComponentState";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { ISnackbarComponentProps, styles } from "./ISnackbarComponentProps";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
const variantIcon: any = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};
class SnackbarComponent extends Component<
  ISnackbarComponentProps,
  ISnackbarComponentState
> {
  constructor(props: ISnackbarComponentProps) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, type, message, handleClose, open, ...other } = this.props;
    const Icon = variantIcon[type];
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <SnackbarContent
            className={clsx(classes[type], type)}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
            {...other}
          />
        </Snackbar>
      </div>
    );
  }
}
export default withStyles(styles)(SnackbarComponent);
