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
import { CreateUser } from "../../Authentications/firebase/firebase";
import {
  GetAllUsers,
  UpdateUserDetails,
} from "../../Services/Auth/UserServices";
import { AppUser } from "../../Services/Common/Result";
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
  const [UserDocId, setUserDocId] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState({
    countryCode: "+91",
    number: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDob(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMobileCountryCodeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setMobile({
      ...mobile,
      countryCode: event.target.value as string,
    });
  };

  const handleMobileNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMobile({
      ...mobile,
      number: event.target.value,
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async () => {
    debugger;
    try {
      await CreateUser(email, password).then((response) => {
        if (response?.user.uid) {
          navigate("/");
        }
      });
    } catch (error: any) {
      alert("User Registration Failed due to Error");
    }
  };
  const handleSave = () => {
    const userDetails: AppUser = {
      userId: UserDocId,
      docId: UserDocId,
      userFirstName: firstName,
      userLastName: lastName,
      dob: dob,
      email: email,
      gender: gender,
      contact: [mobile.countryCode + " " + mobile.number],
    };
    const response = UpdateUserDetails(userDetails);
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

  useEffect(() => {
    if (currentUser) {
      setIsLogin(true);
      GetAllUsers()
        .then((data) => {
          const userData = data.responseData[0];
          console.log(userData);
          console.log(userData.docId);
          setUserDocId(userData.docId ? userData.docId : "");
          setFirstName(userData.userFirstName);
          setLastName(userData.userLastName);
          setDob(userData.dob);
          setGender(userData.gender);
          setEmail(userData.email);
          setMobile({
            countryCode: userData.contact[0].split(" ")[0],
            number: userData.contact[0].split(" ")[1],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

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
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
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
                  value={dob}
                  onChange={handleDobChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  select
                  label="Gender"
                  variant="outlined"
                  value={gender}
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
                  value={mobile.countryCode}
                  onChange={handleMobileCountryCodeChange}
                >
                  <MenuItem value="+1">+1</MenuItem>
                  <MenuItem value="+91">India</MenuItem>
                  <MenuItem value="+21">+21</MenuItem>
                  <MenuItem value="+92">Japan</MenuItem>
                  <MenuItem value="+31">India</MenuItem>
                  {/* Add more country codes as needed */}
                </TextField>
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  value={mobile.number}
                  onChange={handleMobileNumberChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <TextField
                  id="outlined-basic"
                  placeholder="Email"
                  value={email}
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
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
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
            onClick={isLogin ? handleSave : handleSubmit}
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
