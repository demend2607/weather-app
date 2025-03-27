import { useJobItemsPreview } from "./lib/hooks";
import { useRmtDevStore } from "./lib/rmtDevStore";

import JobItem from "./JobItem";
import Spinner from "../../shared/spinner/Spinner";

export default function JobList() {
  const jobId = useRmtDevStore((state) => state.jobId);
  const { jobItem, isLoading } = useJobItemsPreview();

  const jobSliced = jobItem.slice(0, 7);

  return (
    <ul className="job-list">
      {isLoading ? <Spinner color="l-gray" /> : jobSliced.map((job) => <JobItem key={job.id} jobItem={job} isActive={job.id === jobId} />)}
    </ul>
  );
}
