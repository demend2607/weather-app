import { create } from "zustand";

import { FeedbackItemType, hashtagInitialList, HashtagItemType } from "./InitialState";

interface ItemsContextType {
  items: FeedbackItemType[];
  hashtags: HashtagItemType[];
  textHandle: string;
  addItem: (newItemsText: string) => void;
  upvoteIncreased: (id: number) => void;
  addHashtag: (newItemsText: string) => void;
}

export const useFeedbackStore = create<ItemsContextType>()((set) => ({
  items: [],
  hashtags: hashtagInitialList,
  textHandle: "",
  addItem: (newItemsText) => {
    const companyName = newItemsText
      .split(" ")
      .find((word) => word.startsWith("#"))
      .substring(1);
    const firstLetter = newItemsText
      .split(" ")
      .find((word) => word.startsWith("#"))
      .substring(1)
      .charAt(0)
      .toUpperCase();

    const newItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: firstLetter,
      companyName: companyName,
      text: newItemsText,
      daysAgo: 0,
    };

    set((state) => ({ items: [...state.items, newItem] }));
  },
  addHashtag: (newItemsHashtag) => {
    const hashtagUp = newItemsHashtag.slice(0, 2).toUpperCase() + newItemsHashtag.slice(2); /* toLowerCase() */
    const newHashtag = {
      id: new Date().getTime(),
      text: hashtagUp,
    };
    set((state) => ({ hashtags: [...state.hashtags, newHashtag] }));
  },
  upvoteIncreased: (id) => {
    set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, upvoteCount: item.upvoteCount + 1 } : item)) }));
  },
}));
