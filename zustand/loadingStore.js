import create from "zustand";

export const useLoading = create((set) => ({
  //boolean that triggers a blocking animation overlay cause something important is going on
  get_isLoading: false,
  set_isLoading: (boo) => set((state) => ({ get_isLoading: boo })),
}));
