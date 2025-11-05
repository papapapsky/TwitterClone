import { HomeIcon } from "../assets/HomeIcon";
import { BookmarkIcon } from "../assets/BookmarkIcon";
import { CommunitiesIcon } from "../assets/CommunitiesIcon";
import { ExploreIcon } from "../assets/ExploreIcon";
import { ListsIcon } from "../assets/ListsIcon";
import { MessagesIcon } from "../assets/MessagesIcon";
import { NotificationsIcon } from "../assets/NotificationsIcon";
import { ProfileIcon } from "../assets/ProfileIcon";
import { store } from "../../../../../store";
import type { ElementType } from "react";
import { getUserInfo } from "./getUserInfo";
import type { userInfo } from "../../../types/user/userTypes";

export interface INavigationSections {
  svg: ElementType;
  title: string;
  link: string;
}

type props = {
  setUserInfo: (setUserInfo: userInfo) => void;
  setSections: (setSections: INavigationSections[]) => void;
};

export const navigationSections = async ({
  setSections,
  setUserInfo,
}: props) => {
  await getUserInfo({ setUserInfo });
  const login = store.getState().userInfo.login;

  const sections: INavigationSections[] = [
    { svg: HomeIcon, title: "Home", link: "/x/home" },
    { svg: ExploreIcon, title: "Explore", link: "/x/explore" },
    {
      svg: NotificationsIcon,
      title: "Notifications",
      link: "/x/notifications",
    },
    { svg: MessagesIcon, title: "Messages", link: "/x/messages" },
    { svg: BookmarkIcon, title: "Bookmarks", link: "/x/bookmarks" },
    { svg: ListsIcon, title: "Lists", link: "/x/lists" },
    { svg: CommunitiesIcon, title: "Communities", link: "/x/communities" },
    { svg: ProfileIcon, title: "Profile", link: `/x/profile/${login}` },
  ];

  return setSections([...sections]);
};
