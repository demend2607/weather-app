import { useContext, useState } from "react";

import { TrekItemType } from "../../libs/InitialState";
import { ItemsContext } from "../../../contexts/TrekBagContextProvider";
import TreckSort from "./TreckSort";
import { useItemsContext } from "../../libs/hooks";

export default function TrekItems() {
  const { trekItems } = useItemsContext();

  const [sortBy, setSortBy] = useState("default");
  const sortedItems = [...trekItems].sort((a, b) => {
    if (sortBy === "default") {
      return a.text.localeCompare(b.text);
    }
    if (sortBy === "packed") {
      return b.packed - a.packed;
    }
    if (sortBy === "unpacked") {
      return a.packed - b.packed;
    }
    return 0;
  });
  return (
    <ul className="item-list">
      {trekItems.length === 0 && <div className="empty">Your trekbag is empty</div>}
      {trekItems.length > 0 ? <TreckSort sortBy={sortBy} setSortBy={setSortBy} /> : null}
      {sortedItems.map((item) => (
        <TrekItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

function TrekItem({ item }: { item: TrekItemType }) {
  const { handlerToggle, deleteHandler } = useItemsContext();

  return (
    <li className="item">
      <label htmlFor="">
        <input checked={item.packed} type="checkbox" onChange={() => handlerToggle(item.id)} readOnly />
        {item.text}
      </label>
      <button onClick={() => deleteHandler(item.id)}>❌</button>
    </li>
  );
}
