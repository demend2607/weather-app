import { useJobItemsPreview } from "./lib/hooks";
import { useRmtDevStore } from "./lib/rmtDevStore";

import JobItem from "./JobItem";
import Spinner from "../../shared/spinner/Spinner";
import ErrorMessage from "../../shared/error/ErrorMessage";

export default function JobList() {
  const jobId = useRmtDevStore((state) => state.jobId);
  const { jobItems, isLoading, error } = useJobItemsPreview();

  const jobSliced = jobItems.slice(0, 7);

  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner color="l-gray" />
      ) : error ? (
        <ErrorMessage error={error.message} />
      ) : (
        jobSliced.map((job) => <JobItem key={job.id} jobItem={job} isActive={job.id === jobId} />)
      )}
    </ul>
  );
}
