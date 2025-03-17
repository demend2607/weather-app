import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function SearchForm() {
  return (
    <form action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>

        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <input spellCheck="false" type="text" required placeholder="Find remote developer jobs..." />
    </form>
  );
}
