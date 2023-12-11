export class UserDetailsDTO {
  docId: string = "";
  userId: string = "";
  firstName: string = "";
  lastName: string = "";
  gender: string | null = "";
  dob: string = `${new Date().getDate()}-${
    new Date().getMonth() - 1
  }-${new Date().getFullYear()}`;
  email: string = "";
  password: string = "";
  phoneNumber: string | null = "";
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
