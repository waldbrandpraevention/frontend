import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AlertStore = {
  interval: number;
  update: (newState: Partial<AlertStore>) => void;
};

export const useAlertStore = create<AlertStore>()(persist(
  (set, get) => ({
    interval: 10000,
    update: ((newState: Partial<AlertStore>) => set(() => (newState))),
  }), {
  name: "alerts",
  storage: createJSONStorage(() => localStorage)
}
));
