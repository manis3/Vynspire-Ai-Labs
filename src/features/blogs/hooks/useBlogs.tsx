import useDeleteBlog from "@/api-services/mutations/blog/useDeleteBlog";
import useGetBlogs from "@/api-services/queries/useGetBlogs";
import { tagsOptions } from "@/consts/tagsConsts";
import useDialog from "@/hooks/useDialog";
import useSearchBar from "@/hooks/useSearchBar";
import { useAppStore } from "@/store/store";
import { getFilteredBlogData } from "@/utils/searchBlog";
import { useMemo } from "react";

export default function useBlogs() {
  const { searchTerm, handleSearch } = useSearchBar();
  const { isOpen, openModal, closeModal } = useDialog();
  const { blogsLists, isBlogsBeingFetch } = useGetBlogs();
  const { setBlogId, setSelectedFilter } = useAppStore(
    (store) => store.actions,
  );
  const { selectedFilter } = useAppStore((store) => store);
  const { deleteBlog, isDeletingBlog } = useDeleteBlog();

  const handleTagSelect = (value: string) => {
    setSelectedFilter(value);
  };

  const filteredBlogs = useMemo(() => {
    return getFilteredBlogData(blogsLists, searchTerm, selectedFilter);
  }, [blogsLists, searchTerm, selectedFilter]);

  const handleEdit = (id: string | number) => {
    setBlogId(id);
    openModal();
  };

  const handleDelete = async (id: string | number) => {
    await deleteBlog(id);
  };

  return {
    isOpen,
    closeModal,
    openModal,
    searchTerm,
    handleSearch,
    handleTagSelect,
    selectedTag: selectedFilter,
    tagsOptions,
    filteredBlogs,
    isBlogsBeingFetch,
    handleEdit,
    handleDelete,
    isDeletingBlog,
  };
}
