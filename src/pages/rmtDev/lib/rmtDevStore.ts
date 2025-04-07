import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type JobItemT = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  relevanceScore: number;
  date: string;
};

interface JobStoreT {
  jobId: number | null;
  searchText: string;
  debounceSearchText: string;
  currentPage: number;
  bookMarkedIds: number[];
  sortBy: "relevant" | "recent";
  sortOrder: "asc" | "desc";
  getActiveJobId: () => void;
  setSearchText: (text: string) => void;
  setDebounceSearchText: (text: string) => void;
  setCurrentPage: (page: number) => void;
  toggleBookMark: (id: number) => void;
  setSortOption: (option: "relevant" | "recent") => void;
  setSortOrder: () => void;
}
export type JobItemExpandedT = JobItemT & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};

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
      {
        name: "rmtDevStore",
        partialize: (state) => ({
          bookMarkedIds: state.bookMarkedIds,
        }),
      }
    )
  )
);
