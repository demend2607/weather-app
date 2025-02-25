import { create } from "zustand";

import { initialItems, TrekItemType } from "./InitialState";

interface ItemsContextType {
  items: TrekItemType[];
  addItem: (newItemsText: string) => void;
  deleteItem: (id: number) => void;
  toggleItem: (id: number) => void;
  removeAllItems: () => void;
  markAllAsComplete: () => void;
  markAllAsUncomplete: () => void;
  resetToInitial: () => void;
}

export const useItemsStore = create<ItemsContextType>()((set) => ({
  items: initialItems,
  addItem: (newItemsText) => {
    const newItem = {
      id: new Date().getTime(),
      text: newItemsText,
      packed: false,
    };
    set((state) => ({ items: [...state.items, newItem] }));
  },
  deleteItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      return { items: newItems };
    });
  },
  toggleItem: (id) => {
    set((state) => {
      const newItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      });
      return { items: newItems };
    });
  },
  removeAllItems: () => {
    set(() => ({ items: [] }));
  },
  resetToInitial: () => {
    set(() => ({ items: initialItems }));
  },
  markAllAsComplete: () => {
    set((state) => {
      const newItems = state.items.map((items) => {
        return { ...items, packed: true };
      });
      return { items: newItems };
    });
  },
  markAllAsUncomplete: () => {
    set((state) => {
      const newItems = state.items.map((items) => {
        return { ...items, packed: false };
      });
      return { items: newItems };
    });
  },
}));
