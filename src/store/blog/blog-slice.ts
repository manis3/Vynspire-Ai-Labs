import {
  IBlogSliceInitialState,
  IBLogStoreSlice,
} from "@/types/store/blog/blog.types";
import { StateCreator } from "zustand";

const initialState: IBlogSliceInitialState = {
  blogId: "",
  selectedFilter: "All",
};

export const createBlogStoreSlice: StateCreator<IBLogStoreSlice> = (set) => ({
  ...initialState,
  actions: {
    setBlogId: (blogId: string | number) => {
      set({ blogId });
    },
    setSelectedFilter: (selectedFilter: string) => {
      set({ selectedFilter });
    },
  },
});
