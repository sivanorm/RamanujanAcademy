export class ApiResponse<T> {
  responseType: ResponseType = ResponseType.Default;
  responseDescription: string = "";
  responseData: T | undefined = getDefault<T>();
}

export function getDefault<T>(): T | undefined {
  return undefined;
}

export enum ResponseType {
  Success = "SUCCESS",
  Warning = "WARNING",
  Error = "ERROR",
  Default = "",
}

// export interface AppUser {
//   firstName?: string;
//   lastName?: string;
//   gender?: string;
//   dob?: Date;
//   email?: string;
//   phoneNumber?: number;
//   address1?: string;
//   address2?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   postalCode?: string;
//   profileImageUrl?: string;
//   isActive?: boolean;
//   userRoles?: string[];
//   isLocked?: boolean;
//   loginAtempts?: number;
//   token?: string;
// }
