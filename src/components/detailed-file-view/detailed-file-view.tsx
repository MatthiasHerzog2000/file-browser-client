import React, { Component } from "react";
import IDetailedFileViewProps, { styles } from "./IDetailedFileViewProps";
import IDetailedFileViewState from "./IDetailedFileViewState";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  withStyles,
  DialogTitle,
  Button,
  DialogActions,
  Typography
} from "@material-ui/core";
import { IPreviewOptions } from "../../models/previewOptions";
import { PathService } from "../../utils/path-service";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class DetailedFileView extends Component<
  IDetailedFileViewProps,
  IDetailedFileViewState
> {
  constructor(props: IDetailedFileViewProps) {
    super(props);

    this.state = {
      base64: undefined,
      isPDF: false,
      numPages: 0,
      pageNumber: 1
    };
  }
  onDocumentLoadSuccess = (pdf: any) => {
    this.setState({ numPages: pdf.numPages });
  };
  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
  async componentWillMount() {
    console.log(
      !this.props.file.extension!.match(
        new RegExp("(.jpg|.jpeg|.png|.gif|.mp4|.avi|.mpg|.wmv)")
      )
    );
    if (
      !this.props.file.extension!.match(
        new RegExp("(.jpg|.jpeg|.png|.gif|.mp4|.avi|.mpg|.wmv)")
      )
    ) {
      const response: any = await PathService.copyPDF(
        this.props.file.path,
        this.props.file.name
      );
      if (response.success) {
        console.log(response);
        const base = await PathService.getPDF(response.outpath);
        this.setState({
          base64: "data:application/pdf;base64," + base,
          isPDF: true
        });
      } else {
        this.setState({ base64: undefined });
      }
    } else {
      const options: IPreviewOptions = {
        quality: 100,
        width: 720,
        height: 1024,
        isDetailed: true
      };
      const response: any = await PathService.generatePreview(
        this.props.file.path,
        options
      );
      if (response.success) {
        console.log(response);
        const base = await PathService.getPreview(response.outpath);
        this.setState({ base64: "data:;base64," + base });
      } else {
        this.setState({ base64: undefined });
      }
    }
  }
  render() {
    const { open, handleClose, classes } = this.props;
    const { pageNumber, numPages } = this.state;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        scroll="body"
        PaperProps={{
          classes: {
            root: this.state.isPDF
              ? classes.MuiPaperWhite
              : classes.MuiPaperTrans
          }
        }}
      >
        {this.state.isPDF ? (
          <DialogTitle classes={{ root: classes.DialogTitle }}>
            <Button
              disabled={this.state.pageNumber === 1 ? true : false}
              variant="contained"
              color="primary"
              onClick={this.goToPrevPage}
            >
              prev
            </Button>
            <Typography
              component="p"
              variant="h4"
              className={classes.SiteNumber}
            >
              Seite {this.state.pageNumber} von {this.state.numPages}
            </Typography>
            <Button
              disabled={
                this.state.numPages == this.state.pageNumber ? true : false
              }
              variant="contained"
              color="primary"
              onClick={this.goToNextPage}
            >
              next
            </Button>
          </DialogTitle>
        ) : null}

        <DialogContent className={classes.MuiDialogContent}>
          {this.state.base64 === undefined ? (
            <CircularProgress className={classes.progress} />
          ) : this.state.isPDF ? (
            <Document
              onLoadSuccess={this.onDocumentLoadSuccess}
              file={this.state.base64}
            >
              <Page pageNumber={pageNumber} width={700} />
            </Document>
          ) : (
            <img alt="" src={this.state.base64} />
          )}
        </DialogContent>
      </Dialog>
    );
  }
}
export default withStyles(styles)(DetailedFileView);
