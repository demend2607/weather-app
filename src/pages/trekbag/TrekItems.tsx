import { useState } from "react";

import { TrekItemType } from "../../entities/trekItems/InitialState";
import TreckSort from "./TreckSort";
import { useItemsStore } from "./lib/itemsStore";

export default function TrekItems() {
  const items = useItemsStore((state) => state.items);

  const [sortBy, setSortBy] = useState("default");
  const sortedItems = [...items].sort((a, b) => {
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
      {items.length === 0 && <div className="empty">Your trekbag is empty</div>}
      {items.length > 0 ? <TreckSort sortBy={sortBy} setSortBy={setSortBy} /> : null}
      {sortedItems.map((item) => (
        <TrekItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

function TrekItem({ item }: { item: TrekItemType }) {
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const deleteItem = useItemsStore((state) => state.deleteItem);

  return (
    <li className="item">
      <label htmlFor="">
        <input checked={item.packed} type="checkbox" onChange={() => toggleItem(item.id)} readOnly />
        {item.text}
      </label>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}
