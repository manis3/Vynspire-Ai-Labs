"use client";
import BlogCard from "@/components/ui/blogCard/blogCard";
import { ButtonWithLoader } from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown/dropdown";
import useBlogs from "./hooks/useBlogs";
import { SearchBar } from "@/components/ui/searchBar/searchBar";
import CreateBlogModal from "@/components/composition-ui/createBlog/createBlogModal";

export default function Blogs() {
  const {
    isOpen,
    openModal,
    closeModal,
    searchTerm,
    handleSearch,
    selectedTag,
    handleTagSelect,
    tagsOptions,
    filteredBlogs,
  } = useBlogs();
  return (
    <div>
      <h1 className="text-2xl font-bold font-sourceSansPro">Blogs</h1>
      <div className="flex justify-between mt-8 px-8">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="flex gap-6">
          <Dropdown
            options={tagsOptions}
            selectedFilter={selectedTag}
            onSelect={handleTagSelect}
          />
          <ButtonWithLoader buttonTextClassName="text-text" onClick={openModal}>
            Add Blog
          </ButtonWithLoader>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-8 overflow-auto max-h-[calc(100vh-5rem)] scrollbar-none">
        {filteredBlogs?.map(({ title, content, tags }, index) => (
          <BlogCard key={index} title={title} content={content} tags={tags} />
        ))}
      </div>
      <CreateBlogModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
