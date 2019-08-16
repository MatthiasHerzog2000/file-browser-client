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
    message: {
      display: "flex",
      alignItems: "center"
    },
    progress: {
      margin: theme.spacing(1) * 2
    }
  });

export interface IDownloadSnackbarProps extends WithStyles<typeof styles> {
  downloads: Array<{ key: string; state: string; progress: number }>;
  open: boolean;
}
