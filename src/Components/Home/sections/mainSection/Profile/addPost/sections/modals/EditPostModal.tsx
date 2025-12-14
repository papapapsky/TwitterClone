import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { UserIcon } from "../../../../../navigation/assets/UserIcon";
import { Close } from "../../../assets/Close";
import { editPost } from "../../functions/editPost";
import { store } from "../../../../../../../../store";
import { setLoadingState } from "../../../../../../../../reducers/status/loading";
import type { NavigateFunction } from "react-router";

interface IProps {
  setModalVisible: (modalVisible: boolean) => void;
  title: string;
  postId: string;
  navigate?: NavigateFunction;
}

export const EditPostModal = ({
  setModalVisible,
  postId,
  title,
  navigate,
}: IProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>(title);

  const handleInput = (e: any) => {
    const textarea = e.target;
    setText(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return createPortal(
    <div className="bg-gray-700/60 fixed h-lvh w-full z-20">
      <div className="p-4 modalElement top-[30%] w-[80vw] max-w-170 min-h-100 rounded-xl bg-black">
        <div>
          <button
            onClick={() => setModalVisible(false)}
            className="p-1 rounded-full hover:bg-neutral-700/50 duration-200"
          >
            <Close />
          </button>
        </div>
        <h2 className="text-2xl mt-2 font-semibold text-center">Editing</h2>
        <div className="mt-5 min-h-60 flex gap-3 items-start">
          <UserIcon classes="w-12 h-11" />
          <textarea
            defaultValue={text}
            ref={textareaRef}
            onInput={handleInput}
            className="w-full resize-none overflow-hidden text-2xl rounded-lg p-2 outline-none"
            placeholder="Edit your post..."
            maxLength={350}
          ></textarea>
        </div>

        <div>
          <hr className="border-neutral-700" />

          <div className="flex gap-5 items-center mt-5 w-full flex-row-reverse">
            <button
              onClick={async () => {
                store.dispatch(setLoadingState({ loading: true }));
                await editPost({ postId, title: text });
                if (navigate) navigate(store.getState().prevPage.page);
                store.dispatch(setLoadingState({ loading: false }));
                setModalVisible(false);
              }}
              disabled={text.length === 0}
              className="disabled:bg-white/50 rounded-full bg-white text-black px-4 mr-5 py-2 hover:bg-white/50 duration-200"
            >
              Save
            </button>
            {text.length} / 350
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("mainModal") as HTMLDivElement
  );
};
