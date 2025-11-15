import { useRef, createRef, useState, useEffect } from "react";
import { sendCode } from "./confirmLogic/sendCode";
import { store } from "../../../store";
import { useNavigate } from "react-router";
import type { IUnregisteredUser } from "../../../reducers/unregisteredUser/unregisteredUser";

const inputs = Array.from({ length: 6 }, (_, id) => id);

export const EmailConfirm = () => {
  const navigate = useNavigate();
  const [storageUserState, setStorageUserState] = useState<IUnregisteredUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef(inputs.map(() => createRef<HTMLInputElement>()));

  const handleInput = (index: number) => {
    const value = inputRefs.current[index].current?.value ?? "";
    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (
      event.key === "Backspace" &&
      !inputRefs.current[index].current?.value &&
      index > 0
    ) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const handleClick = () => {
    const storeUser: IUnregisteredUser | null =
      store.getState().unregisteredUser;

    let unregisteredUser: IUnregisteredUser | null;
    if (storeUser.login) {
      unregisteredUser = storeUser;
    } else {
      unregisteredUser = storageUserState ?? null;
    }
    if (!unregisteredUser) return;

    let verificationCode = "";
    inputRefs.current.forEach((item) => {
      if (item.current) {
        verificationCode += item.current.value;
      }
    });

    sendCode({
      navigate,
      setLoading,
      code: verificationCode,
      user: unregisteredUser,
    });
  };

  useEffect(() => {
    const storageUserStr = localStorage.getItem("unregisteredUser");
    const storageUser: IUnregisteredUser | null = storageUserStr
      ? JSON.parse(storageUserStr)
      : null;
    if (storageUser) setStorageUserState(storageUser);
  }, []);

  return (
    <>
      {loading && <div className="loader"></div>}
      <div className="flex w-full flex-col items-center justify-center mt-25 font-semibold">
        <h1 className="text-3xl">Please, confirm your email</h1>
        <h2 className="text-neutral-500 mt-2">
          We have sent a confirmation code to{" "}
          {store.getState().unregisteredUser.email ?? storageUserState?.email},
          please enter it below.
        </h2>
        <div className="flex mt-5 gap-5">
          {inputs.map((_, index) => (
            <input
              key={index}
              ref={inputRefs.current[index]}
              onInput={() => handleInput(index)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              type="text"
              className="uppercase p-3 w-15 border-2 text-center text-3xl rounded-2xl"
              maxLength={1}
            />
          ))}
        </div>
        <div>
          <button
            onClick={() => handleClick()}
            className="mt-5 px-10 py-3 rounded-full bg-white text-black text-lg hover:bg-white/80 duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
