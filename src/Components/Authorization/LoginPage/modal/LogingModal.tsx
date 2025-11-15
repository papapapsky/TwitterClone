import { createPortal } from "react-dom";

export const LoginModal = () => {
  return (
    <>
      {createPortal(
        <>
          <div className="loader z-30"></div>
          <div className="regModal absolute h-lvh w-full z-20"></div>
        </>,
        document.getElementById("loginModal") as HTMLDivElement
      )}
    </>
  );
};
