import { ChangeEvent, ChangeEventHandler, createContext, FormEvent, MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { initialItems, TrekItemType } from "../components/lib/InitialState";

interface ItemsContextType {
  itemText?: string;
  trekItems: TrekItemType[];
  setTrekItems: React.Dispatch<React.SetStateAction<TrekItemType[]>>;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteHandler: (item: TrekItemType) => void;
  handlerToggle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveAllItems: () => void;
  handleMarkAllAsComplete: () => void;
  handleMarkAllAsUncomplete: () => void;
  onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
  handleResetToInitial: () => void;
  checkedCount: number;
  totalCount: number;
}

export const ItemsContext = createContext<ItemsContextType>();

export default function TrekBagContextProvider({ children }: { children: React.ReactNode }) {
  const itemFromLocalStorage = JSON.parse(localStorage.getItem("trekItems") || "[]");
  const [itemText, setItemText] = useState("");
  const [trekItems, setTrekItems] = useState<TrekItemType[]>(() => itemFromLocalStorage || initialItems);

  const inputRef = useRef;
  const checkedCount = useMemo(() => trekItems.filter((item) => item.packed).length, [trekItems]);
  const totalCount = useMemo(() => trekItems.length, [trekItems]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
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
  const handlerToggle = (id: number) => {
    const newItems = trekItems.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item));
    return setTrekItems(newItems);
  };
  const deleteHandler = (id: number) => {
    const newItems = trekItems.filter((item) => item.id !== id);
    return setTrekItems(newItems);
  };

  const handleRemoveAllItems = () => {
    setTrekItems([]);
  };
  const handleResetToInitial = () => {
    setTrekItems(initialItems);
  };
  const handleMarkAllAsComplete = () => {
    setTrekItems((prev) => prev.map((item) => ({ ...item, packed: true })));
  };
  const handleMarkAllAsUncomplete = () => {
    setTrekItems((prev) => prev.map((item) => ({ ...item, packed: false })));
  };

  useEffect(() => {
    localStorage.setItem("trekItems", JSON.stringify(trekItems));
  }, [trekItems]);
  return (
    <ItemsContext.Provider
      value={{
        trekItems,
        setTrekItems,
        changeHandler,
        onSubmitHandler,
        deleteHandler,
        handlerToggle,
        handleRemoveAllItems,
        handleResetToInitial,
        handleMarkAllAsComplete,
        handleMarkAllAsUncomplete,
        checkedCount,
        totalCount,
      }}>
      {children}
    </ItemsContext.Provider>
  );
}
