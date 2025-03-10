import { create } from "zustand";

import { FeedbackItemType } from "./InitialState";

interface ItemsContextType {
  items: FeedbackItemType[];
  loading: boolean;
  error: null | string;
  addItem: (newItemsText: string) => void;
  upvoteIncreased: (id: number) => void;
  filteredFeedbackItems: (company: string) => void;
}

export const useFeedbackStore = create<ItemsContextType>()((set, get) => ({
  items: [],
  loading: false,
  error: null,
  filteredFeedbackItems: (company) => {
    set((state) => ({ items: state.items.filter((item) => item.companyName === company) }));
  },
  addItem: async (newItemsText) => {
    const companyName = newItemsText
      .split(" ")
      .find((word) => word.startsWith("#"))
      .substring(1);

    const newItem = {
      id: new Date().getTime(),
      text: newItemsText,
      upvoteCount: 0,
      daysAgo: 0,
      companyName: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    set((state) => ({ items: [...state.items, newItem] }));
  },
  upvoteIncreased: (id) => {
    set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, upvoteCount: item.upvoteCount + 1 } : item)) }));
  },
}));
