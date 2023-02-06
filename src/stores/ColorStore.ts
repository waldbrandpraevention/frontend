import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ColorStore = {
  background: string;
  headerBackground: string;
  sidebarBackground: string;
  sidebarActive: string;
  sidebarHover: string;
  sidebarText: string;
  setColor: (newColors: Partial<ColorStore>) => void;
  resetDefault: () => void;
};

export const defaultColors: Readonly<Omit<ColorStore, "setColor" | "resetDefault">> = {
  background: "#F5F5F5" /* "#f7f7f7" */,
  sidebarBackground: "#FAFAFA" /*  "#FAFAFA" */,
  sidebarActive: "#ff7043",
  sidebarHover: "#fbe9e7",
  sidebarText: "#000000",
  headerBackground: "#F5F5F5", 
};
type Theme = Readonly<Omit<ColorStore, "setColor" | "resetDefault">>;
export const themes: { green: Theme; bluegreen: Theme; red: Theme; blue: Theme; orange: Theme; black: Theme; } = {
  green: {
    background: "#E8F5E9",
    headerBackground: "#E8F5E9",
    sidebarBackground: "#43A047",
    sidebarActive: "#66BB6A",
    sidebarHover: "#81C784",
    sidebarText: "#FFFFFF",
  },
  bluegreen: {
    background: "#ecf8f0",
    headerBackground: "#ecf8f0",
    sidebarBackground: "#009688",
    sidebarActive: "#4DB6AC",
    sidebarHover: "#80CBC4",
    sidebarText: "#FFFFFF",
  },
  red: {
    background: "#FFEBEE",
    headerBackground: "#FFEBEE",
    sidebarBackground: "#E53935",
    sidebarActive: "#EF5350",
    sidebarHover: "#E57373",
    sidebarText: "#FFFFFF",
  },
  blue: {
    background: "#BBDEFB",
    headerBackground: "#BBDEFB",
    sidebarBackground: "#303F9F",
    sidebarActive: "#5C6BC0",
    sidebarHover: "#9FA8DA",
    sidebarText: "#FFFFFF",
  },
  orange: {
    background: "#FFF3E0",
    headerBackground: "#FFF3E0",
    sidebarBackground: "#EF6C00",
    sidebarActive: "#FB8C00",
    sidebarHover: "#FFB74D",
    sidebarText: "#FFFFFF",
  },
  black: {
    background: "#F5F5F5",
    headerBackground: "#F5F5F5",
    sidebarBackground: "#000000",
    sidebarActive: "#383838",
    sidebarHover: "#5c5c5c",
    sidebarText: "#FFFFFF",
  }
};

export const useColorStore = create<ColorStore>()(persist(
  (set, get) => ({
    ...defaultColors,
    setColor: ((newColors: Partial<ColorStore>) => set(() => newColors)),
    resetDefault: () => set(() => defaultColors)
  }), {
  name: "colors_user",
  storage: createJSONStorage(() => localStorage)
}
));
