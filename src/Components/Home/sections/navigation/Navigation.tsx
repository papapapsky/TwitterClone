import type { userInfo } from "../../types/user/userTypes";
import {
  navigationSections,
  type INavigationSections,
} from "./functions/navigationSections";
import "./navigation.css";
import Xicon from "../../../assets/Xicon.png";
import { NavLink, Link } from "react-router";
import { useEffect, useState } from "react";
import { Activity } from "react";
import { UserIcon } from "./assets/UserIcon";
import { Ellipsis } from "./assets/Ellipsis";
import { store } from "../../../../store";
import { AddPost } from "../mainSection/Profile/addPost/AddPost";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../reducers/user/userInfo";
import { FeatherIcon } from "./assets/FeatherIcon";

export const Navigation = () => {
  const userInfoSelector = useSelector((state: RootState) => state.userInfo);
  const [sections, setSections] = useState<INavigationSections[]>([]);
  const [userInfo, setUserInfo] = useState<userInfo>(store.getState().userInfo);
  const [postAddActive, setPostAddActive] = useState<boolean>(false);

  useEffect(() => {
    navigationSections({ setSections, setUserInfo });
  }, []);

  return (
    <div className="text-left w-58 h-lvh mr-5 advanced-container">
      {postAddActive && <AddPost setPostAddActive={setPostAddActive} />}
      <header className="mb-3 fixed">
        <button className="p-3 rounded-[100px] hover:bg-neutral-800 duration-300">
          <Link to="/x/home">
            <img src={Xicon} alt="" className="invert w-[30px]" />
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
        <div className="relative top-60 w-auto ">
          <Activity mode={userInfoSelector ? "visible" : "hidden"}>
            <div className="flex userInfoBox items-center gap-5 hover:bg-neutral-900 p-2 duration-200 rounded-full">
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
