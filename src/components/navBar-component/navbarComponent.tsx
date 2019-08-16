import React, { Component, SyntheticEvent } from "react";
import { INavbarComponentProps, styles } from "./INavbarComponentProps";
import { INavbarComponentState } from "./INavbarComponentState";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { AuthService } from "../../utils/auth-service";
import { User } from "../../models/user";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import NewFolderDialog from "../new-folder-dialog/newFolderDialog";
import { PathService } from "../../utils/path-service";
import { withRouter } from "react-router";

class NavbarComponent extends Component<
  INavbarComponentProps,
  INavbarComponentState
> {
  constructor(props: INavbarComponentProps) {
    super(props);
    this.state = {
      user: AuthService.Instance.user as User,
      anchorEl: null,
      openFolderDialog: false
    };
  }
  handleClick = (event: SyntheticEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    AuthService.Logout();
    this.props.history.push("/");
  };
  addNewFolderDialog = async (name: string) => {
    const response: any = await PathService.newFolder(
      this.props.selectedPath,
      localStorage.getItem("initPath") as string,
      name
    );
    this.setState({ openFolderDialog: false });
    this.props.newFolderAdded(response);
  };
  closeNewFolderDialog = () => {
    this.setState({ openFolderDialog: false });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {this.props.backButton ? (
              <IconButton
                onClick={() => this.props.backButtonClicked()}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <div />
            )}

            <Typography variant="h5" color="inherit" className={classes.grow}>
              File-Browser
            </Typography>

            <div>
              <Button
                color="inherit"
                onClick={() => this.setState({ openFolderDialog: true })}
              >
                Neuer Ordner
                <CreateNewFolderIcon className={classes.space} />
              </Button>
              <Button color="inherit">
                Upload
                <CloudUploadIcon className={classes.space} />
              </Button>
              <Button
                color="inherit"
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                {this.state.user.username}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <NewFolderDialog
          openFolderDialog={this.state.openFolderDialog}
          closeNewFolderDialog={this.closeNewFolderDialog}
          addNewFolderDialog={this.addNewFolderDialog}
        />
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(NavbarComponent));
