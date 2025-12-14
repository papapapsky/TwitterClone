import "./link.css";
import type { RootState } from "../../../../../../reducers/user/userInfo";
import type { searchedUserType } from "../../../rightMenu/types/usersType";
import type { postsType } from "../../../../../../reducers/user/types/initialState";
import { useEffect, useRef, useState } from "react";
import { SettingsIcon } from "../assets/SettingsIcon";
import { useSelector } from "react-redux";
import { sendSearchRequest } from "../../../rightMenu/functions/sendSearchRequest";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { SearchUserRender } from "../../../rightMenu/renderComponents/SearchUserRender";
import { PostsRender } from "../../renderTemplates/Posts/PostsRender";
import { UserIcon } from "../../../navigation/assets/UserIcon";
import { onSearchPageLoad } from "./functions/onLoad";
import { SearchPageSkeleton } from "../../../../skeleton/SearchPageSkeleton";

export interface IisFindInfo {
  profiles: boolean;
  posts: boolean;
}

export const SearchPage = () => {
  const [posts, setPosts] = useState<postsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<searchedUserType[]>([]);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [linkParams] = useSearchParams();
  const [isFindInfo, setIsFindInfo] = useState<IisFindInfo>({
    profiles: false,
    posts: false,
  });
  const link = useLocation();
  const searchInput = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const loadingSelector = useSelector((state: RootState) => state.loading);
  const userInfoSelector = useSelector((state: RootState) => state.userInfo);

  const onFocused = () => {
    setActiveSearch(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setActiveSearch(false);
    }, 150);
  };

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.defaultValue = linkParams.get("title") ?? "";
    }
    onSearchPageLoad({
      linkParams,
      setIsFindInfo: setIsFindInfo,
      setPosts,
      setSearchedUsers,
      userInfoSelector,
    });
  }, [userInfoSelector.login, linkParams]);

  const categoryNavigate = (category: string): string => {
    linkParams.append("f", category);
    return `${link.pathname}?title=${linkParams.get("title")}&f=${category}`;
  };

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700">
        <header className="w-full flex sticky flex-col top-0 bg-black/80 backdrop-blur-md z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInput.current?.value) {
                searchInput.current.blur();
                navigate(
                  `/x/explore/search?title=${searchInput.current?.value}`
                );
              }
            }}
            className="h-15 w-full flex justify-around items-center"
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
              className="focus:border-blue-500 h-11 text-sm px-7 w-[80%] border rounded-full outline-none border-neutral-700"
            />

            <div className="p-2 hover:bg-neutral-900 rounded-full duration-200">
              <SettingsIcon />
            </div>
          </form>
          <SearchUserRender
            activeSearch={activeSearch}
            loading={loading}
            navigate={navigate}
            searchedUsers={searchedUsers ?? []}
          />
        </header>
        <div className="flex items-center border-b border-neutral-700 text-center">
          <Link
            to={categoryNavigate("All")}
            className={`w-full hover:bg-neutral-800 duration-200 h-full py-5 ${
              linkParams.get("f") === "All"
                ? "categoryActive"
                : "categoryInactive"
            }`}
          >
            <h1 className="text-sm font-semibold">All</h1>
          </Link>
          <Link
            className={`w-full hover:bg-neutral-800 duration-200 h-full py-5 ${
              linkParams.get("f") === "Posts"
                ? "categoryActive"
                : "categoryInactive"
            }`}
            to={categoryNavigate("Posts")}
          >
            <h1 className="text-sm font-semibold text-neutral-500">Posts</h1>
          </Link>
          <Link
            className={`w-full hover:bg-neutral-800 duration-200 h-full py-5 ${
              linkParams.get("f") === "People"
                ? "categoryActive"
                : "categoryInactive"
            }`}
            to={categoryNavigate("People")}
          >
            <h1 className="text-sm font-semibold text-neutral-500">People</h1>
          </Link>
        </div>
        {!loadingSelector.loading ? (
          <>
            {posts && posts.length > 0
              ? posts.map((post, i) => (
                  <div key={i}>
                    <PostsRender
                      comments={post.comments}
                      _id={post._id}
                      i={i}
                      likes={post.likes}
                      login={post.login}
                      title={post.title}
                      uploadDate={post.uploadDate}
                      username={post.username}
                    />
                  </div>
                ))
              : !isFindInfo.posts && (
                  <h1 className="text-center text-2xl mt-5 w-full text-gray-500">
                    No posts found for the current query
                  </h1>
                )}

            {searchedUsers && searchedUsers.length > 0 && (
              <div className="flex gap-5 px-10 justify-evenly flex-wrap w-full">
                {searchedUsers.map(({ login, username }, index) => (
                  <Link
                    to={`/x/profile/${login}`}
                    key={index}
                    className="hover:bg-neutral-950 flex flex-col items-center max-w-30 min-w-40 py-3 rounded-xl duration-200"
                  >
                    <div>
                      <UserIcon classes="w-20 h-20 mx-auto" />
                      <div className="mt-2 text-center">
                        <h2 className="font-semibold">{username}</h2>
                        <h2 className="text-gray-500">@{login}</h2>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!isFindInfo.profiles && !isFindInfo.posts && (
              <div className="mt-5 w-4/5 mx-auto text-neutral-700">
                <hr />
              </div>
            )}
            {!isFindInfo.profiles && (
              <h1 className="text-center text-2xl mt-5 w-full text-gray-600">
                No profiles found for the current query
              </h1>
            )}
          </>
        ) : (
          <SearchPageSkeleton />
        )}
      </div>
    </>
  );
};
