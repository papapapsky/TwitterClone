import type { postsType } from "../../../../../reducers/user/types/initialState";
import type { RootState } from "../../../../../reducers/user/userInfo";
import { sendSearchRequest } from "../../rightMenu/functions/sendSearchRequest";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { SettingsIcon } from "./assets/SettingsIcon";
import { getPosts } from "../Home/functions/getPosts";
import { PostsRender } from "../renderTemplates/Posts/PostsRender";
import { ShowProfiles } from "./renderComponents/ShowProfiles";
import { useSelector } from "react-redux";
import type { searchedUserType } from "../../rightMenu/types/usersType";
import { SearchUserRender } from "../../rightMenu/renderComponents/SearchUserRender";
import { SearchPageSkeleton } from "../../../skeleton/SearchPageSkeleton";

export const Explore = () => {
  const loadingSelector = useSelector((state: RootState) => state.loading);
  const userInfoSelector = useSelector((state: RootState) => state.userInfo);
  const [posts, setPosts] = useState<postsType[]>([]);
  const searchInput = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);
  const [searchedUsers, setSearchedUsers] = useState<searchedUserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);

  const showPosts = () => {
    const page = posts.length;
    const exceptionUser = userInfoSelector.login;
    getPosts({ setPosts, exceptionUser, posts, page });
  };

  const onFocused = () => {
    setActiveSearch(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setActiveSearch(false);
    }, 150);
  };

  useEffect(() => {
    if (userInfoSelector.login) {
      showPosts();
    }
  }, [userInfoSelector]);

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700">
        <header className="w-full flex sticky flex-col top-0 bg-black/80 backdrop-blur-md z-10">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (searchInput.current?.value) {
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
            searchedUsers={searchedUsers}
          />
        </header>
        <div className="flex mt-2 items-center border-b border-neutral-700">
          <button className="w-full hover:bg-neutral-800 duration-200 h-full relative py-5">
            <h1 className="text-sm font-semibold">For you</h1>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <div className="w-1/2 h-[4px] bg-blue-500 rounded-full"></div>
            </div>
          </button>
          <button className="w-full hover:bg-neutral-800 duration-200 h-full py-5">
            <h1 className="text-sm font-semibold text-neutral-500">Trending</h1>
          </button>
          <button className="w-full hover:bg-neutral-800 duration-200 h-full py-5">
            <h1 className="text-sm font-semibold text-neutral-500">News</h1>
          </button>
          <button className="w-full hover:bg-neutral-800 duration-200 h-full py-5">
            <h1 className="text-sm font-semibold text-neutral-500">Sports</h1>
          </button>
          <button className="w-full hover:bg-neutral-800 duration-200 h-full py-5">
            <h1 className="text-sm font-semibold text-neutral-500">
              Entertainment
            </h1>
          </button>
        </div>
        {!loadingSelector.loading ? (
          <>
            <div className="flex flex-col-reverse">
              {posts.length > 0 &&
                posts.map(
                  (
                    {
                      title,
                      likes,
                      username,
                      comments,
                      login,
                      uploadDate,
                      _id,
                    },
                    i
                  ) => (
                    <div key={i}>
                      <PostsRender
                        comments={comments}
                        title={title}
                        likes={likes}
                        username={username}
                        login={login}
                        uploadDate={uploadDate}
                        i={i}
                        _id={_id}
                      />
                    </div>
                  )
                )}
            </div>
            <hr className="border-neutral-800" />
            <div className="mt-5">
              <h1 className="text-center text-2xl font-semibold">
                Recommended profiles
              </h1>
              <div className="pb-40">
                <ShowProfiles />
              </div>
            </div>
          </>
        ) : (
          <SearchPageSkeleton />
        )}
      </div>
    </>
  );
};
