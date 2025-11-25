import { persist } from "zustand/middleware";
import { create } from "zustand";
import { StoreState } from "@/types/store/store.types";
import { createBlogStoreSlice } from "./blog/blog-slice";

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createBlogStoreSlice(...a),
      actions: {
        ...createBlogStoreSlice(...a).actions,
      },
    }),
    {
      name: "Vynspire-ai",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["actions"].includes(key)),
        ),
    },
  ),
);
