import { createPortal } from "react-dom";
import { Close } from "../assets/Close";
import { changeProfileInfo } from "./functions/changeUserProfile";
import { useState, useRef } from "react";

interface props {
  setChangeProfile: (changeProfile: boolean) => void;
}

export const SetUpProfile = ({ setChangeProfile }: props) => {
  const [biographyText, setBiographyText] = useState<string>("");
  const [usernameText, setUsernameText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const biographyAreaRef = useRef<HTMLTextAreaElement>(null);
  const usernameAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: any) => {
    const textarea = e.target;
    if (biographyAreaRef.current) {
      setBiographyText(biographyAreaRef.current?.value);
    }
    if (usernameAreaRef.current) {
      setUsernameText(usernameAreaRef.current?.value);
    }
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const changeInfo = () => {
    const biography = biographyText;
    const username = usernameText;

    changeProfileInfo({
      setLoading,
      biography,
      username,
      setActive: setChangeProfile,
    });
  };

  return createPortal(
    <div className="bg-gray-700/60 fixed h-lvh w-full z-20">
      {loading && (
        <div className="p-4 modalElement top-[50%] w-170 min-h-90 rounded-xl bg-black/50 z-20">
          <div className="loader"></div>
        </div>
      )}
      <div className="p-4 modalElement w-170 top-[50%] rounded-xl bg-black">
        <div className="">
          <button
            onClick={() => setChangeProfile(false)}
            className="p-1 rounded-full hover:bg-neutral-700/50 duration-200"
          >
            <Close />
          </button>
        </div>
        <div className="mt-5 flex gap-3 items-baseline">
          <h2 className="mt-1.5 text-xl border border-neutral-700 p-2 rounded-full">
            Username
          </h2>
          <textarea
            ref={usernameAreaRef}
            onInput={handleInput}
            className="w-full resize-none overflow-hidden text-xl rounded-lg p-2 outline-none"
            placeholder="Write your new username"
            maxLength={20}
          ></textarea>
        </div>
        <h2 className="text-right">{usernameText.length} / 20</h2>
        <div className="mt-5 flex gap-3 items-baseline">
          <h2 className="mt-1.5 text-xl bg-green-800 p-2 rounded-full">
            Biography
          </h2>
          <textarea
            ref={biographyAreaRef}
            onInput={handleInput}
            className="w-full resize-none overflow-hidden text-xl rounded-lg p-2 outline-none"
            placeholder="Write your bio"
            maxLength={200}
          ></textarea>
        </div>
        <h2 className="text-right">{biographyText.length} / 200</h2>
        <div>
          <hr className="border-neutral-700" />
          <div className="flex gap-5 items-center mt-5 w-full flex-row-reverse">
            <button
              onClick={() => changeInfo()}
              className="rounded-full font-semibold bg-blue-500 px-4 py-2 hover:bg-blue-600 duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("mainModal") as HTMLDivElement
  );
};
