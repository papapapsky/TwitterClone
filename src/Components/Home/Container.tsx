import { Navigation } from "./sections/navigation/Navigation";
import { MainSection } from "./sections/mainSection/MainSection";
import { RightMenu } from "./sections/rightMenu/RightMenu";
import { useSelector } from "react-redux";
import type { RootState } from "../../reducers/user/userInfo";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { store } from "../../store";
import { setPrevPage } from "../../reducers/pages/prevPage";

export const Container = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const loadingSelector = useSelector((state: RootState) => state.loading);
  const errorSelector = useSelector((state: RootState) => state.error);
  const prevLocationRef = useRef<string>("/x/home");

  useEffect(() => {
    store.dispatch(setPrevPage({ page: prevLocationRef.current }));
    prevLocationRef.current = location.pathname;
  }, [location]);

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
    <>
      {loadingSelector.loading && (
        <div className="fixed bg-black/50 z-50 inset-0">
          <div className="loader border-4 border-white/30 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
        </div>
      )}
      <div className="container flex gap-4 relative justify-center">
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
    </>
  );
};
