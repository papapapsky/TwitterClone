import type { searchedUserType } from "./types/usersType";
import { useRef, useState } from "react";
import { searchUsers } from "./functions/searchUsers";
import { UserIcon } from "../navigation/assets/UserIcon";
import { useNavigate } from "react-router";

export const RightMenu = () => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<searchedUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const onFocused = () => {
    setActiveSearch(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setActiveSearch(false);
    }, 150);
  };

  const sendSearchRequest = () => {
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

  return (
    <div className="ml-2 mt-2 w-full lg:max-w-[350px] shrink-0">
      <div className="fixed w-full lg:max-w-[350px]">
        <header className="w-full">
          <div className="flex flex-col items-center relative">
            <input
              onFocus={onFocused}
              onBlur={onBlur}
              ref={searchInput}
              onInput={sendSearchRequest}
              type="text"
              placeholder="Search"
              className="searchInput border w-full p-2 pl-5 rounded-full outline-none focus:border-blue-700 border-neutral-500/50"
            />

            {searchedUsers.length > 0 && activeSearch ? (
              <div className="absolute top-full mt-1 w-full bg-black border border-neutral-500/50 rounded-xl overflow-hidden z-10">
                {searchedUsers.map((user, index) => (
                  <div
                    onClick={() => navigate(`/x/profile/${user.login}`)}
                    key={index}
                    className="flex items-center pl-3 hover:bg-neutral-800"
                  >
                    <UserIcon classes="" />
                    <div
                      key={index}
                      className="border-b border-neutral-700 px-3 py-2 cursor-pointer"
                    >
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-neutral-400 text-sm">@{user.login}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              activeSearch && (
                <>
                  <div className="pt-5 pb-9 absolute top-full mt-1 w-full bg-black border border-neutral-500/50 rounded-xl overflow-hidden z-10">
                    <p className="text-sm text-neutral-500 text-center mb-6">
                      Try searching for people, lists, or keywords
                    </p>
                    {loading && (
                      <div className="mx-auto w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
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
