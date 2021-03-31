import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Button,
  DialogActions,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import React from "react";
import useStyles from "./ModalPopStyles";

const ModalPop = ({ isOpen, handleClose, width, title, content }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={width}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      disableBackdropClick
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>
        {title}
        <IconButton color="secondary" size="small" onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-content" component="div">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          color="primary"
          autoFocus
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPop;
