import useSignupNewUser from "@/api-services/mutations/users/useSignupUser";
import {
  newUserSchema,
  NewUserSchema,
  newUserSchemaDefaultValue,
} from "@/schema/user/signup/userSignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useSignup() {
  const router = useRouter();
  const { signupNewUser, isNewUserBeingCreated } = useSignupNewUser();
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
    await signupNewUser(data);
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    isNewUserBeingCreated,
    handleBack,
  };
}
