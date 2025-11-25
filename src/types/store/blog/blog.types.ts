export interface IBlogSliceInitialState {
  blogId: string | number;
  selectedFilter: string;
}

export interface IBlogSliceAction {
  setBlogId: (blogId: string | number) => void;
  setSelectedFilter: (selectedFilter: string) => void;
}

export interface IBLogStoreSlice extends IBlogSliceInitialState {
  actions: IBlogSliceAction;
}
