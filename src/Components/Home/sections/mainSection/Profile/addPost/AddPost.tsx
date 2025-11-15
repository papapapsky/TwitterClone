import { createPortal } from "react-dom";
import "./modal.css";
import { Close } from "../assets/Close";
import { UserIcon } from "../../../navigation/assets/UserIcon";
import { useRef, useState } from "react";
import { addPost } from "./functions/addPost";

interface props {
  setPostAddActive: (postAddActive: boolean) => void;
}

export const AddPost = ({ setPostAddActive }: props) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: any) => {
    const textarea = e.target;
    if (textareaRef.current) {
      setText(textareaRef.current?.value);
    }
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const postAdd = async (title: string) => {
    const createPost = await addPost({ title });
    if (!createPost) {
      return;
    }
    setPostAddActive(false);
  };

  return createPortal(
    <>
      <div className="bg-gray-700/60 fixed h-lvh w-full z-20">
        <div className="p-4 modalElement top-[30%] w-[80vw] max-w-170 min-h-100 rounded-xl bg-black">
          <div className="">
            <button
              onClick={() => setPostAddActive(false)}
              className="p-1 rounded-full hover:bg-neutral-700/50 duration-200"
            >
              <Close />
            </button>
          </div>
          <div className="mt-5 min-h-60 flex gap-3 items-start">
            <UserIcon classes="w-12 h-11" />
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              className="w-full resize-none overflow-hidden text-2xl rounded-lg p-2 outline-none"
              placeholder="What`s happening?"
              maxLength={350}
            ></textarea>
          </div>
          <div>
            <hr className="border-neutral-700" />
            <div className="flex gap-5 items-center mt-5 w-full flex-row-reverse">
              <button
                onClick={() => postAdd(text)}
                disabled={text.length > 0 ? false : true}
                className="disabled:bg-white/50 rounded-full bg-white text-black px-4 mr-5 py-2 hover:bg-white/50 duration-200"
              >
                Post
              </button>
              {text.length} / 350
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("mainModal") as HTMLDivElement
  );
};
