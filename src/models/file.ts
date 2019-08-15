export interface IFile {
    path: string;
    name: string;
    type: string;
    atime: string;
    mtime: string;
    size?: number;
    extension?: string;
    children?: Array<IFile>;
}