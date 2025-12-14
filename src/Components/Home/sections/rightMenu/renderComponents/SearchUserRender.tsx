import type { NavigateFunction } from "react-router";
import { UserIcon } from "../../navigation/assets/UserIcon";
import type { searchedUserType } from "../types/usersType";

interface IProps {
  searchedUsers: searchedUserType[];
  activeSearch: boolean;
  navigate: NavigateFunction;
  loading: boolean;
}

export const SearchUserRender = ({
  searchedUsers,
  activeSearch,
  navigate,
  loading,
}: IProps) => {
  return (
    <>
      {searchedUsers.length && activeSearch ? (
        <div className="absolute top-full mt-1 w-full bg-black border shadow-neutral-900 shadow-2xl border-neutral-500/50 rounded-xl overflow-hidden z-10">
          {searchedUsers.map((user, index) => (
            <div
              onClick={() => navigate(`/x/profile/${user.login}`)}
              key={index}
              className="flex items-center pl-3 hover:bg-neutral-950 duration-200"
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
            <div className="pt-5 absolute top-full mt-1 w-full bg-black border border-neutral-500/50 rounded-xl overflow-hidden z-10">
              <p className="text-sm text-neutral-500 text-center mb-6">
                Try searching for people, lists, or keywords
              </p>
              {loading && (
                <div className="pb-7">
                  <div className="mx-auto w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </>
        )
      )}
    </>
  );
};
