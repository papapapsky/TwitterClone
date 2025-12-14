import { Like } from "../Profile/assets/Like";
import { Arrow } from "../Profile/assets/Arrow";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../reducers/user/userInfo";
import { useNavigate, useParams, type Params } from "react-router";
import { getPostById } from "./functions/getPostById";
import { useEffect, useState } from "react";
import type { postsType } from "../../../../../reducers/user/types/initialState";
import { Link } from "react-router";
import { UserIcon } from "../../navigation/assets/UserIcon";
import { AddReply } from "./ui/AddReply";
import { Trash } from "../Profile/assets/Trash";
import { DeletePostModal } from "../Profile/addPost/sections/modals/DeletePostModal";
import { store } from "../../../../../store";
import { EditPostModal } from "../Profile/addPost/sections/modals/EditPostModal";
import { EditIcon } from "../Profile/assets/EditIcon";

interface ILinkParams extends Params {
  id: string;
}

export const ViewPost = () => {
  const [post, setPost] = useState<postsType>();
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams<ILinkParams>();
  const prevLinkSelector = useSelector(
    (state: RootState) => state.prevPage.page
  );

  useEffect(() => {
    if (params.id) {
      getPostById({ postId: params.id, setPost });
    }
  }, []);

  return (
    <>
      {deleteModalVisible && (
        <DeletePostModal
          navigate={navigate}
          postId={post?._id ?? ""}
          setModalVisible={setDeleteModalVisible}
        />
      )}
      {editModalVisible && (
        <EditPostModal
          navigate={navigate}
          postId={post?._id ?? ""}
          setModalVisible={setEditModalVisible}
          title={post?.title ?? ""}
        />
      )}
      <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700">
        <header className="h-14 w-full flex items-center px-4 bg-black/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex gap-5 items-center">
            <button
              onClick={() => navigate(prevLinkSelector ?? "/x/home")}
              className="p-2 hover:bg-neutral-800 duration-200 rounded-full mr-4"
            >
              <Arrow />
            </button>
            <h1 className="font-semibold text-xl">Post</h1>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-lg"></h2>
          </div>
        </header>
        <div className="mx-5 mt-2">
          {post && (
            <>
              <div id={post._id}>
                <div className="flex items-center justify-between">
                  <Link
                    to={`/x/profile/${post.login}`}
                    className="flex items-center gap-2 mb-2 cursor-pointer"
                  >
                    <UserIcon classes="w-11 h-11" />
                    <div>
                      <p className="font-semibold hover:underline">
                        {post.username}
                      </p>
                      <p className="text-neutral-500 text-sm">@{post.login}</p>
                    </div>
                  </Link>
                  {store
                    .getState()
                    .userInfo.posts.some((item) => item._id === post._id) && (
                    <div>
                      <button
                        onClick={() => {
                          setEditModalVisible(true);
                        }}
                        className="p-2 rounded-full duration-200 hover:bg-neutral-800"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteModalVisible(true);
                        }}
                        className="p-2 rounded-full duration-200 hover:bg-neutral-800"
                      >
                        <Trash />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-lg ml-13 wrap-break-word">{post.title}</p>
                <div className="flex items-center justify-between ml-13">
                  <p className="text-sm text-neutral-500">
                    • {post.uploadDate}
                  </p>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 hover:bg-pink-500/20 px-3 py-1 rounded-full duration-200">
                    <Like classes="fill-gray-500 hover:fill-pink-500" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                </div>
              </div>
              <hr className="mt-3 border-neutral-700" />
              <AddReply />
            </>
          )}
        </div>
      </div>
    </>
  );
};
