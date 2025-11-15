import { useRef, useState } from "react";
import { UserIcon } from "../../../navigation/assets/UserIcon";
import { addPost } from "../../Profile/addPost/functions/addPost";

export const AddPost = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");

  const handleInput = (e: any) => {
    const textarea = e.target;
    if (textareaRef.current) {
      setText(textareaRef.current?.value);
    }
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const postAdd = async (title: string) => {
    console.log(title);
    const createPost = await addPost({ title });
    if (!createPost) {
      return;
    } else {
      if (textareaRef.current) {
        textareaRef.current.value = "";
      }
      setText("");
    }
  };

  return (
    <>
      <div className="px-4 rounded-xl bg-black">
        <div className="mt-5 flex gap-3 items-start">
          <UserIcon classes="w-12 h-11" />
          <textarea
            defaultValue={text}
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
      <hr className="mt-5 border-neutral-700" />
    </>
  );
};
