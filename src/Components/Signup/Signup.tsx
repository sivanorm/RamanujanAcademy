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
  const navigate = useNavigate();
  const { currentUser } = useContext(FireBaseAuthContext);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const [userData, setUserData] = useState<UserDetailsDTO>(
    new UserDetailsDTO()
  );

  // Check if the current user exists
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      setIsLogin(true);
      GetUser<UserDetailsDTO>(currentUser.uid).then((user) => {
        console.log(user.responseData[0]);
        setUserData(user.responseData[0]);
      });
    } else {
      setIsLogin(false);
    }
  }, [currentUser]);

  // Handle first name change
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserData({ ...userData, firstName: event.target.value });
  };

  // Handle last name change
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, lastName: event.target.value });
  };

  // Handle gender change
  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const gender = event.target.value ? event.target.value.toString() : "";
    setUserData({ ...userData, gender: gender });
  };

  // Handle date of birth change
  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, dob: event.target.value });
  };

  // Handle email change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: event.target.value });
  };

  // Handle mobile country code change
  const handleMobileCountryCodeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    console.log(event.target.value);
  };

  // Handle mobile number change
  const handleMobileNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserData({ ...userData, phoneNumber: event.target.value });
  };

  // Handle password change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: event.target.value });
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isValidUser()) {
      alert("Invalid User Data");
      return;
    }
    SaveUser(userData)
      .then((response) => {
        alert(response.responseDescription);
      })
      .catch((error) => {
        alert(error.responseDescription);
      });
  };

  // Handle user update
  const handleUpdateUser = () => {
    if (!isValidUser()) {
      alert("Invalid User Data");
      return;
    }
    const response = UpdateUser(userData);
    response
      .then((result) => {
        result.responseType === "SUCCESS" && alert(result.responseDescription);
      })
      .catch((error) => {
        alert(error.responseDescription);
      });
  };
  const isValidUser = (): boolean => {
    debugger;
    const isValid =
      userData.firstName !== "" &&
      userData.lastName !== "" &&
      userData.dob !== "" &&
      userData.password !== "" &&
      userData.gender !== "" &&
      userData.phoneNumber !== "" &&
      userData.email !== "";

    return isValid;
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    navigate("/");
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
