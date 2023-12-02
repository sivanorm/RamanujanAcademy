import ApiResponse, { ResponseType } from "../Common/Result";
import { FireHttp } from "../Common/FireServices/DBFireController";
import {
  DeleteFromFirebase,
  GetFromFirebase,
  SaveToFireBase,
  UpdateFireBaseDoc,
} from "../Common/FireServices/FireServices";

export interface Images {
  id?: string;
  img_name: string;
  base64Str: string;
  img_url: string;
}
export async function GetAllImages(): Promise<ApiResponse<Images[]>> {
  return GetFromFirebase("images");
}

export async function AddNewImage(image: Images): Promise<ApiResponse<string>> {
  return SaveToFireBase<Images>("images", image);
}

export async function UpdateImage(image: Images): Promise<ApiResponse<string>> {
  return UpdateFireBaseDoc<Images>("images", image);
}

export async function DeleteImage(docId: string): Promise<ApiResponse<string>> {
  return DeleteFromFirebase("images", docId);
}
