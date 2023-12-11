import { User } from "firebase/auth";
import { GetUser } from "../Users/UserServices";
import { UserDetailsDTO } from "../../DTOs/Users/UserDetailsDTO";

export interface AppUserConfig {
  userId: string;
  firstName?: string;
  lastName?: string;
  gender?: string | unknown;
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

export function GetAppUserConfig(user: User): AppUserConfig {
  const appUserConfigData: AppUserConfig = {
    userId: user.uid,
    email: user.email || "",
    profileImageUrl: user.photoURL || "",
    token: user.refreshToken,
  };
  GetUser<UserDetailsDTO>(user.uid)
    .then((data) => {
      const userData = data?.responseData[0];
      appUserConfigData.address1 = userData.address1;
      appUserConfigData.address2 = userData.address2;
      appUserConfigData.city = userData.city;
      appUserConfigData.country = userData.country;
      appUserConfigData.dob = new Date(userData.dob);
      appUserConfigData.firstName = userData.firstName;
      appUserConfigData.gender = userData.gender;
      appUserConfigData.lastName = userData.lastName;
      appUserConfigData.loginAtempts = userData.loginAtempts;
    })
    .catch((error) => {
      console.log(error);
    });
  return appUserConfigData;
}
