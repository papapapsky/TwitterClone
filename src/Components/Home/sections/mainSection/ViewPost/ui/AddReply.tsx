import { useRef, useState } from "react";
import { UserIcon } from "../../../navigation/assets/UserIcon";

export const AddReply = () => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: any) => {
    const textarea = e.target;
    if (textareaRef.current) {
      setText(textareaRef.current?.value);
    }
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <div className="px-4 rounded-xl bg-black">
        <div className="mt-5 flex gap-1 items-start">
          <UserIcon classes="w-12 h-11" />
          <textarea
            defaultValue={text}
            ref={textareaRef}
            onInput={handleInput}
            className="w-full resize-none overflow-hidden text-xl rounded-lg p-2 outline-none"
            placeholder="Post your reply"
            maxLength={350}
          ></textarea>
        </div>
        <div>
          <div className="flex gap-5 items-center w-full flex-row-reverse">
            <button
              // onClick={() => postAdd(text)}
              disabled={text.length > 0 ? false : true}
              className="disabled:bg-white/50 rounded-full bg-white text-black px-4 mr-5 py-2 hover:bg-white/50 duration-200"
            >
              Reply
            </button>
            {text.length} / 350
          </div>
        </div>
      </div>
      <hr className="mt-5 border-neutral-700" />
    </>
  );
};
