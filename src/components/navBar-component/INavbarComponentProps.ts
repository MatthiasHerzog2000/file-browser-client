import { WithStyles, createStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";

const drawerWidth = 280;
export const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  space: {
    marginLeft: "0.5rem"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
});

export interface INavbarComponentProps
  extends WithStyles<typeof styles>,
    RouteComponentProps<any> {
  backButton: boolean;
  backButtonClicked(): void;
  selectedPath: string;
  newFolderAdded(response: any): void;
}
