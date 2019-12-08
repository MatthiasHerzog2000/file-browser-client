export interface IFile {
  key: string;
  path: string;
  name: string;
  type: string;
  atime: string;
  mtime: string;
  size?: number;
  extension?: string;
  children?: Array<IFile>;
}
