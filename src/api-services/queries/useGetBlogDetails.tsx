import useAxiosInstance from "@/services/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const USE_GET_SINGLE_BLOG = "use-get-single-blog";
export default function useGetBlogsDetails(id: string | number) {
  const { axiosInstance } = useAxiosInstance();
  const { data, isLoading, isError } = useQuery({
    queryKey: [USE_GET_SINGLE_BLOG, id],
    queryFn: () => {
      return axiosInstance.get(`blog/${id}`);
    },
    enabled: !!id,
  });
  return {
    blogDetails: data?.data?.data,
    isBlogsDetailsBeingFetched: isLoading,
    isErrorFetchingBlogDetails: isError,
  };
}
