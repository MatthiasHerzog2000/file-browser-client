import { WithStyles, createStyles, Theme } from "@material-ui/core";
import { IFile } from "../../models/file";

export const styles = (theme: Theme) => createStyles({
    footer: {
        position: 'fixed',
        boxShadow: '0 0 1em',
  bottom: 0,
  backgroundColor: 'white',
  width: '100%',
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `1em 0`,
    },
      icon: {
        margin: "auto",
        display: "flex"
    },
        
    floatleft: {
            float:'left',
            width: '80%',
        },
        
        floatright: {
        float: 'right',
            width: '20%',
        },
        allignment: {
            textAlign: "center"
        },
})

export interface IFooterComponentProps extends WithStyles<typeof styles>{
    selectedFile: IFile;
}