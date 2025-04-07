// ------------------ Store state  ----------------------
export type JobStoreT = {
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
// ------------------------- TanStack query ---------------------
export type jobDetailApi = {
  public: boolean;
  jobItem: JobItemExpandedT;
};
export type jobPreviewApi = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItemT[];
};
