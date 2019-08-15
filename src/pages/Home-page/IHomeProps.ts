import { createStyles, WithStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "react-router";

export const styles = (theme: Theme) =>
  createStyles({
    allignment: {
      textAlign: "center"
    },
    spacing: {
      marginTop: "3rem",
      marginBottom: "11em",
      overflow: "hidden"
    },
    progress: {
      margin: theme.spacing.unit * 2
    }
  });
export interface IHomeProps
  extends WithStyles<typeof styles>,
    RouteComponentProps<void> {}
