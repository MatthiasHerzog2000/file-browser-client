import { IFile } from "../../models/file";

export interface IHomeState {
  files: IFile;
  open: boolean;
  message: string;
  type: string;
  uploadFile: boolean;
  isLoading: boolean;
  selectedFile: IFile;
  showFile: IFile;
  backButton: boolean;
  downloadOpen: boolean;
  draggedOverFileId: string;
  internalFileMovement: string;
  downloads: Array<{ key: string; state: string; progress: number }>;
  handleClose(): void;
}
