import { createStyles, Theme, WithStyles } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";

export const styles: any = (theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.dark
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  });
export interface ISnackbarComponentProps extends WithStyles<typeof styles> {
  handleClose(): void;
  open: boolean;
  message: string;
  type: string;
}
