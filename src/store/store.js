import { create } from "zustand";

export const useStore = create((set) => ({
  starred: false,
  setStarred: (value) => set(() => ({ starred: value })),
  totalFileSize: null,
  setTotalFileSize: (value) => set(() => ({ totalFileSize: value })),
}));
