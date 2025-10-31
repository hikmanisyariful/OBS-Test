import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";

type SelectedUserContextProps = {
  selected: number[];
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleAll: (checked: boolean) => void;
  toggleOne: (id: number) => void;
  isSelected: (id: number) => boolean;
  focusRow: (id: number) => void;
};

export const SelectedUserContext = createContext<SelectedUserContextProps>({
  selected: [],
  isAllSelected: false,
  isIndeterminate: false,
  toggleAll: () => {},
  toggleOne: () => {},
  isSelected: () => false,
  focusRow: () => {},
});

export const useSelectedUserContextContext = () => {
  return useContext(SelectedUserContext);
};

export const SelectedUserProvider = ({ children }: { children: ReactNode }) => {
  const usersState = useAppSelector((state) => state.users);
  const [selected, setSelected] = useState<number[]>([]);

  const allIds = useMemo(() => usersState.userList.map((u) => u.id), [usersState.userList]);
  const isAllSelected =
    selected.length === usersState.userList.length && usersState.userList.length > 0;
  const isIndeterminate = selected.length > 0 && selected.length < usersState.userList.length;

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? allIds : []);
  };

  const toggleOne = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const isSelected = (id: number) => selected.includes(id);

  const focusRow = (id: number) => setSelected([id]);

  return (
    <SelectedUserContext.Provider
      value={{
        selected,
        isAllSelected,
        isIndeterminate,
        toggleAll,
        toggleOne,
        isSelected,
        focusRow,
      }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
};
