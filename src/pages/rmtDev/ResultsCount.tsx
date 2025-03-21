import { useRmtDevStore } from "./lib/rmtDevStore";

export default function ResultsCount() {
  const jobItemLn = useRmtDevStore((state) => state.jobPreviewList.length);

  return <p className="count">{jobItemLn} results</p>;
}
