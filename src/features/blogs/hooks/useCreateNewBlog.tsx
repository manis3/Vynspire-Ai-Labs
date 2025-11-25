import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createBlogdefaultValues,
  CreateBlogFormSchema,
  createBlogSchema,
} from "./blog/newBlogSchema";
import useCreateBlog from "@/api-services/mutations/blog/useCreateBlog";
import { transformTags } from "@/utils/transformTags";

export default function useCreateNewBlog(closeModal: () => void) {
  const { createNewBlog, isNewBlogBeingCreated } = useCreateBlog();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogFormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(createBlogSchema),
    defaultValues: createBlogdefaultValues,
  });

  const onSubmit = async (data: CreateBlogFormSchema) => {
    const payload = { ...data, tags: transformTags(data?.tags) };
    await createNewBlog(payload);
    closeModal();
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    isNewBlogBeingCreated,
  };
}
