import useAuthenticateUser from "@/api-services/mutations/users/useAuthenticateUser";
import {
  loginFormDefaultValue,
  loginFormSchema,
  LoginFormSchema,
} from "@/schema/user/login/userLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useLogin() {
  const { authenticateUser, isUsingBeingAuthenticate } = useAuthenticateUser();
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
    await authenticateUser(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isUsingBeingAuthenticate,
  };
}
