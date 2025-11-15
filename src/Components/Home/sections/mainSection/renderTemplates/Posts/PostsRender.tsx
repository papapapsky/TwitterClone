import { Link } from "react-router";
import { UserIcon } from "../../../navigation/assets/UserIcon";
import { Like } from "../../Profile/assets/Like";
import type { postsType } from "../../../../../../reducers/user/types/initialState";

interface IProps extends postsType {
  i: number;
}

export const PostsRender = ({
  _id,
  i,
  login,
  username,
  title,
  uploadDate,
  likes,
}: IProps) => {
  return (
    <div
      key={i}
      id={`${_id}`}
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

      <p className="text-sm ml-13 wrap-break-word">{title}</p>

      <div className="flex items-center justify-between mt-3 ml-13">
        <p className="text-xs text-neutral-500">• {uploadDate}</p>
        <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 hover:bg-pink-500/20 px-3 py-1 rounded-full duration-200">
          <Like classes="fill-gray-500 hover:fill-pink-500" />
          <span className="text-sm">{likes}</span>
        </button>
      </div>
    </div>
  );
};
