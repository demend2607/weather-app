import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

import { JOBITEMS_API_URL, ITEMS_PER_PAGE } from "./constants";

import { useRmtDevStore } from "./rmtDevStore";

import { JobItemT, JobItemExpandedT, jobPreviewApi, jobDetailApi } from "./types";

// -------------------------------------------- Fetch job details ----------------------------------------

const fetchJobDetails = async (jobId: number | null): Promise<jobDetailApi> => {
  const response = await axios({
    method: "get",
    url: `${JOBITEMS_API_URL}/${jobId}`,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  const data = await response.data;

  return data;
};

export function useJobItemsDetail() {
  const jobId = useRmtDevStore((state) => state.jobId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["job-detail", jobId],
    queryFn: () => fetchJobDetails(jobId),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(jobId),
  });

  const jobItem = data?.jobItem;

  return { jobItem, isLoading, error } as const;
}
// ------------------------------------------ Fetch bookmark jobs ----------------------------------------

export function useJobItemsBookmark() {
  const bookMarkIds = useRmtDevStore((state) => state.bookMarkedIds);

  const { data, isLoading, error } = useQueries({
    queries: bookMarkIds.map((id) => ({
      queryKey: ["job-detail", id],
      queryFn: () => fetchJobDetails(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(bookMarkIds),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data?.jobItem) as JobItemExpandedT[],
        isLoading: results.some((item) => item.isLoading),
        error: results.map((item) => item.error),
      };
    },
  });

  return { jobItem: data, isLoading, error } as const;
}
// ------------------------------------------ Fetch job preview ----------------------------------------

const fetchJobPreview = async (searchText: string): Promise<jobPreviewApi> => {
  const response = await axios({
    method: "get",
    url: `${JOBITEMS_API_URL}?search=${searchText}`,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  const data = await response.data;

  return data;
};
export function useJobItemsPreview() {
  const searchText = useRmtDevStore((state) => state.debounceSearchText);

  const { data, error, isLoading } = useQuery({
    queryKey: ["job-preview", searchText],
    queryFn: () => fetchJobPreview(searchText),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText),
  });

  const jobItems = data?.jobItems || [];
  const totalJobCount = jobItems.length || 0;

  return { jobItems, totalJobCount, isLoading, error } as const;
}

//  ------------------------------------------- Debounce  -----------------------------------------------

export function useDebounce() {
  const { searchText, setSearchText, setDebounceSearchText } = useRmtDevStore((state) => state);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounceSearchText(searchText), 500);
    return () => clearTimeout(timerId);
  }, [searchText, setDebounceSearchText]);
  return { searchText, setSearchText };
}

// ------------------------------------------- Pagination Controls ---------------------------------------

export const usePagination = () => {
  const { totalJobCount } = useJobItemsPreview();
  const { currentPage, setCurrentPage } = useRmtDevStore((state) => state);

  const totalPages = Math.ceil(totalJobCount / ITEMS_PER_PAGE) || 1;

  return {
    currentPage,
    totalPages,
    setPage: (direction: "next" | "prev") => {
      if (direction === "next") {
        if (currentPage === totalPages) return;
        setCurrentPage(currentPage + 1);
      } else if (direction === "prev") {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
      }
    },
  };
};
// ---------------------------------------------- Sorting controls -----------------------------------------
export const useSorting = (options: { sortBy: string; sortOrder: string }, array: JobItemT[]) => {
  const { sortBy, sortOrder } = options;
  const jobItemsSorted =
    [...(array || [])].sort((a, b) => {
      // for prevent mutation of the original array
      if (sortBy === "relevant") {
        if (sortOrder === "asc") return a.relevanceScore - b.relevanceScore;
        if (sortOrder === "desc") return b.relevanceScore - a.relevanceScore;
        return 0;
      }
      if (sortBy === "recent") {
        if (sortOrder === "asc") return a.daysAgo - b.daysAgo;
        if (sortOrder === "desc") return b.daysAgo - a.daysAgo;
        return 0;
      }
      return 0;
    }) || [];
  return { jobItemsSorted };
};
// ------------------------------------------- Close on click outside ---------------------------------------
export const useOnClickOutside = (refs: React.RefObject<HTMLElement>[], handler: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) handler();
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
};
