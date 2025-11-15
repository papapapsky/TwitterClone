import { useEffect, useState } from "react";
import { getPosts } from "./functions/getPosts";
import { AddPost } from "./sections/AddPost";
import type { postsType } from "../../../../../reducers/user/types/initialState";
import { PostsRender } from "../renderTemplates/Posts/PostsRender";

export const Home = () => {
  const [posts, setPosts] = useState<postsType[]>([]);

  const showPosts = () => {
    const page = posts.length;
    getPosts({ setPosts, posts, page });
  };

  useEffect(() => {
    showPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700">
        <header className="h-12 w-full flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-neutral-700">
          <button className="w-full hover:bg-neutral-800 duration-200 h-full relative">
            <h1 className="text-sm font-semibold">For you</h1>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              <div className="w-1/4 h-[3px] bg-blue-500 rounded-full"></div>
            </div>
          </button>
          <button className="w-full hover:bg-neutral-800 duration-200 h-full">
            <h1 className="text-sm font-semibold">Following</h1>
          </button>
        </header>
        <AddPost />

        <div className="flex flex-col-reverse">
          {posts.length > 0 &&
            posts.map(
              ({ title, likes, username, login, uploadDate, _id }, i) => (
                <div key={i}>
                  <PostsRender
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
