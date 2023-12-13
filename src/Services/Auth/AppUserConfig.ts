import { User } from "firebase/auth";
import { GetUser } from "../Users/UserServices";
import { UserDetailsDTO } from "../../DTOs/Users/UserDetailsDTO";

export class AppUserConfig {
  userId: string = "";
  firstName: string = "";
  lastName: string = "";
  gender: string | unknown = "";
  dob: string = "";
  email: string = "";
  phoneNumber: number = 0;
  address1: string = "";
  address2: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  postalCode: string = "";
  profileImageUrl: string = "";
  isActive: boolean = false;
  userRoles: string[] = [];
  isLocked: boolean = false;
  loginAtempts: number = 0;
  token: string = "";
}

export async function GetAppUserConfig(user: User): Promise<AppUserConfig> {
  try {
    debugger;
    const appUserConfigData: AppUserConfig = new AppUserConfig();
    const data = await GetUser<UserDetailsDTO>(user.uid);
    const userData = data?.responseData[0];
    if (userData) {
      appUserConfigData.userId = userData.userId || "";
      appUserConfigData.address1 = userData.address1 || "";
      appUserConfigData.address2 = userData.address2 || "";
      appUserConfigData.city = userData.city || "";
      appUserConfigData.country = userData.country || "";
      appUserConfigData.dob = userData.dob || "";
      appUserConfigData.firstName = userData.firstName || "";
      appUserConfigData.gender = userData.gender || "";
      appUserConfigData.lastName = userData.lastName || "";
      appUserConfigData.loginAtempts = userData.loginAtempts || 0;
    }
    return appUserConfigData;
  } catch (error) {
    console.log(error);
    return new AppUserConfig();
  }
}
