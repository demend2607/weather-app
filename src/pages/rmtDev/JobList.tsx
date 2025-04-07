import { useJobItemsPreview, useSorting } from "./lib/hooks";
import { useRmtDevStore } from "./lib/rmtDevStore";

import { ITEMS_PER_PAGE } from "./lib/constants";

import JobItem from "./JobItem";
import Spinner from "../../shared/spinner/Spinner";

export default function JobList() {
  const { jobId, currentPage, sortBy, sortOrder } = useRmtDevStore((state) => state);
  const { jobItems, isLoading } = useJobItemsPreview();
  const { jobItemsSorted } = useSorting({ sortBy, sortOrder }, jobItems);

  const jobSliced = jobItemsSorted.slice(currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <ul className="job-list">
      {isLoading ? <Spinner color="l-gray" /> : jobSliced.map((job) => <JobItem key={job.id} jobItem={job} isActive={job.id === jobId} />)}
    </ul>
  );
}
