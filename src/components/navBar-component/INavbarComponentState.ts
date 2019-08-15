import { User } from "../../models/user";

export interface INavbarComponentState{
    user: User;
    anchorEl: any;
    openFolderDialog: boolean;
}