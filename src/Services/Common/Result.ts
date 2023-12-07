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
  userId: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: Date;
  email?: string;
  phoneNumber?: number;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  profileImageUrl?: string;
  isActive?: boolean;
  userRoles?: string[];
  isLocked?: boolean;
  loginAtempts?: number;
  token?: string;
}
