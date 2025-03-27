import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type JobItemT = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  relevanceScore: number;
  date: string;
};

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
interface JobStoreT {
  jobId: number | null;
  jobItemPreview: JobItemT[];
  jobItemDetail: JobItemExpandedT;
  searchText: string;
  debounceSearchText: string;
  getActiveJobId: () => void;
  setSearchText: (text: string) => void;
  setDebounceSearchText: (text: string) => void;
}

export const useRmtDevStore = create<JobStoreT>()(
  devtools((set) => ({
    jobId: 0,
    jobItemPreview: [],
    jobItemDetail: {} as JobItemExpandedT,
    searchText: "",
    debounceSearchText: "",
    getActiveJobId: () => {
      const hashId = +window.location.hash.slice(1);
      return set({ jobId: hashId });
    },
    setSearchText: (text) => set({ searchText: text }),
    setDebounceSearchText: (text) => set({ debounceSearchText: text }),
  }))
);
