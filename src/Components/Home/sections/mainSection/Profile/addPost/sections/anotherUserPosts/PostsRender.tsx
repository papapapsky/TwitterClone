import { UserIcon } from "../../../../../navigation/assets/UserIcon";
import { Like } from "../../../assets/Like";
import type { postsType } from "../../../../../../../../reducers/user/types/initialState";
import { useNavigate } from "react-router";

export const AnotherUserPostsRender = ({
  username,
  login,
  title,
  likes,
  uploadDate,
  _id,
}: postsType) => {
  const navigate = useNavigate();

  return (
    <div
      id={`${_id}`}
      className="py-4 border-b border-neutral-800 hover:bg-neutral-900/40 duration-200 px-2"
    >
      <div className="flex gap-2">
        <UserIcon classes="w-11 h-11" />
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-neutral-500 text-sm">@{login}</p>
        </div>
      </div>
      <div onClick={() => navigate(`/x/post/${_id}`)} className="py-2">
        <p className="text-sm ml-13 wrap-break-word">{title}</p>
      </div>
      <div className="flex ml-13 justify-between items-center">
        <span className="text-gray-500 text-[12px]">• {uploadDate}</span>
        <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 hover:bg-pink-500/20 px-3 py-1 rounded-full duration-200">
          <Like classes="fill-gray-500 hover:fill-pink-500" />
          <span className="text-gray-500">{likes}</span>
        </button>
      </div>
    </div>
  );
};
