import {
  DeleteFromFirebase,
  GetFromFirebase,
  SaveToFireBase,
  UpdateFireBaseDoc,
} from "../Common/FireServices/FireServices";
import ApiResponse from "../Common/Result";

export interface Image {
  id?: string;
  img_name: string;
  base64Str: string;
  img_url: string;
  docId: string;
}
export async function GetAllImages(): Promise<ApiResponse<Image[]>> {
  return GetFromFirebase("images");
}

export async function AddNewImage(image: Image): Promise<ApiResponse<string>> {
  return SaveToFireBase<Image>("images", image);
}

export async function UpdateImage(image: Image): Promise<ApiResponse<string>> {
  return UpdateFireBaseDoc<Image>("images", image);
}

export async function DeleteImage(docId: string): Promise<ApiResponse<string>> {
  return DeleteFromFirebase("images", docId);
}
