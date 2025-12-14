import { useEffect, useState } from "react";
import { getPosts } from "./functions/getPosts";
import { AddPost } from "./sections/AddPost";
import type { postsType } from "../../../../../reducers/user/types/initialState";
import { PostsRender } from "../renderTemplates/Posts/PostsRender";
import { NavLink, useLocation } from "react-router";
import { getFollowingPosts } from "./functions/getFollowingPosts";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../reducers/user/userInfo";
import { HomeSkeleton } from "../../../skeleton/HomeSkeleton";

export const Home = () => {
  const [posts, setPosts] = useState<postsType[]>([]);
  const [followingPosts, setFollowingPosts] = useState<postsType[]>([]);
  const [following, setFollowing] = useState<boolean>(false);
  const location = useLocation();
  const loadingSelector = useSelector((state: RootState) => state.loading);

  const showPosts = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("following");
    if (param) {
      setFollowing(true);
      const alredyChecked = followingPosts.length;
      getFollowingPosts({ alredyChecked, setFollowingPosts, followingPosts });
    } else {
      setFollowing(false);
      const page = posts.length;
      console.log(page);
      getPosts({ setPosts, posts, page });
    }
  };

  useEffect(() => {
    showPosts();
  }, [location]);

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700">
        <header className="h-12 w-full flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-neutral-700">
          <NavLink
            to="/x/home"
            className="w-full hover:bg-neutral-800 duration-200 h-full relative"
          >
            <h1 className="text-sm text-center font-semibold relative top-[25%]">
              For you
            </h1>
            {!following && (
              <div className="relative top-[50%] flex justify-center">
                <div className="w-1/4 h-[3px] bg-blue-500 rounded-full"></div>
              </div>
            )}
          </NavLink>
          <NavLink
            to="/x/home?following=t"
            className="w-full hover:bg-neutral-800 duration-200 h-full"
          >
            <h1 className="text-sm text-center font-semibold relative top-[25%]">
              Following
            </h1>
            {following && (
              <div className="relative top-[50%] flex justify-center">
                <div className="w-1/4 h-[3px] bg-blue-500 rounded-full"></div>
              </div>
            )}
          </NavLink>
        </header>
        <AddPost />
        {!loadingSelector.loading ? (
          <div className="flex flex-col-reverse">
            {!following
              ? posts.length > 0 &&
                posts.map(
                  (
                    {
                      title,
                      likes,
                      comments,
                      username,
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
                )
              : followingPosts.length > 0 &&
                followingPosts.map(
                  (
                    {
                      title,
                      likes,
                      comments,
                      username,
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
        ) : (
          <HomeSkeleton />
        )}
        <div className="flex justify-center py-5">
          <button
            onClick={showPosts}
            className="bg-blue-500 hover:bg-blue-600 duration-200 px-6 py-2 rounded-full font-semibold"
          >
            Show more
          </button>
        </div>
      </div>
    </>
  );
};
