import {
  IInputFields,
  userSignupFormFieldValues,
} from "@/types/users/user-consts.types";

export const inputFields: IInputFields<userSignupFormFieldValues>[] = [
  { label: "Firstname", name: "firstName", type: "text" },
  { label: "Lastname", name: "lastName", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
  { label: "Confirm Password", name: "confirmPassword", type: "password" },
  { label: "Phone Number", name: "phoneNumber", type: "text" },
  { label: "Address", name: "address", type: "text" },
];
