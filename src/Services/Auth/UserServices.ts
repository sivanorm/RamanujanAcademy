import { User, updateEmail } from "firebase/auth";
import {
  DeleteFromFirebase,
  GetFromFirebase,
  SaveToFireBase,
  UpdateFireBaseDoc,
} from "../Common/FireServices/FireServices";
import ApiResponse, { AppUser } from "../Common/Result";
import { useContext } from "react";
import { FireBaseAuthContext } from "../../Authentications/firebase/Context/firebase-auth-context";

const { currentUser } = useContext(FireBaseAuthContext);
export async function GetAllUsers(): Promise<ApiResponse<AppUser[]>> {
  debugger;
  return GetFromFirebase("users");
}
export async function GetUserDetailsById(
  userId: string
): Promise<ApiResponse<AppUser[]>> {
  return GetFromFirebase("users/" + userId);
}
export async function SaveUserDetails(
  userDetails: AppUser
): Promise<ApiResponse<string>> {
  return SaveToFireBase<AppUser>("users", userDetails);
}

export async function UpdateUserDetails(
  userDetails: AppUser
): Promise<ApiResponse<string>> {
  // const res=updateEmail(currentUser, userDetails.email);
  return UpdateFireBaseDoc<AppUser>("users", userDetails);
}

export async function DeleteUserDetails(
  userId: string
): Promise<ApiResponse<string>> {
  return DeleteFromFirebase("users", userId);
}
