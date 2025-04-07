import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { usePagination } from "./lib/hooks";

export default function Pagination() {
  const { currentPage, totalPages, setPage } = usePagination();

  return (
    <section className="pagination">
      <button
        className={`pagination__button ${currentPage === 1 ? "pagination__button--hidden" : ""}`}
        onClick={(e) => {
          setPage("prev");
          e.currentTarget.blur();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Page {currentPage - 1}
      </button>
      <button
        className={`pagination__button ${currentPage === totalPages ? "pagination__button--hidden" : ""}`}
        onClick={(e) => {
          setPage("next");
          e.currentTarget.blur();
        }}
      >
        Page {currentPage + 1}
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </section>
  );
}
