import { Theme, createStyles, WithStyles } from "@material-ui/core";

import { IFile } from "../../models/file";

const drawerWidth = 300;
export const styles = (theme: Theme) => createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      spacingxs: {
        margin: 0,
        width: '100%'
      },
      detailsAlignment: {
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
      sidebarTitle: {
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
      }
})

export interface ISidebarComponentProps extends WithStyles<typeof styles>{
    selectedFile: IFile;
}