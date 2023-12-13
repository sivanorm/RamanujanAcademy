export class UserDetailsDTO {
  [key: string]: any;
  docId: string = "";
  userId: string = "";
  firstName: string = "";
  lastName: string = "";
  gender: string | null = null;
  dob: string = "";
  email: string = "";
  password: string = "";
  phoneNumber: string | null = null;
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
  loginAttempts: number = 0;

  constructor(userDetails: Partial<UserDetailsDTO> = {}) {
    Object.assign(this, userDetails);

    if (!this.dob) {
      this.dob = "";
    }

    if (this.dob === "") {
      const currentDate = new Date();
      this.dob = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
    }
  }
}
