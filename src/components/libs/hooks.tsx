import { useContext } from "react";

import { ItemsContext } from "../../contexts/TrekBagContextProvider";

export const useItemsContext = () => {
    const context = useContext(ItemsContext);
    return context;
}