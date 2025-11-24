import { PUBLIC_ROUTE } from "@/enum/routes/authRoute";
import { NewUserSchema } from "@/schema/user/signup/userSignupSchema";
import useAxiosInstance from "@/services/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useSignupNewUser() {
  const router = useRouter();
  const { axiosInstance } = useAxiosInstance();

  const { mutateAsync, isPending } = useMutation<
    unknown,
    unknown,
    NewUserSchema,
    unknown
  >({
    mutationFn: (payload: NewUserSchema) =>
      axiosInstance.post(`auth/signUp`, payload),
    onSuccess: (res) => {
      if (res) {
        //@ts-expect-error message type is unknown
        toast.success(res?.message);
        router.push(PUBLIC_ROUTE.LOGIN);
      }
    },
    onError: (err) => {
      //@ts-expect-error message type is unknown
      toast.error(err?.response?.data?.message);
    },
  });
  return {
    signupNewUser: mutateAsync,
    isNewUserBeingCreated: isPending,
  };
}
