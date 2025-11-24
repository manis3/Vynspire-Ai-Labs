import {
  loginFormDefaultValue,
  loginFormSchema,
  LoginFormSchema,
} from "@/schema/user/login/userLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValue,
  });

  const onSubmit = async (data: LoginFormSchema) => {
    console.log(data, "data from login user");
    // await loginUser(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
