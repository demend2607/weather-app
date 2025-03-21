import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons/faArrowDownShortWide";
export default function Sorting() {
  return (
    <section className="sorting">
      <FontAwesomeIcon icon={faArrowDownShortWide} />

      <button className="sorting__button sorting__button--relevant">Relevant</button>

      <button className="sorting__button sorting__button--recent">Recent</button>
    </section>
  );
}
