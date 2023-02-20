import { create } from "zustand";
type AdvancedStore = {
  /**
   * Event ID
   */
  id: number;
  setId: (newId: number) => void;
};

export const useAdvancedStore = create<AdvancedStore>()((set) => ({
  id: 0,
  setId: (newId: number) => set(() => ({ id: newId })),
}));
