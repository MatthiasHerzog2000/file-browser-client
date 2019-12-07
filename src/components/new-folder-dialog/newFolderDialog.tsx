import React, { Component, SyntheticEvent } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import { INewFolderDialogProps } from './INewFolderDialogProps';
import { INewFolderState } from './INewFolderState';
import { NEW_FOLDER_HEADER, NEW_FOLDER_INPUT_FIELD } from '../../static/static-strings';

class NewFolderDialog extends Component<INewFolderDialogProps, INewFolderState> {
    constructor(props: INewFolderDialogProps) {
        super(props);
        this.state = {
            name: ''
        }
        
    }
    onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        this.props.addNewFolderDialog(this.state.name);
    }
  render() {
    return (
        <Dialog
        open={this.props.openFolderDialog}
        onClose={this.props.closeNewFolderDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <form onSubmit={e => this.onSubmit(e)}>
        <DialogTitle id="alert-dialog-title">{NEW_FOLDER_HEADER}</DialogTitle>
        <DialogContent>
         
          <FormControl margin="normal" required fullWidth>
    <InputLabel htmlFor="name">{NEW_FOLDER_INPUT_FIELD}</InputLabel>
            <Input id="name" name="name" onChange={e => this.setState({name: e.currentTarget.value})} autoComplete="name" autoFocus required/>
          </FormControl>
          
            
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={this.props.closeNewFolderDialog} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default NewFolderDialog
