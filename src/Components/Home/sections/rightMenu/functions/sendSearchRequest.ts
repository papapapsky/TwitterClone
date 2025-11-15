import type { RefObject } from "react";
import type { searchedUserType } from "../types/usersType";
import { searchUsers } from "./searchUsers";

interface IProps {
  setSearchedUsers: (searchedUsers: searchedUserType[]) => void;
  onFocused: () => void;
  debounceRef: RefObject<number | null>;
  searchInput: RefObject<HTMLInputElement | null>;
  setLoading: (loading: boolean) => void;
}

export const sendSearchRequest = ({
  setSearchedUsers,
  onFocused,
  debounceRef,
  searchInput,
  setLoading,
}: IProps) => {
  setSearchedUsers([]);
  onFocused();
  if (debounceRef.current) clearTimeout(debounceRef.current);
  if (searchInput.current?.value) {
    debounceRef.current = setTimeout(() => {
      searchUsers({
        login: searchInput.current?.value || "",
        setSearchedUsers,
        setLoading,
      });
    }, 1000);
  }
};
