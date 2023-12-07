import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import React, { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { FireBaseAuthContext } from "../../Authentications/firebase/Context/firebase-auth-context";
import { UserDetailsDTO } from "../../DTOs/Users/UserDetailsDTO";
import {
  GetUser,
  SaveUser,
  UpdateUser,
} from "../../Services/Users/UserServices";
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

const SignUp = () => {
  var userDetails = new UserDetailsDTO();
  const navigate = useNavigate();
  const { currentUser } = useContext(FireBaseAuthContext);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState<UserDetailsDTO>(userDetails);

  //Check Current User Exists or not
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      setIsLogin(true);
      GetUser<UserDetailsDTO>(currentUser.uid).then((user) => {
        userDetails = user.responseData[0];
        setUserData(userDetails);
      });
    } else {
      setIsLogin(false);
    }
  }, [currentUser]);

  //Creating New User
  const handleSubmit = async () => {
    SaveUser(userDetails)
      .then((response) => {
        alert(response.responseDescription);
      })
      .catch((error) => {
        alert(error.responseDescription);
      });
  };

  //To update user data
  const handleUpdateUser = () => {
    const response = UpdateUser(userDetails);
    console.log(response);
    response
      .then((result) => {
        result.responseType == "SUCCESS" && alert(result.responseDescription);
      })
      .catch((error) => {
        alert(error.responseDescription);
      });
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    debugger;
    userDetails.firstName = event.target.value;
    setUserData(userDetails);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    userDetails.lastName = event.target.value;
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    userDetails.gender = event.target.value;
  };

  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    userDetails.dob = new Date(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    userDetails.email = event.target.value;
    setUserData(userDetails);
  };

  const handleMobileCountryCodeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    // userDetails.phoneNumber = event.target.value;
    console.log(event.target.value);
  };

  const handleMobileNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    userDetails.phoneNumber = event.target.value;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    userDetails.password = event.target.value;
    setUserData(userDetails);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    userDetails.password = event.target.value;
  };

  return (
    <>
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
          {isLogin ? "User Details" : " Sign Up"}
        </DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  value={userData.firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  value={userData.lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Date of Birth"
                  variant="outlined"
                  value={userData.dob}
                  onChange={handleDobChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  select
                  label="Gender"
                  variant="outlined"
                  value={userData.gender}
                  onChange={handleGenderChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  select
                  label="Country Code"
                  variant="outlined"
                  // value={userData.firstName}
                  onChange={handleMobileCountryCodeChange}
                >
                  <MenuItem value="+1">+1</MenuItem>
                  <MenuItem value="+91">India</MenuItem>
                  <MenuItem value="+21">+21</MenuItem>
                  <MenuItem value="+92">Japan</MenuItem>
                  <MenuItem value="+31">India</MenuItem>
                </TextField>
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  value={userData.phoneNumber}
                  onChange={handleMobileNumberChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <TextField
                  id="outlined-basic"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={userData.password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="d-flex justify-content-center">
          <Button autoFocus onClick={handleClose} className="cancle mb-4">
            Cancel
          </Button>
          <Button
            onClick={isLogin ? handleUpdateUser : handleSubmit}
            className={isLogin ? "update mb-4" : "sign_up mb-4"}
          >
            {isLogin ? "Save" : "Sign up"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
