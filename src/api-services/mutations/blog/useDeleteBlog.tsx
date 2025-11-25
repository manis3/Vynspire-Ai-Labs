import { USE_GET_BLOGS } from "@/api-services/queries/useGetBlogs";
import useAxiosInstance from "@/services/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
type IID = string | number;

export default function useDeleteBlog() {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxiosInstance();

  const { mutateAsync, isPending } = useMutation<
    unknown,
    unknown,
    IID,
    unknown
  >({
    mutationFn: (id: IID) => axiosInstance.delete(`blog/${id}`),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_BLOGS] });
      toast.success(res?.message || "Blog deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete blog");
    },
  });

  return {
    deleteBlog: mutateAsync,
    isDeletingBlog: isPending,
  };
}
