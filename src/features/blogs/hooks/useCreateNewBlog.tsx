import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createBlogdefaultValues,
  CreateBlogFormSchema,
  createBlogSchema,
} from "./blog/newBlogSchema";
import useCreateBlog from "@/api-services/mutations/blog/useCreateBlog";
import { reverseTransformTags, transformTags } from "@/utils/transformTags";
import { useEffect } from "react";
import { useAppStore } from "@/store/store";
import useGetBlogsDetails from "@/api-services/queries/useGetBlogDetails";
import useUpdateBlog from "@/api-services/mutations/blog/useUpdateBlog";

export default function useCreateNewBlog(closeModal: () => void) {
  const { createNewBlog, isNewBlogBeingCreated } = useCreateBlog();
  const { blogId } = useAppStore((store) => store);
  const { setBlogId } = useAppStore((store) => store.actions);
  const { blogDetails } = useGetBlogsDetails(blogId);
  const { updateBlog, isBlogBeingUpdated } = useUpdateBlog();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBlogFormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(createBlogSchema),
    defaultValues: createBlogdefaultValues,
  });

  useEffect(() => {
    if (blogDetails) {
      reset({
        title: blogDetails.title,
        content: blogDetails.content,
        tags: reverseTransformTags(blogDetails.tags),
      });
    }
  }, [blogDetails, reset]);

  const onSubmit = async (data: CreateBlogFormSchema) => {
    const payload = { ...data, tags: transformTags(data?.tags) };
    if (blogId) {
      await updateBlog({ id: blogId, data: payload });
    } else {
      await createNewBlog(payload);
    }
    closeModal();
  };

  const handleCloseModal = () => {
    if (blogId) {
      setBlogId("");
      reset({
        title: "",
        content: "",
        tags: [],
      });
    }
    closeModal();
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    isNewBlogBeingCreated,
    blogId,
    handleCloseModal,
    isBlogBeingUpdated,
  };
}
