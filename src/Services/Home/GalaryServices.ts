import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Authentications/firebase/firebase";
import { ImageDTO } from "../../DTOs/Home/ImageDTO";
import ApiResponse, { ResponseType } from "../Common/Result";

const collectionName = "galley_images";

export const GetAllImages = async (
  galaryId: string,
  uploadedDate: Date
): Promise<ApiResponse<ImageDTO[]>> => {
  try {
    const strQuery = collection(
      db,
      collectionName,
      galaryId,
      uploadedDate.toDateString().split(" ").slice(1, 4).join("_")
    );
    const querySnapshot = await getDocs(strQuery);
    const images: ImageDTO[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as ImageDTO),
      docId: doc.id,
    }));
    const apiResponse: ApiResponse<ImageDTO[]> = {
      responseType: ResponseType.Success,
      responseDescription: "Data retrieved successfully",
      responseData: images,
    };

    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<ImageDTO[]> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "Error retrieving data",
      responseData: [],
    };
    return errorResponse;
  }
};

export const SaveImageToUserGallery = async (
  userId: string,
  image: ImageDTO
): Promise<ApiResponse<number>> => {
  try {
    const path =
      collectionName +
      "/" +
      userId +
      "/" +
      new Date().toDateString().split(" ").slice(1, 4).join("_");

    await addDoc(collection(db, path), { ...image });
    const apiResponse: ApiResponse<number> = {
      responseType: ResponseType.Success,
      responseDescription: "Image saved successfully",
      responseData: 1,
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<number> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "Error saving image",
      responseData: 0,
    };
    return errorResponse;
  }
};
export const UpdateGalleryImage = async (
  userId: string,
  image: ImageDTO
): Promise<ApiResponse<number>> => {
  try {
    const path =
      collectionName +
      "/" +
      userId +
      "/" +
      new Date().toDateString().split(" ").slice(1, 4).join("_");
    await updateDoc(doc(db, path, image.docId), { ...image });
    const apiResponse: ApiResponse<number> = {
      responseType: ResponseType.Success,
      responseDescription: "Image Updated successfully",
      responseData: 1,
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<number> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "Error Updating image",
      responseData: 0,
    };
    return errorResponse;
  }
};
export const DeleteGalleryImage = async (
  userId: string,
  docId: string
): Promise<ApiResponse<number>> => {
  try {
    const path =
      collectionName +
      "/" +
      userId +
      "/" +
      new Date().toDateString().split(" ").slice(1, 4).join("_");
    await deleteDoc(doc(db, path, docId));
    const apiResponse: ApiResponse<number> = {
      responseType: ResponseType.Success,
      responseDescription: "Image Deleted successfully",
      responseData: 1,
    };
    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<number> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message || "Error in  Deleting image",
      responseData: 0,
    };
    return errorResponse;
  }
};
