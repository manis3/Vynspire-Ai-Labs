import {
  IBlogSliceInitialState,
  IBLogStoreSlice,
} from "@/types/store/blog/blog.types";
import { StateCreator } from "zustand";

const initialState: IBlogSliceInitialState = {
  blogId: "",
};

export const createBlogStoreSlice: StateCreator<IBLogStoreSlice> = (set) => ({
  ...initialState,
  actions: {
    setBlogId: (blogId: string | number) => {
      set({ blogId });
    },
  },
});
