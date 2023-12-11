import { collection, getDocs, query, where } from "firebase/firestore";
import ApiResponse, { ResponseType } from "../Result";
import { FireHttp } from "./DBFireController";

export async function GetFromFirebase<T>(
  collectionName: string
): Promise<ApiResponse<T[]>> {
  try {
    const querySnapshot = await FireHttp.Get(collectionName);
    const imagesData: T[] = querySnapshot.docs.map((doc: any) => ({
      docId: doc.id,
      ...(doc.data() as T),
    }));

    const apiResponse: ApiResponse<T[]> = {
      responseType: ResponseType.Success,
      responseDescription: "Data retrieved successfully",
      responseData: imagesData,
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
}
export async function SaveToFireBase<T>(
  collectionName: string,
  data: T
): Promise<ApiResponse<string>> {
  try {
    const response = await FireHttp.Post(collectionName, data);
    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Saved successfully",
      responseData: response.id,
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<string> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message,
      responseData: "0",
    };
    return errorResponse;
  }
}

export async function UpdateFireBaseDoc<T>(
  collectionName: string,
  data: T
): Promise<ApiResponse<string>> {
  try {
    await FireHttp.Put(collectionName, data);
    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Updated successfully",
      responseData: "",
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<string> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message,
      responseData: "",
    };
    return errorResponse;
  }
}

export async function DeleteFromFirebase(
  collectionName: string,
  docId: string
): Promise<ApiResponse<string>> {
  try {
    await FireHttp.Delete(collectionName, docId);
    const apiResponse: ApiResponse<string> = {
      responseType: ResponseType.Success,
      responseDescription: "Deleted successfully",
      responseData: docId,
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<string> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message,
      responseData: "",
    };
    return errorResponse;
  }
}
