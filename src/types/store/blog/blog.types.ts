export interface IBlogSliceInitialState {
  blogId: string | number;
}

export interface IBlogSliceAction {
  setBlogId: (blogId: string | number) => void;
}

export interface IBLogStoreSlice extends IBlogSliceInitialState {
  actions: IBlogSliceAction;
}
