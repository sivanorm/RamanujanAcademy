import ApiResponse, { ResponseType } from "../Common/Result";
import { FireHttp } from "./DBFireController";

export interface Images {
  id: string;
  img_name: string;
  base64Str?: string;
  img_url: string;
}

export async function GetAllImages(): Promise<ApiResponse<Images[]>> {
  try {
    const querySnapshot = await FireHttp.Get("images");
    const imagesData: Images[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Images),
    }));

    const apiResponse: ApiResponse<Images[]> = {
      responseType: ResponseType.Success,
      responseDescription: "Data retrieved successfully",
      responseData: imagesData,
    };

    return apiResponse;
  } catch (error: any) {
    const errorResponse: ApiResponse<Images[]> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message,
      responseData: [],
    };

    return errorResponse;
  }
}

export async function AddNewImage(image: Images): Promise<ApiResponse<Images>> {
  try {
    const response = await FireHttp.Post("images", image);
    image.id = response.id;
    const apiResponse: ApiResponse<Images> = {
      responseType: ResponseType.Success,
      responseDescription: "Data retrieved successfully",
      responseData: image,
    };

    return apiResponse;
  } catch (error: any) {
    image.id = "0";
    const errorResponse: ApiResponse<Images> = {
      responseType: ResponseType.Error,
      responseDescription: error?.message,
      responseData: image,
    };

    return errorResponse;
  }
}

export async function UpdateImage(image: Images): Promise<ApiResponse<Images>> {
  await FireHttp.Put("images", image)
    .then((response) => {
      const apiResponse: ApiResponse<Images> = {
        responseType: ResponseType.Success,
        responseDescription: "Data retrieved successfully",
        responseData: image,
      };
      return apiResponse;
    })
    .catch((error) => {
      image.id = "0";
      const errorResponse: ApiResponse<Images> = {
        responseType: ResponseType.Error,
        responseDescription: error.message,
        responseData: image,
      };
      return errorResponse;
    });
}
