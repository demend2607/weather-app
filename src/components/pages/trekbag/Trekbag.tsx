import { ChangeEvent, FormEvent, useRef, useState, useMemo, useEffect } from "react";

import TrekBtn from "./TrekBtn";
import TrekItems from "./TrekItems";
import treckSort from "./treckSort";
import { initialItems, TrekItemType } from "../../libs/InitialState";

import "./trekbag.scss";

export default function Trekbag() {
  const itemFromLocalStorage = JSON.parse(localStorage.getItem("trekItems") || "[]");
  const [itemText, setItemText] = useState("");
  const [trekItems, setTrekItems] = useState<TrekItemType[]>(() => itemFromLocalStorage || initialItems);

  const inputRef = useRef;
  const checkedCount = useMemo(() => trekItems.filter((item) => item.packed).length, [trekItems]);
  const totalCount = useMemo(() => trekItems.length, [trekItems]);

  useEffect(() => {
    localStorage.setItem("trekItems", JSON.stringify(trekItems));
  }, [trekItems]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemText(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itemText) {
      alert("Item cant be empty");
      inputRef.current?.focus();
      return;
    }
    const newItem = {
      id: new Date().getTime(),
      text: itemText,
      packed: false,
    };
    setTrekItems((prev) => [...prev, newItem]);
    setItemText("");
  };

  const handleRemoveAllItems = () => {
    setTrekItems([]);
  };
  const handleRseteToInitial = () => {
    setTrekItems(initialItems);
  };
  const handleMarkAllAsComplete = () => {
    setTrekItems((prev) => prev.map((item) => ({ ...item, packed: true })));
  };
  const handleMarkAllAsUncomplete = () => {
    setTrekItems((prev) => prev.map((item) => ({ ...item, packed: false })));
  };

  return (
    <div className="trekbag">
      <div className="head">
        <small>💠💠💠</small>
        <p>
          {checkedCount} / {totalCount} Counter
        </p>
      </div>

      <TrekItems items={trekItems} setTrekItems={setTrekItems} />
      <div className="sidebar">
        <form onSubmit={onSubmitHandler}>
          <h2>Add an item</h2>
          <input value={itemText} type="text" placeholder="Add an item" onChange={changeHandler} />
          <button className="btn">Add</button>
        </form>
        <div className="button-group">
          <TrekBtn onсlick={handleMarkAllAsComplete} type="secondary">
            Mark all as complete
          </TrekBtn>
          <TrekBtn onсlick={handleMarkAllAsUncomplete} type="secondary">
            Mark all as incomplete
          </TrekBtn>
          <TrekBtn onсlick={handleRseteToInitial} type="secondary">
            Reset to initial
          </TrekBtn>
          <TrekBtn onсlick={handleRemoveAllItems} type="secondary">
            Remove all items
          </TrekBtn>
        </div>
      </div>
    </div>
  );
}
