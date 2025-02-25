import { create } from "zustand";

import { FeedbackItemType, initialItems } from "./InitialState";

interface ItemsContextType {
  items: FeedbackItemType[];
  addItem: (newItemsText: string) => void;
  upvoteIncreased: (id: number) => void;
}

export const useFeedbackStore = create<ItemsContextType>()((set) => ({
  items: initialItems,
  addItem: (newItemsText) => {
    const newItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: "L",
      companyName: "Bytegrad",
      text: newItemsText,
      daysAgo: 0,
    };
    set((state) => ({ items: [...state.items, newItem] }));
  },
  upvoteIncreased: (id) => {
    set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, upvoteCount: item.upvoteCount + 1 } : item)) }));
  },
}));
