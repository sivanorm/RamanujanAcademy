import "./login.css";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Avatar, TextField } from "@mui/material";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Avatar onClick={handleClickOpen}>K</Avatar>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        className="login_popup"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Login
        </DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-md-12">
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
