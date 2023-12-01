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
import { signInUser } from "../../Authentications/firebase/firebase";
import "./login.css";

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

export default function LogIn() {
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
    try {
      // Now you can use 'username' and 'password' in your signInUser function
      debugger;
      const userCredential = await signInUser(username, password);
      if (userCredential) {
        navigate("/");
      } else alert("Invalid Credentials");
    } catch (error: any) {
      alert("User Sign In Failed due to Error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/signup");
    navigate("/signup");
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
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Sign Up
          </Button>
          <Button onClick={handleSubmit}>LogIn</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
