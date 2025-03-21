import { useRmtDevStore } from "./lib/rmtDevStore";

import JobItem from "./JobItem";
import Spinner from "../../shared/spinner/Spinner";

export default function JobList() {
  const jobList = useRmtDevStore((state) => state.jobPreviewList);
  const isLoading = useRmtDevStore((state) => state.loading.jobPreview);

  const jobSliced = jobList.slice(0, 7);

  return <ul className="job-list">{isLoading ? <Spinner color="l-gray" /> : jobSliced.map((job) => <JobItem key={job.id} jobItem={job} />)}</ul>;
}
