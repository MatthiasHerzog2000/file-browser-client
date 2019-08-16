export interface ILoginState {
  username: string;
  password: string;
  open: boolean;
  type: string;
  message: string;
  isLoading: boolean;
  handleClose(): void;
}
