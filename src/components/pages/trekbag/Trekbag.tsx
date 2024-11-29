import TrekBtn from "./TrekBtn";
import TrekItems from "./TrekItems";

import "./trekbag.scss";

import { useItemsContext } from "../../libs/hooks";

export default function Trekbag() {
  const {
    itemText,
    handleRemoveAllItems,
    handleMarkAllAsComplete,
    handleMarkAllAsUncomplete,
    onSubmitHandler,
    changeHandler,
    handleResetToInitial,
    checkedCount,
    totalCount,
  } = useItemsContext();

  return (
    <div className="trekbag">
      <div className="head">
        <small>💠💠💠</small>
        <p>
          {checkedCount} / {totalCount} Counter
        </p>
      </div>

      <TrekItems />
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
          <TrekBtn onсlick={handleResetToInitial} type="secondary">
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
