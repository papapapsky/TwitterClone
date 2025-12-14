import type { postsType } from "../../../../../../../../reducers/user/types/initialState";
import { Like } from "../../../assets/Like";
import { Trash } from "../../../assets/Trash";
import { UserIcon } from "../../../../../navigation/assets/UserIcon";
import { useNavigate } from "react-router";
import { useState } from "react";
import { DeletePostModal } from "../modals/DeletePostModal";
import { EditIcon } from "../../../assets/EditIcon";
import { EditPostModal } from "../modals/EditPostModal";

export const UserPostsRender = ({
  username,
  login,
  title,
  likes,
  uploadDate,
  _id,
}: postsType) => {
  const navigate = useNavigate();
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  return (
    <>
      {deleteModalVisible && (
        <DeletePostModal
          setModalVisible={setDeleteModalVisible}
          postId={String(_id)}
        />
      )}
      {editModalVisible && (
        <EditPostModal
          setModalVisible={setEditModalVisible}
          postId={_id}
          title={title}
        />
      )}
      <div
        id={`${_id}`}
        className="py-4 border-b border-neutral-800 hover:bg-neutral-900/40 duration-200 px-2"
      >
        <div className="flex w-full">
          <UserIcon classes="w-11 h-11" />
          <div className="flex justify-between w-[90%] ml-2">
            <div>
              <p className="font-semibold">{username}</p>
              <p className="text-neutral-500 text-sm">@{login}</p>
            </div>
            <div className="flex">
              <button
                className="p-3 rounded-full duration-200 hover:bg-neutral-800"
                onClick={() => setEditModalVisible(true)}
              >
                <EditIcon />
              </button>
              <button
                className="p-3 rounded-full duration-200 hover:bg-neutral-800"
                onClick={() => setDeleteModalVisible(true)}
              >
                <Trash />
              </button>
            </div>
          </div>
        </div>
        <div onClick={() => navigate(`/x/post/${_id}`)} className="pb-2 pt-3">
          <p className="text-sm ml-13 wrap-break-word">{title}</p>
        </div>
        <div className="flex ml-13 items-center justify-between">
          <span className="text-gray-500 text-[12px]">• {uploadDate}</span>
          <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 hover:bg-pink-500/20 px-3 py-1 rounded-full duration-200">
            <Like classes="fill-gray-500 hover:fill-pink-500" />
            <span className="text-gray-500">{likes}</span>
          </button>
        </div>
      </div>
    </>
  );
};
