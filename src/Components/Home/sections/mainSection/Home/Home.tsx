import { useEffect, useState } from "react";
import { getPosts } from "./functions/getPosts";
import { UserIcon } from "../../navigation/assets/UserIcon";
import { Like } from "../Profile/assets/Like";
import { Link } from "react-router";
import { AddPost } from "./sections/AddPost";

export interface IPost {
  uploadDate: string;
  title: string;
  _id: string;
  likes: number;
  username: string;
  login: string;
  comments: [];
}

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  const showPosts = () => {
    const page = posts.length;
    getPosts({ setPosts, setLoading, posts, page });
  };

  useEffect(() => {
    showPosts();
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="loader border-4 border-white/30 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}
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
        <AddPost setLoading={setLoading} />

        <div className="flex flex-col-reverse">
          {posts.length > 0 &&
            posts.map(({ title, likes, username, login, uploadDate }, i) => (
              <div
                key={i}
                className="border-b border-neutral-800 py-4 px-3 hover:bg-neutral-900/40 duration-200"
              >
                <Link
                  to={`/x/profile/${login}`}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <UserIcon classes="w-11 h-11" />
                  <div>
                    <p className="font-semibold">{username}</p>
                    <p className="text-neutral-500 text-sm">@{login}</p>
                  </div>
                </Link>

                <p className="text-sm ml-14 wrap-break-word">{title}</p>

                <div className="flex items-center justify-between mt-3 ml-14">
                  <p className="text-xs text-neutral-500">• {uploadDate}</p>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 hover:bg-pink-500/20 px-3 py-1 rounded-full duration-200">
                    <Like classes="fill-gray-500 hover:fill-pink-500" />
                    <span className="text-sm">{likes}</span>
                  </button>
                </div>
              </div>
            ))}
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
