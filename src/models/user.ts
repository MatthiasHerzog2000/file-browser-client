export interface User {
  name: string;
  email: string;
  paths: {path: string, read: number, write: number};
}
