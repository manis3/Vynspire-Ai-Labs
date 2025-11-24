export type IInputFields<FormValues> = {
  label: string;
  name: keyof FormValues;
  type: string;
  fields?: string;
};

export type userSignupFormFieldValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
};
