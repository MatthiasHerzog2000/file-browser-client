import React, { Component } from 'react'
import { ISidebarComponentProps, styles } from './ISidebarComponentProps'
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, withStyles, Typography, Grid } from '@material-ui/core'
import IconFinder from '../../utils/IconFinder';
import { DETAILS_TYPE, DETAILS_SIZE, DETAILS_CHANGED, DETAILS_MADE, DETAILS_SAVE } from '../../static/static-strings';

class SidebarComponent extends Component<ISidebarComponentProps, {}> {
    _renderSize = (bytes: number, si: boolean) =>  {
        var thresh = si ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) {
          return bytes + " B";
        }
        var units = si
          ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
          : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        var u = -1;
        do {
          bytes /= thresh;
          ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + " " + units[u];
    }
    _renderSavePlace = () => {
        let path = this.props.selectedFile.path;
        let initPath = localStorage.getItem('initPath');
        if(path.split('/').length === initPath!.split('/').length + 1) {
            return '/'
        } else {
            return path.split('/')[path.split('/').length - 2];
        }
    }
    render() {
        const {classes} = this.props
        return (
            <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={`${classes.toolbar} ${classes.sidebarTitle}`}>
    <Typography variant='h6'>{this.props.selectedFile.name ? this.props.selectedFile.name : 'Keine Datei ausgewählt'}</Typography>
        </div>
        <Divider />
        {IconFinder.getFileIcon(this.props.selectedFile, {display: 'flex', alignSelf: 'center', padding: '4rem'}, '10x')}
        <Divider />
        {this.props.selectedFile.name ? (<div><Grid className={classes.detailsAlignment} container spacing={3} classes={{
                  "spacing-xs-3": classes.spacingxs
                }}>
    <Grid item spacing={6}><Typography color='textSecondary' variant='body2'>{DETAILS_TYPE}</Typography></Grid>
    <Grid item spacing={6}><Typography color='textPrimary' variant='body2'>{this.props.selectedFile.type ? this.props.selectedFile.type : this.props.selectedFile.extension}</Typography></Grid>
        </Grid>
        <Grid className={classes.detailsAlignment} container spacing={3} classes={{
                  "spacing-xs-3": classes.spacingxs
                }}>
    <Grid item spacing={6}><Typography color='textSecondary' variant='body2'>{DETAILS_SIZE}</Typography></Grid>
    <Grid item spacing={6}><Typography color='textPrimary' variant='body2'>{this._renderSize(this.props.selectedFile.size!, true)}</Typography></Grid>
        </Grid>
        <Grid className={classes.detailsAlignment} container spacing={3} classes={{
                  "spacing-xs-3": classes.spacingxs
                }}>
    <Grid item spacing={6}><Typography color='textSecondary' variant='body2'>{DETAILS_CHANGED}</Typography></Grid>
    <Grid item spacing={6}><Typography color='textPrimary' variant='body2'>{new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(new Date(this.props.selectedFile.atime))}</Typography></Grid>
        </Grid>
        <Grid className={classes.detailsAlignment} container spacing={3} classes={{
                  "spacing-xs-3": classes.spacingxs
                }}>
    <Grid item spacing={6}><Typography color='textSecondary' variant='body2'>{DETAILS_MADE}</Typography></Grid>
    <Grid item spacing={6}><Typography color='textPrimary' variant='body2'>{new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(new Date(this.props.selectedFile.mtime))}</Typography></Grid>
        </Grid>
        <Grid className={classes.detailsAlignment} container spacing={3} classes={{
                  "spacing-xs-3": classes.spacingxs
                }}>
    <Grid item spacing={6}><Typography color='textSecondary' variant='body2'>{DETAILS_SAVE}</Typography></Grid>
    <Grid item spacing={6}><Typography color='textPrimary' variant='body2'>{this._renderSavePlace()}</Typography></Grid>
        </Grid></div>) : <Typography color='textSecondary' align='center' variant='subtitle1'>Bitte eine Datei auswählen um Details anzuzeigen</Typography>}
        
      </Drawer>
        )
    }
}
export default withStyles(styles)(SidebarComponent);
