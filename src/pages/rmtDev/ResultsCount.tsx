import { useJobItemsPreview } from "./lib/hooks";

export default function ResultsCount() {
  const { totalJobCount } = useJobItemsPreview();

  return (
    <p className="count">
      <span className="u-bold">{totalJobCount}</span> results
    </p>
  );
}
