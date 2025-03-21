import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRmtDevStore } from "./lib/rmtDevStore";
export default function SearchForm() {
  const [searchText, setSearchText] = useState("");

  const fetchJobs = useRmtDevStore((state) => state.fetchJobPreview);

  useEffect(() => {
    if (!searchText) return;
    fetchJobs(searchText);
  }, [searchText]);

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
