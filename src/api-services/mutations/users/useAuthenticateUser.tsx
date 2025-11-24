import { PROTECTED_ROUTE } from "@/enum/routes/protectedRoute";
import { LoginFormSchema } from "@/schema/user/login/userLoginSchema";
import useAxiosInstance from "@/services/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useAuthenticateUser() {
  const router = useRouter();
  const { axiosInstance } = useAxiosInstance();
  const { mutateAsync, isPending } = useMutation<
    unknown,
    unknown,
    LoginFormSchema,
    unknown
  >({
    mutationFn: (payload: LoginFormSchema) =>
      axiosInstance.post("auth/login", payload),
    onSuccess: (res) => {
      //@ts-expect-error response type in unknown
      const data = res?.data;
      if (!data?.accessToken) return toast.error(data?.message);

      Cookies.set("token", data?.accessToken, { secure: false, expires: 1 });
      toast.success(data?.message);

      router.push(`${PROTECTED_ROUTE.BLOGS_LIST}`);
    },
    onError: (err) => {
      //@ts-expect-error err message type is unknwon
      const errMessage = err?.message;
      toast.error(errMessage);
    },
  });
  return {
    authenticateUser: mutateAsync,
    isUsingBeingAuthenticate: isPending,
  };
}
