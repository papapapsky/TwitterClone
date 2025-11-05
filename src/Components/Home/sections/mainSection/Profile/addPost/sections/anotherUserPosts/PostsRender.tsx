import { UserIcon } from "../../../../../navigation/assets/UserIcon";
import { Like } from "../../../assets/Like";

export interface IPostsProps {
  username: string;
  login: string;
  title: string;
  likes: number;
}

export const AnotherUserPostsRender = ({
  username,
  login,
  title,
  likes,
}: IPostsProps) => {
  return (
    <div className="py-4 border-b border-neutral-800 hover:bg-neutral-900/40 duration-200 px-2">
      <div className="flex gap-2">
        <UserIcon classes="w-11 h-11" />
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-neutral-500 text-sm">@{login}</p>
        </div>
      </div>
      <p className="text-sm ml-14 mt-2 mb-2 wrap-break-word">{title}</p>
      <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 hover:bg-pink-500/20 px-3 py-1 rounded-full duration-200 ml-12">
        <Like classes="fill-gray-500 hover:fill-pink-500" />
        <span>{likes}</span>
      </button>
    </div>
  );
};
