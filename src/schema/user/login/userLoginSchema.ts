import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => email.includes("@"), {
      message: "Email must contain or ends with @any.com",
    }),
  password: z.string().min(6),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const loginFormDefaultValue: LoginFormSchema = {
  email: "",
  password: "",
};

export { loginFormDefaultValue, loginFormSchema, type LoginFormSchema };
