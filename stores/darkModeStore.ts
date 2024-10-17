import { create } from "zustand";

interface DarkModeState {
  isDark: boolean;
  changeDarkMode: (isDark: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDark: false,
  changeDarkMode: (isDark: boolean) => {
    set({ isDark });
  },
}));
