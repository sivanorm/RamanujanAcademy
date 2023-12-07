export class UserDetailsDTO {
  docId?: string;
  userId?: string;
  firstName: string = "";
  lastName: string = "";
  gender: string | unknown = "";
  dob: Date = new Date();
  email: string = "";
  password: string = "";
  phoneNumber: string | unknown = "";
  address1: string = "";
  address2: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  postalCode: string = "";
  profileImageUrl: string = "";
  isActive: boolean = true;
  userRoles: string[] = ["student"];
  isLocked: boolean = false;
  loginAtempts: number = 0;
}
