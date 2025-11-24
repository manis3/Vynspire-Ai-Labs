import { tagsOptions } from "@/consts/tagsConsts";
import useDialog from "@/hooks/useDialog";
import useSearchBar from "@/hooks/useSearchBar";
import { getFilteredBlogData } from "@/utils/searchBlog";
import { useMemo, useState } from "react";

export default function useBlogs() {
  const blogData = [
    {
      title: "Blog 1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non tempore debitis facere facilis quia velit commodi, placeat eos laudantium suscipit.",
      tags: ["tag1", "tag2", "tag3"],
    },
    {
      title: "Blog 2",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      tags: ["news", "update"],
    },
    {
      title: "Blog 3",
      content:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      tags: ["tech", "javascript", "react"],
    },
    {
      title: "Blog 4",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.",
      tags: ["design", "ux"],
    },
    {
      title: "Blog 5",
      content:
        "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      tags: ["tips", "css"],
    },
    {
      title: "Blog 6",
      content:
        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.",
      tags: ["illustration", "art"],
    },
    {
      title: "Blog 7",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: ["food", "recipe"],
    },
    {
      title: "Blog 8",
      content:
        "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim.",
      tags: ["finance", "investing"],
    },
    {
      title: "Blog 9",
      content:
        "Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.",
      tags: ["marketing", "seo"],
    },
    {
      title: "Blog 10",
      content:
        "Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis.",
      tags: ["history", "literature"],
    },
    {
      title: "Blog 11",
      content:
        "Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.",
      tags: ["reading", "education"],
    },
    {
      title: "Blog 12",
      content:
        "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.",
      tags: ["process", "learning"],
    },
    {
      title: "Blog 13",
      content:
        "Mirum est notare quam littera gothica, quam nunc putamus parum claram.",
      tags: ["fonts", "design"],
    },
    {
      title: "Blog 14",
      content:
        "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
      tags: ["css", "web"],
    },
    {
      title: "Blog 15",
      content:
        "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
      tags: ["ui", "ux"],
    },
  ];
  const [selectedTag, setSelectedTag] = useState<string>(tagsOptions[0]);
  const { searchTerm, handleSearch } = useSearchBar();
  const { isOpen, openModal, closeModal } = useDialog();

  const handleTagSelect = (value: string) => {
    setSelectedTag(value);
  };

  const filteredBlogs = useMemo(() => {
    return getFilteredBlogData(blogData, searchTerm, selectedTag);
  }, [blogData, searchTerm, selectedTag]);

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
  };
}
