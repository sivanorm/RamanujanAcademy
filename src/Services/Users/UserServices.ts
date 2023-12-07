import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { CreateUser, db } from "../../Authentications/firebase/firebase";
import { UserDetailsDTO } from "../../DTOs/Users/UserDetailsDTO";
import ApiResponse, { ResponseType } from "../Common/Result";
import { FireHttp } from "../Common/FireServices/DBFireController";

const collectionName = "app_users";

export const GetUser = async <T>(uid?: string): Promise<ApiResponse<T[]>> => {
  try {
    const strQuery = uid
      ? query(collection(db, collectionName), where("userId", "==", uid))
      : query(collection(db, collectionName));
    const querySnapshot = await getDocs(strQuery);
    const documents: T[] = querySnapshot.docs.map((doc: any) => ({
      docId: doc.id,
      ...(doc.data() as T),
    }));
    const apiResponse: ApiResponse<T[]> = {
      responseType: ResponseType.Success,
      responseDescription: "Data retrieved successfully",
      responseData: documents,
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<T[]> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message,
      responseData: [],
    };
    return errorResponse;
  }
};

export const SaveUser = async (
  user: UserDetailsDTO
): Promise<ApiResponse<string>> => {
  try {
    debugger;
    // Create user and wait for the response
    const response = await CreateUser(user.email, user.password);
    // Save user details to Firestore
    await FireHttp.Post(collectionName, user);
    // If successful, construct the success response
    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Saved successfully",
      responseData: response?.user.uid || "",
    };
    return apiResponse;
  } catch (error: any) {
    // If an error occurs during user creation or Firestore operation
    const errorResponse: ApiResponse<string> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "User Details Not Saved",
      responseData: "0",
    };
    return errorResponse;
  }
};

export const UpdateUser = async (
  user: UserDetailsDTO | any
): Promise<ApiResponse<string>> => {
  try {
    // Update user details to Firestore
    await FireHttp.Put(collectionName, user);
    // If successful, construct the success response
    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Updated successfully",
      responseData: user.userId,
    };
    return apiResponse;
  } catch (error: any) {
    // If an error occurs during user creation or Firestore operation
    const errorResponse: ApiResponse<string> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "User Details Not Updated",
      responseData: "0",
    };
    return errorResponse;
  }
};
