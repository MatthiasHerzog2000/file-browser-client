import { WithStyles, createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      flexWrap: "wrap"
    },
    paper: {
      padding: theme.spacing(1)
    },
    body1: {
      lineHeight: "4",
      fontSize: "1.3rem"
    }
  });
export interface ISecondNavigationProps extends WithStyles<typeof styles> {
  path: string;
}
