import { NewUserSchema } from "@/schema/user/signup/userSignupSchema";
import useAxiosInstance from "@/services/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useSignupNewUser() {
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
