import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  searchQuery: string;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  searchQuery: "",
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));