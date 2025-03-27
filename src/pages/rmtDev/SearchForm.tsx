import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useDebounce } from "./lib/hooks";
export default function SearchForm() {
  const { searchText, setSearchText } = useDebounce();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <input onChange={changeHandler} spellCheck="false" value={searchText} type="text" required placeholder="Find remote developer jobs..." />
    </form>
  );
}
