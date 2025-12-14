import type {
  IUser,
  postsType,
} from "../../../../../../../reducers/user/types/initialState";
import type { searchedUserType } from "../../../../rightMenu/types/usersType";
import { getSearchedInfo } from "./getSearchedInfo";
import type { IisFindInfo } from "../SearchPage";

interface IProps {
  linkParams: {
    get: (params: string) => any;
  };
  setSearchedUsers: (searchedUsers: searchedUserType[]) => void;
  setPosts: (posts: postsType[]) => void;
  setIsFindInfo: (
    isFindInfo: IisFindInfo | ((prev: IisFindInfo) => IisFindInfo)
  ) => void;
  userInfoSelector: IUser;
}

export const onSearchPageLoad = async ({
  linkParams,
  userInfoSelector,
  setSearchedUsers,
  setPosts,
  setIsFindInfo,
}: IProps) => {
  const title: string | null = linkParams.get("title");
  const login = userInfoSelector.login ? userInfoSelector.login : "";
  if (!title || !login) return;

  setSearchedUsers([]);
  setPosts([]);
  setIsFindInfo({ profiles: true, posts: true });
  const info = await getSearchedInfo({
    title,
    login,
    parameter: linkParams.get("f") as string,
  });

  if (!info) return;
  switch (info.type) {
    case "All": {
      if (!info.posts.length) {
        setIsFindInfo((prev) => ({ ...prev, posts: false }));
      }
      if (!info.users.length) {
        setIsFindInfo((prev) => ({ ...prev, profiles: false }));
      }
      setPosts(info.posts ?? []);
      setSearchedUsers(info.users ?? []);
      break;
    }
    case "Posts": {
      if (!info.posts.length) {
        setIsFindInfo((prev) => ({ ...prev, posts: false }));
      }
      setPosts(info.posts ?? []);
      break;
    }
    case "Profiles": {
      if (!info.users.length) {
        setIsFindInfo((prev) => ({ ...prev, profiles: false }));
      }
      setSearchedUsers(info.users ?? []);
      break;
    }
  }
};
