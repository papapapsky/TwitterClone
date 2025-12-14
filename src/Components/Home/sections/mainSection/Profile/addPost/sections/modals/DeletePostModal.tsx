import { createPortal } from "react-dom";
import Xicon from "../../../../../../../assets/Xicon.png";
import { deletePost } from "../../functions/deletePost";
import { store } from "../../../../../../../../store";
import type { NavigateFunction } from "react-router";

interface IProps {
  setModalVisible: (modalVisible: boolean) => void;
  postId: string;
  navigate?: NavigateFunction;
}

export const DeletePostModal = ({
  setModalVisible,
  postId,
  navigate,
}: IProps) => {
  return createPortal(
    <div className="fixed w-full h-lvh bg-black/50 z-10">
      <div className="modalElement top-[50%] max-w-120 min-w-80 py-5 px-10 bg-neutral-950 rounded-xl">
        <img src={Xicon} alt="" className="invert w-10 block mx-auto" />
        <div className="mt-5">
          <h2 className="text-xl font-bold">
            Do you really want to delete your post?
          </h2>
          <p className="text-gray-500 mt-2">this is an irreversible action</p>
          <div className="flex flex-col gap-y-5 my-5">
            <button
              onClick={async () => {
                await deletePost(postId);
                const prevPage = store.getState().prevPage.page;
                if (navigate) navigate(prevPage);
                setModalVisible(false);
              }}
              className="bg-red-600 p-3 rounded-full font-semibold hover:bg-red-800 duration-200"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setModalVisible(false);
              }}
              className="hover:bg-neutral-900 border border-gray-500 duration-200 bg-black px-10 py-3 rounded-full font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("mainModal") as HTMLDivElement
  );
};
