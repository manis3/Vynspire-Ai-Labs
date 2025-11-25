import { USE_GET_BLOGS } from "@/api-services/queries/useGetBlogs";
import useAxiosInstance from "@/services/useAxiosInstance";
import { useAppStore } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ICreateBlogProps {
  title: string;
  content: string;
  tags: string[];
}
interface IUpdateBlogPayload {
  id: string | number;
  data: ICreateBlogProps;
}

export default function useUpdateBlog() {
  const queryClient = useQueryClient();
  const { setBlogId } = useAppStore((store) => store.actions);
  const { axiosInstance } = useAxiosInstance();

  const { mutateAsync, isPending } = useMutation<any, any, IUpdateBlogPayload>({
    mutationFn: ({ id, data }: IUpdateBlogPayload) =>
      axiosInstance.put(`/blog/${id}`, data),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_BLOGS] });
      setBlogId("");
      toast.success(res?.message || "Blog updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    updateBlog: mutateAsync,
    isBlogBeingUpdated: isPending,
  };
}
