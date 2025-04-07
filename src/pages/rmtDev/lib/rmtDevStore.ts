import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { JobStoreT } from "./types";

export const useRmtDevStore = create<JobStoreT>()(
  devtools(
    persist(
      (set) => ({
        jobId: 0,
        searchText: "",
        debounceSearchText: "",
        currentPage: 1,
        bookMarkedIds: [],
        sortBy: "relevant",
        sortOrder: "asc",
        getActiveJobId: () => {
          const hashId = +window.location.hash.slice(1);
          return set({ jobId: hashId });
        },
        setSearchText: (text) => set({ searchText: text }),
        setDebounceSearchText: (text) => set({ debounceSearchText: text, currentPage: 1 }),
        setCurrentPage: (page) => set({ currentPage: page }),
        toggleBookMark: (id) => {
          set((state) => {
            if (!state.bookMarkedIds.includes(id)) {
              return { bookMarkedIds: [...state.bookMarkedIds, id] };
            } else {
              return {
                bookMarkedIds: state.bookMarkedIds.filter((item) => {
                  return item !== id;
                }),
              };
            }
          });
        },
        setSortOption: (option) => set({ sortBy: option, currentPage: 1, sortOrder: "asc" }),
        setSortOrder: () => set((state) => ({ sortOrder: state.sortOrder === "asc" ? "desc" : "asc", currentPage: 1 })),
      }),
      // Storage
      {
        name: "rmtDevStore",
        partialize: (state) => ({
          bookMarkedIds: state.bookMarkedIds,
        }),
      }
    )
  )
);
