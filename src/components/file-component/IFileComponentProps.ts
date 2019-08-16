import { IFile } from "../../models/file";
import { createStyles, WithStyles, Theme } from "@material-ui/core";
import { Image } from "../../models/image";
export const styles = (theme: Theme) =>
  createStyles({
    txtOverflow: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    allignment: {
      textAlign: "center",
      lineHeight: "2"
    },
    icon: {
      margin: "auto",
      display: "flex",
      paddingBottom: theme.spacing(1)
    },
    border: {
      border: "2px solid lightGrey",
      cursor: "pointer"
    },
    padding: {
      paddingBottom: theme.spacing(1)
    }
  });
export interface IFileComponentProps extends WithStyles<typeof styles> {
  file: IFile;
  backgroundColor: string;
  handleClick(file: IFile): void;
  handleDoubleClick(file: IFile): void;
  onProgress(key: string, progress: number, state: string): void;
  downloadStarted(key: string, state: string, progress: number): void;
  downloadFinished(key: string): void;
  changeName(newName: string, path: string): void;
}
