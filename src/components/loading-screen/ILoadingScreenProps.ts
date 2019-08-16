import { WithStyles, Theme, createStyles } from "@material-ui/core";
import { green, amber } from "@material-ui/core/colors";

export const styles = (theme: Theme) =>
  createStyles({
    maxHeight: {
      height: "100%"
    },
    topHalf: {
      display: "flex",
      alignItems: "flex-end",
      height: "50%"
    },
    bottomHalf: {
      display: "flex",
      justifyContent: "space-evenly",
      height: "50%",
      paddingTop: "30px"
    }
  });
export interface ILoadingScreenProps extends WithStyles<typeof styles> {}
