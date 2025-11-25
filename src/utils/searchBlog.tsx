interface IBlogData {
  title: string;
  content: string;
  tags: string[];
}

export const getFilteredBlogData = (
  blogData: IBlogData[],
  searchTerm: string = "",
  selectedTag: string = "All",
): IBlogData[] => {
  const lowerSearch = searchTerm.toLowerCase();

  return blogData?.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(lowerSearch) ||
      blog.content.toLowerCase().includes(lowerSearch) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(lowerSearch));

    const matchesTag =
      selectedTag === "All" ||
      blog.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });
};
