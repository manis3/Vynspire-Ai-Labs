import {
  newUserSchema,
  NewUserSchema,
  newUserSchemaDefaultValue,
} from "@/schema/user/signup/userSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useSignup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewUserSchema>({
    mode: "onSubmit",
    resolver: zodResolver(newUserSchema),
    defaultValues: newUserSchemaDefaultValue,
  });

  const onSubmit = async (data: NewUserSchema) => {
    console.log(data, "create user ko data");
  };

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
  };
}
