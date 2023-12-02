export default interface ApiResponse<T> {
  responseType: ResponseType;
  responseDescription: string;
  responseData: T;
}

export enum ResponseType {
  Success = "SUCCESS",
  Warning = "WARNING",
  Error = "ERROR",
}

export interface AppUser {
  userFirstName: string;
  userLastName: string;
  email: string;
  contact: string[];
  profileImage?: string;
  userId?: string;
  userRoles?: string[];
  dob: string;
  gender: string;
  authToken?: string;
  docId?: string;
}
