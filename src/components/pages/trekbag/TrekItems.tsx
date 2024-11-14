import { Dispatch, SetStateAction } from "react";
import { TrekItemType } from "../../libs/InitialState";

export default function TrekItems({ items, setTrekItems }: { items: TrekItemType[]; setTrekItems: Dispatch<SetStateAction<TrekItemType[]>>}) {
  return (
    <ul className="item-list">
      {items.length === 0 && <div className="empty">Your trekbag is empty</div>}
      {items.map((item) => (
        <TrekItem key={item.id} item={item} setTrekItems={setTrekItems} />
      ))}
    </ul>
  );
}

function TrekItem({ item, setTrekItems }: { item: TrekItemType; setTrekItems: Dispatch<SetStateAction<TrekItemType[]>> }) {
  const checkedHandler = () => {
    setTrekItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, packed: !i.packed } : i)));
  };
  const deleteHandler = () => {
    return setTrekItems((prev) => prev.filter((i) => i.id !== item.id));
  };
  return (
    <li className="item">
      <label htmlFor="">
        <input checked={item.packed} type="checkbox" onChange={checkedHandler} readOnly />
        {item.text}
      </label>
      <button onClick={deleteHandler}>❌</button>
    </li>
  );
}
