import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { CreateUser, db } from "../../Authentications/firebase/firebase";
import { UserDetailsDTO } from "../../DTOs/Users/UserDetailsDTO";
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
    const authResponse = await CreateUser(user.email, user.password);
    user.userId = authResponse?.user?.uid || "";
    await addDoc(collection(db, collectionName), user);
    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Saved successfully",
      responseData: user.userId,
    };

    return apiResponse;
  } catch (error) {
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
    await updateDoc(doc(db, collectionName, user.docId), user);

    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Updated successfully",
      responseData: user.userId,
    };

    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<string> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "User details not updated",
      responseData: "0",
    };

    return errorResponse;
  }
};

export const DeleteUser = async (
  userId: string
): Promise<ApiResponse<number>> => {
  try {
    await deleteDoc(doc(db, collectionName, userId));
    const apiResponse: ApiResponse<number> = {
      responseType: ResponseType.Success,
      responseDescription: "Deleted successfully",
      responseData: 1,
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<number> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "User Not Deleted",
      responseData: 0,
    };
    return errorResponse;
  }
};
