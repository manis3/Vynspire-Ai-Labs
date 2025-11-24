import z from "zod";

const newUserSchema = z
  .object({
    firstName: z.string().min(1, { message: "Invalid Firstname" }),
    lastName: z.string().min(1, { message: "Invalid Lastname" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be 10 digits" })
      .max(10, { message: "Phone number must not exceed 10 digits" })
      .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      }),
    address: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type NewUserSchema = z.infer<typeof newUserSchema>;

const newUserSchemaDefaultValue: NewUserSchema = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",
};

export { newUserSchema, newUserSchemaDefaultValue, type NewUserSchema };
