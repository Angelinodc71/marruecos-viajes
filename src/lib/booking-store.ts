import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BookingState = {
  people: string;
  date: string;
  dateBack: string;
  itemName: string;
  itemType: "pack" | "stay" | "experience" | "";
  packSlug: string;
  staySlug: string;
  expSlug: string;
};

type BookingActions = {
  update: (partial: Partial<BookingState>) => void;
  clear: () => void;
};

const defaults: BookingState = {
  people: "1",
  date: "",
  dateBack: "",
  itemName: "",
  itemType: "",
  packSlug: "",
  staySlug: "",
  expSlug: "",
};

export const useBookingStore = create<BookingState & BookingActions>()(
  persist(
    (set) => ({
      ...defaults,
      update: (partial) => set((state) => ({ ...state, ...partial })),
      clear: () => set({ ...defaults }),
    }),
    {
      name: "mv-booking",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);