import { store } from "../../../../../store";
import { setUserInfoDispatch } from "../../../../../reducers/user/userInfo";
import type { IUser } from "../../../../../reducers/user/types/initialState";

interface responseInfo {
  success: boolean;
  user: IUser;
}

export const getUserInfo = async () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false;
  }
  const userInfo = await fetch(import.meta.env.VITE_APP_API_GET_USER_INFO, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const userInfoJson: responseInfo = await userInfo.json();

  if (!userInfoJson) {
    return false;
  }
  store.dispatch(setUserInfoDispatch({ ...userInfoJson.user }));
};
