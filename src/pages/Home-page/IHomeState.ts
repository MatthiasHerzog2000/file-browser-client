import { IFile } from "../../models/file";
import { Image } from "../../models/image";

export interface IHomeState {
  files: IFile;
  open: boolean;
  message: string;
  type: string;
  isLoading: boolean;
  selectedFile: IFile;
  showFile: IFile;
  backButton: boolean;
  downloadOpen: boolean;
  downloads: Array<{ key: string; state: string; progress: number }>;
  handleClose(): void;
}
