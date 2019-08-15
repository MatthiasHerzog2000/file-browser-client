export interface INewFolderDialogProps {
    openFolderDialog: boolean;
    closeNewFolderDialog(): void;
    addNewFolderDialog(name: string): void;

}