import axios from "axios";
import { create } from "zustand";

type LoadingStates = {
  jobPreview: boolean;
  jobDetails: boolean;
};
type ErrorStates = {
  jobPreview: string | null;
  jobDetails: string | null;
};
export type JobItemT = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  relevanceScore: number;
  date: string;
};

export type JobDetailT = {
  id: number;
  description: string;
  qualifications: string[];
  reviews: string[];
  title: string;
  badgeLetters: string;
  company: string;
  duration: string;
  salary: string;
  location: string;
  revelanceScore: number;
  daysAgo: number;
  coverImgURL: string;
  companyURL: string;
};
interface JobStoreT {
  jobPreviewList: JobItemT[];
  jobDetailList: JobDetailT[];
  jobId: number | null;
  loading: LoadingStates;
  error: ErrorStates;
  getActiveJobId: () => void;
  fetchJobPreview: (searchText: string) => void;
  fetchJobDetails: () => void;
}

export const useRmtDevStore = create<JobStoreT>()((set, get) => ({
  jobPreviewList: [],
  jobDetailList: [],
  jobId: 0,
  loading: { jobPreview: false, jobDetails: false },
  error: { jobPreview: "", jobDetails: "" },
  getActiveJobId: () => {
    const hashId = +window.location.hash.slice(1);
    return set({ jobId: hashId });
  },
  fetchJobPreview: async (searchText) => {
    const controller = new AbortController();
    set((state) => ({ loading: { ...state.loading, jobPreview: true } }));

    try {
      const response = await axios({
        method: "get",
        url: `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`,
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        signal: controller.signal,
      });
      const data = await response.data;

      set((state) => ({
        jobPreviewList: data.jobItems,
        error: { ...state.error, jobPreview: "" },
      }));
    } catch (error) {
      return set((state) => ({ error: { ...state.error, jobPreview: error.message } }));
    } finally {
      set((state) => ({ loading: { ...state.loading, jobPreview: false }, error: { ...state.error, jobPreview: "" } }));
    }
    return () => controller.abort();
  },
  fetchJobDetails: async () => {
    const jobId = get().jobId;

    const controller = new AbortController();
    set((state) => ({ loading: { ...state.loading, jobDetails: true } }));

    try {
      const response = await axios({
        method: "get",
        url: `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${jobId}`,
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        signal: controller.signal,
      });
      const data = await response.data;

      set((state) => ({
        jobDetailList: data.jobItem,
        error: { ...state.error, jobDetails: "" },
      }));
    } catch (error) {
      return set((state) => ({
        error: { ...state.error, jobDetails: error.message },
      }));
    } finally {
      set((state) => ({ loading: { ...state.loading, jobDetails: false }, error: { ...state.error, jobDetails: "" } }));
    }
    return () => controller.abort();
  },
}));
