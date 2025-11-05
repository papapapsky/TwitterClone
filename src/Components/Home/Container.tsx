import { Navigation } from "./sections/navigation/Navigation";
import { MainSection } from "./sections/mainSection/MainSection";
import { RightMenu } from "./sections/rightMenu/RightMenu";
import { useSelector } from "react-redux";
import type { RootState } from "../../reducers/user/userInfo";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Container = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const errorSelector = useSelector((state: RootState) => state.error);

  useEffect(() => {
    if (errorSelector.show) {
      setErrorMessage(errorSelector.error);
      setRender(true);
      setVisible(true);

      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [errorSelector.error]);

  useEffect(() => {
    if (!visible && render) {
      const removeTimer = setTimeout(() => {
        setRender(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }
  }, [visible, render]);

  return (
    <div className="container flex gap-3 relative justify-center">
      {render &&
        createPortal(
          <div
            className={`z-50 fixed top-5 left-1/2 -translate-x-1/2 bg-black border-2 text-red-500 px-6 py-4 rounded-md shadow-lg transition-all duration-500 ${
              visible
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0"
            }`}
          >
            {errorMessage}
          </div>,
          document.getElementById("errorModal") as HTMLDivElement
        )}
      <Navigation />
      <MainSection />
      <div className="desktop-only">
        <RightMenu />
      </div>
    </div>
  );
};
