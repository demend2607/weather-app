import { create } from "zustand";
import axios from "axios";

import { FeedbackItemType } from "./InitialState";
import { useMemo } from "react";

interface ItemsContextType {
  feedbackItems: FeedbackItemType[];
  loading: boolean;
  error: null | string;
  selectedCompany: string;
  selectCompany: (company: string) => void;
  getCompanyList: () => string[];
  filteredFeedbackItems: () => FeedbackItemType[];
  addItem: (newItemsText: string) => void;
  upvoteIncreased: (id: number) => void;
  fetchData: () => void;
}

export const useFeedbackStore = create<ItemsContextType>()((set, get) => ({
  feedbackItems: [],
  loading: false,
  error: "",
  selectedCompany: "",
  selectCompany: (company) => {
    set({ selectedCompany: company });
  },
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.companyName)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  filteredFeedbackItems: () => {
    return get().selectedCompany ? get().feedbackItems.filter((items) => items.companyName === get().selectedCompany) : get().feedbackItems;
  },
  addItem: async (newItemsText) => {
    // Error handeler exist in another component for text
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

    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));
    // In future will be send to the server with method POST(so we use async)
  },
  upvoteIncreased: (id) => {
    set((state) => ({ feedbackItems: state.feedbackItems.map((item) => (item.id === id ? { ...item, upvoteCount: ++item.upvoteCount } : item)) }));
  },
  fetchData: async () => {
    const controller = new AbortController(); // For request cancellation
    set({ loading: true });

    try {
      const response = await axios(
        /* Config settings for optimize we can put it into const (import: AxiosRequestConfig)*/ {
          method: "get",
          url: "https://raw.githubusercontent.com/demend2607/weather-app/refs/heads/main/src/app/file/feedback.json",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          signal: controller.signal,
        }
      );
      const data = await response.data;

      set({ feedbackItems: data, error: "" });
    } catch (error) {
      if (!axios.isCancel(error)) {
        set({ error: error.response?.data?.message || error.message || "Unknown error" });
      }
    } finally {
      set({ loading: false });
    }

    return () => controller.abort(); // Cleanup function
  },
}));
