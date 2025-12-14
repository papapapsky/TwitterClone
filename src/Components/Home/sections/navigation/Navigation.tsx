import {
  navigationSections,
  type INavigationSections,
} from "./functions/navigationSections";
import "./navigation.css";
import Xicon from "../../../assets/Xicon.png";
import { NavLink, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Activity } from "react";
import { UserIcon } from "./assets/UserIcon";
import { Ellipsis } from "./assets/Ellipsis";
import { store } from "../../../../store";
import { AddPost } from "../mainSection/Profile/addPost/AddPost";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../reducers/user/userInfo";
import { FeatherIcon } from "./assets/FeatherIcon";
import { UserFeatures } from "./ui/UserFeatures";
import type { IUser } from "../../../../reducers/user/types/initialState";
import { LogoutModal } from "./ui/LogoutModal";

export const Navigation = () => {
  const userInfoSelector = useSelector((state: RootState) => state.userInfo);
  const [sections, setSections] = useState<INavigationSections[]>([]);
  const [userInfo, setUserInfo] = useState<IUser>(store.getState().userInfo);
  const [postAddActive, setPostAddActive] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const userBoxRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const clickOutside = (e: MouseEvent) => {
    if (
      userBoxRef.current &&
      !userBoxRef.current.contains(e.target as Node) &&
      featuresRef.current &&
      !featuresRef.current.contains(e.target as Node)
    ) {
      featuresRef.current.classList.add("userFeaturesHide");
      setTimeout(() => {
        if (featuresRef.current)
          featuresRef.current.classList.remove("userFeaturesHide");

        setVisible(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  useEffect(() => {
    navigationSections({ setSections, setUserInfo });
  }, []);

  return (
    <div className="navigateSection text-left w-55 h-lvh advanced-container select-none">
      {modalVisible && <LogoutModal setModalVisible={setModalVisible} />}
      {postAddActive && <AddPost setPostAddActive={setPostAddActive} />}
      <header className="mb-3 fixed">
        <button className="p-3 rounded-[100px] hover:bg-neutral-800 mt-1 duration-300">
          <Link to="/x/home">
            <img src={Xicon} alt="" className="invert w-[25px]" />
          </Link>
        </button>
      </header>
      <div className="fixed mt-18">
        {sections.map(({ link, svg: Svg, title }, index) => (
          <div className="flex" key={index}>
            <NavLink
              to={link}
              className="text-xl mb-3.5 font-semibold flex items-center w-full linkButton"
            >
              <button className="linkButton flex w-full items-end gap-4 pl-2 pr-7 hover:bg-neutral-800 duration-300 p-2 rounded-[100px]">
                <Svg />
                <span className="mb-1 linkSpan">{title}</span>
              </button>
            </NavLink>
          </div>
        ))}
        <div className="mt-5">
          <button
            className="white-link-btn w-full advanced-btn p-0"
            onClick={() => setPostAddActive(true)}
          >
            <FeatherIcon classes="fill-black m-auto w-8 h-8" />
          </button>
        </div>
        <div className="relative top-40 w-auto">
          <Activity mode={userInfoSelector ? "visible" : "hidden"}>
            {visible && (
              <div
                ref={featuresRef}
                className="absolute bottom-full mb-2 w-56 z-50"
              >
                <UserFeatures
                  setModalVisible={setModalVisible}
                  userInfo={userInfo}
                  userInfoSelector={userInfoSelector}
                />
              </div>
            )}
            <div
              ref={userBoxRef}
              onClick={() => setVisible((v) => !v)}
              className="flex userInfoBox items-center gap-5 hover:bg-neutral-900 p-2 duration-200 rounded-full relative z-0"
            >
              <UserIcon classes="" />
              <div className="userInfo">
                <h3>{userInfoSelector.username}</h3>
                <h3 className="text-neutral-600">
                  @{userInfoSelector.login || userInfo.login}
                </h3>
              </div>
              <button className="ml-auto mr-2 userInfo">
                <Ellipsis />
              </button>
            </div>
          </Activity>
        </div>
      </div>
    </div>
  );
};
