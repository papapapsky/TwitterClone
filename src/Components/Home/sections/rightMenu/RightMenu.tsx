import type { searchedUserType } from "./types/usersType";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { sendSearchRequest } from "./functions/sendSearchRequest";
import { SearchUserRender } from "./renderComponents/SearchUserRender";

export const RightMenu = () => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<searchedUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const searchInput = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);

  const onFocused = () => {
    setActiveSearch(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setActiveSearch(false);
    }, 150);
  };

  return (
    <div className="ml-2 mt-2 w-full lg:max-w-[350px] shrink-0">
      <div className="fixed w-full lg:max-w-[350px]">
        <header className="w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInput.current?.value) {
                navigate(
                  `/x/explore/search?title=${searchInput.current?.value}`
                );
              }
            }}
            className="flex flex-col items-center relative"
          >
            <input
              onFocus={onFocused}
              onBlur={onBlur}
              ref={searchInput}
              onInput={() =>
                sendSearchRequest({
                  debounceRef,
                  onFocused,
                  searchInput,
                  setLoading,
                  setSearchedUsers,
                })
              }
              type="text"
              placeholder="Search"
              className="searchInput border w-full p-2 pl-5 rounded-full outline-none focus:border-blue-700 border-neutral-500/50"
            />

            <SearchUserRender
              activeSearch={activeSearch}
              loading={loading}
              navigate={navigate}
              searchedUsers={searchedUsers}
            />
          </form>
        </header>

        <div className="mt-10 w-full px-5 border border-neutral-600 py-5 rounded-2xl bg-neutral-950">
          <h2 className="text-left font-bold text-2xl mb-2">
            Subscribe to Premium
          </h2>
          <p className="text-sm text-neutral-300">
            Subscribe to unlock new features and if eligible, receive a share of
            revenue.
          </p>
          <button className="bg-blue-500 mt-5 w-full px-5 py-2 hover:bg-blue-600 duration-200 rounded-full font-semibold text-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
