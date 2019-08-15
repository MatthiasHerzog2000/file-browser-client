import { IFile } from "../../models/file";
import { Theme, createStyles, WithStyles } from "@material-ui/core";
import { green, amber } from "@material-ui/core/colors";

export const styles = (theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.light
    },
    warning: {
      backgroundColor: amber[700]
    },
    MuiDialogContent: {
      display: "flex !important",
      justifyContent: "center !important"
    },
    DialogTitle: {
      "& h6": {
        justifyContent: "space-between",
        display: "flex"
      }
    },
    SiteNumber: {
      margin: "auto !important"
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    progress: {
      margin: "auto"
    },
    MuiPaperTrans: {
      backgroundColor: "transparent"
    },
    MuiPaperWhite: {
      backgroundColor: "white"
    }
  });

export default interface IDetailedFileViewProps
  extends WithStyles<typeof styles> {
  open: boolean;
  file: IFile;
  handleClose(): void;
}
