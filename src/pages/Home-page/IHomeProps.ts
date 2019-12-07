import { createStyles, WithStyles, Theme } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
const drawerWidth = 300;
export const styles = (theme: Theme) =>
  createStyles({
    allignment: {
      textAlign: "center"
    },
    spacing: {
      marginTop: "3rem",
      marginBottom: "11em",
      overflow: "hidden",
      width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    },
    spacingxs: {
      margin: 0,
      width: '100%'
    },
    progress: {
      margin: theme.spacing(1) * 2
    }
  });
export interface IHomeProps
  extends WithStyles<typeof styles>,
    RouteComponentProps<void> {}
