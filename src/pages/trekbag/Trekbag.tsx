import { useRef, useState } from "react";
import { useItemsStore } from "./lib/itemsStore";
import TrekBtn from "./TrekBtn";
import TrekItems from "./TrekItems";

import "./trekbag.scss";

export default function Trekbag() {
  const markAllAsComplete = useItemsStore((state) => state.markAllAsComplete);
  const markAllAsUncomplete = useItemsStore((state) => state.markAllAsUncomplete);
  const resetToInitial = useItemsStore((state) => state.resetToInitial);
  const removeAllItems = useItemsStore((state) => state.removeAllItems);
  const addItem = useItemsStore((state) => state.addItem);
  const items = useItemsStore((state) => state.items);

  const [itemText, setItemText] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!itemText) {
      alert("Item can't be empty");
      inputRef.current.focus();
      return;
    }

    addItem(itemText);
    setItemText("");
  };

  return (
    <div className="trekbag">
      <div className="head">
        <small>💠💠💠</small>
        <p>
          {items.filter((item) => item.packed).length} / {items.length} Counter
        </p>
      </div>

      <TrekItems />
      <div className="sidebar">
        <form onSubmit={handleSubmit}>
          <h2>Add an item</h2>
          <input
            value={itemText}
            type="text"
            placeholder="Add an item"
            onChange={(e) => {
              setItemText(e.target.value);
            }}
          />
          <button className="btn">Add</button>
        </form>
        <div className="button-group">
          <TrekBtn onсlick={markAllAsComplete} type="secondary">
            Mark all as complete
          </TrekBtn>
          <TrekBtn onсlick={markAllAsUncomplete} type="secondary">
            Mark all as incomplete
          </TrekBtn>
          <TrekBtn onсlick={resetToInitial} type="secondary">
            Reset to initial
          </TrekBtn>
          <TrekBtn onсlick={removeAllItems} type="secondary">
            Remove all items
          </TrekBtn>
        </div>
      </div>
    </div>
  );
}
