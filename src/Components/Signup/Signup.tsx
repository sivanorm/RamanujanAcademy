import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import React, { Fragment, useState } from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../Authentications/firebase/firebase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Signup.css";

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

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    debugger;
    try {
      await CreateUser(username, password).then((response) => {
        response?.user.uid && navigate("/");
      });
    } catch (error: any) {
      alert("User Registration  Failed due to Error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        className="login_popup"
      >
        <i className="ac_circle">
          <AccountCircleIcon />
        </i>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Sign Up
        </DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-md-12">
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  variant="outlined"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center">
          <Button autoFocus onClick={handleClose} className="cancle mb-4">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="sign_up mb-4">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
