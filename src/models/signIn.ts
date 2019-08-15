import { User } from "./user";

export interface SignIn {
    success: boolean;
    err: string;
    token?: string;
    user?: User;
}