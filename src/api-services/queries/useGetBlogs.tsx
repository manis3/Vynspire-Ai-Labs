import useAxiosInstance from "@/services/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const USE_GET_BLOGS = "use-get-blogs";
export default function useGetBlogs() {
  const { axiosInstance } = useAxiosInstance();
  const { data, isLoading, isError } = useQuery({
    queryKey: [USE_GET_BLOGS],
    queryFn: () => {
      return axiosInstance.get("blog");
    },
  });
  return {
    blogsLists: data?.data?.data,
    isBlogsBeingFetch: isLoading,
    isErrorFetchingBlogs: isError,
  };
}
