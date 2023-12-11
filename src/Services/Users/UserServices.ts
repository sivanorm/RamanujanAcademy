import { collection, getDocs, query, where } from "firebase/firestore";
import { CreateUser, db } from "../../Authentications/firebase/firebase";
import { UserDetailsDTO } from "../../DTOs/Users/UserDetailsDTO";
import { FireHttp } from "../Common/FireServices/DBFireController";
import ApiResponse, { ResponseType } from "../Common/Result";

const collectionName = "app_users";

export const GetUser = async <T>(uid?: string): Promise<ApiResponse<T[]>> => {
  try {
    debugger;
    const strQuery = uid
      ? query(collection(db, collectionName), where("userId", "==", uid))
      : query(collection(db, collectionName));
    const querySnapshot = await getDocs(strQuery);
    const documents: T[] = querySnapshot.docs.map((doc: any) => ({
      ...(doc.data() as T),
      docId: doc.id,
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
    // Create user and wait for the response
    const authResponse = await CreateUser(user.email, user.password);

    // Set the userId in the user object
    user.userId = authResponse?.user?.uid || "";

    // Save user details to Firestore
    await FireHttp.Post(collectionName, user);

    // If successful, construct the success response
    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Saved successfully",
      responseData: user.userId,
    };

    return apiResponse;
  } catch (error) {
    // If an error occurs during user creation or Firestore operation
    const errorResponse: ApiResponse<string> = {
      responseType: ResponseType.Error,
      responseDescription: error?.toString() || "User Details Not Saved",
      responseData: "0",
    };

    return errorResponse;
  }
};

export const UpdateUser = async (
  user: UserDetailsDTO
): Promise<ApiResponse<string>> => {
  try {
    debugger;
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
