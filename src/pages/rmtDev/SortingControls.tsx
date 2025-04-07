import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide, faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";

import { useRmtDevStore } from "./lib/rmtDevStore";
export default function Sorting() {
  const { sortBy, sortOrder, setSortOption, setSortOrder } = useRmtDevStore((state) => state);

  return (
    <section className="sorting">
      {sortOrder === "asc" ? (
        <FontAwesomeIcon icon={faArrowDownShortWide} onClick={setSortOrder} />
      ) : (
        <FontAwesomeIcon icon={faArrowUpShortWide} onClick={setSortOrder} />
      )}

      <button
        className={`sorting__button sorting__button--relevant ${sortBy === "relevant" ? "sorting__button--active" : ""}`}
        onClick={() => setSortOption("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${sortBy === "recent" ? "sorting__button--active" : ""}`}
        onClick={() => setSortOption("recent")}
      >
        Recent
      </button>
    </section>
  );
}
