import { Dispatch, SetStateAction } from "react";
import Select from "react-select";

const sortingOptions = [
  { label: "sort by default", value: "default" },
  { label: "sort by packed", value: "packed" },
  { label: "sort by unpacked", value: "unpacked" },
];

export default function TreckSort({ setSortBy }: { setSortBy: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="sorting">
      <Select onChange={(option) => setSortBy(option.value)} defaultValue={sortingOptions[0]} options={sortingOptions} />
    </div>
  );
}

// zhbi27dv
// loftnik
// vkusniyprazdnick27