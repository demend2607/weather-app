import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

import { JobItemExpandedT, JobItemT, useRmtDevStore } from "./rmtDevStore";

// --------------------------------------------- fetch job details -----------------------------------------
type jobDetailApi = {
  public: boolean;
  jobItem: JobItemExpandedT;
};
const fetchJobDetails = async (jobId: number): Promise<jobDetailApi> => {
  const response = await axios({
    method: "get",
    url: `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${jobId}`,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  if (response.status !== 200) {
    const errorData = await response.data;
    throw new Error(errorData.message);
  }
  const data = await response.data;
  return data;
};

export function useJobItemsDetail() {
  const jobId = useRmtDevStore((state) => state.jobId);

  const { data, isLoading } = useQuery({
    queryKey: ["job-detail", jobId],
    queryFn: () => (jobId ? fetchJobDetails(jobId) : null),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(jobId),
    // onError: () => {},
  });

  const jobItem = data?.jobItem;

  return { jobItem, isLoading } as const;
}
// ------------------------------------------ fetch job preview ----------------------------------------
type jobPreviewApi = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItemT[];
};
const fetchJobPreview = async (searchText: string): Promise<jobPreviewApi> => {
  const response = await axios({
    method: "get",
    url: `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  if (response.status !== 200) {
    const errorData = await response.data;
    throw new Error(errorData.message);
  }
  const data = await response.data;

  return data;
};
export function useJobItemsPreview() {
  const searchText = useRmtDevStore((state) => state.debounceSearchText);

  const { data, isLoading } = useQuery({
    queryKey: ["job-preview", searchText],
    queryFn: () => (searchText ? fetchJobPreview(searchText) : null),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText),
    // onError: () => {},
  });

  const jobItem = data?.jobItems || [];
  const totalJobCount = jobItem.length || 0;

  return { jobItem, totalJobCount, isLoading } as const;
}
//  ------------------------------------- Debounce  -----------------------------------------------

export function useDebounce() {
  const { searchText, setSearchText, setDebounceSearchText } = useRmtDevStore((state) => state);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceSearchText(searchText), 500);
    return () => clearTimeout(timerId);
  }, [searchText]);
  return { searchText, setSearchText };
}
