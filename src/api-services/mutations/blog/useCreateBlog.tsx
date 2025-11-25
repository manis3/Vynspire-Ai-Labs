import { USE_GET_BLOGS } from "@/api-services/queries/useGetBlogs";
import useAxiosInstance from "@/services/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ICreateBlogProps {
  title: string;
  content: string;
  tags: string[];
}

export default function useCreateBlog() {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxiosInstance();

  const { mutateAsync, isPending } = useMutation<
    unknown,
    unknown,
    ICreateBlogProps,
    unknown
  >({
    mutationFn: (payload: ICreateBlogProps) =>
      axiosInstance.post(`blog`, payload),
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries({ queryKey: [USE_GET_BLOGS] });
        //@ts-expect-error message type is unknown
        toast.success(res?.data?.message);
      }
    },
    onError: (err) => {
      //@ts-expect-error message type is unknown
      toast.error(err?.response?.data?.message);
    },
  });
  return {
    createNewBlog: mutateAsync,
    isNewBlogBeingCreated: isPending,
  };
}
