import useGetBlogs from "@/api-services/queries/useGetBlogs";
import { tagsOptions } from "@/consts/tagsConsts";
import useDialog from "@/hooks/useDialog";
import useSearchBar from "@/hooks/useSearchBar";
import { getFilteredBlogData } from "@/utils/searchBlog";
import { useMemo, useState } from "react";

export default function useBlogs() {
  const [selectedTag, setSelectedTag] = useState<string>(tagsOptions[0]);
  const { searchTerm, handleSearch } = useSearchBar();
  const { isOpen, openModal, closeModal } = useDialog();
  const { blogsLists, isBlogsBeingFetch } = useGetBlogs();

  const handleTagSelect = (value: string) => {
    setSelectedTag(value);
  };

  const filteredBlogs = useMemo(() => {
    return getFilteredBlogData(blogsLists, searchTerm, selectedTag);
  }, [blogsLists, searchTerm, selectedTag]);

  return {
    isOpen,
    closeModal,
    openModal,
    searchTerm,
    handleSearch,
    handleTagSelect,
    selectedTag,
    tagsOptions,
    filteredBlogs,
    isBlogsBeingFetch,
  };
}
