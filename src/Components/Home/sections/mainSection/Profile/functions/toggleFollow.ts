import { setErrorSlice } from "../../../../../../reducers/status/error";
import { setLoadingState } from "../../../../../../reducers/status/loading";
import { setUserInfoDispatch } from "../../../../../../reducers/user/userInfo";
import { store } from "../../../../../../store";

interface IParams {
  login: string;
  username: string;
  biography: string;
}

interface IResponse {
  follow: boolean;
  success: boolean;
}

export const toggleFollow = async ({ biography, login, username }: IParams) => {
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;
    const url = import.meta.env.VITE_APP_API_TOGGLE_FOLLOW;
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        biography,
        login,
        username,
      }),
    });
    const response: IResponse = await request.json();
    if (!response.success) {
      return store.dispatch(
        setErrorSlice({ error: "Failed to toggle follow", show: true })
      );
    }
    const userInfo = store.getState().userInfo;
    if (response.follow) {
      store.dispatch(
        setUserInfoDispatch({
          ...userInfo,
          following: [
            ...userInfo.following,
            { bio: biography, login, username },
          ],
        })
      );
    } else {
      store.dispatch(
        setUserInfoDispatch({
          ...userInfo,
          following: userInfo.following.filter((f) => f.login !== login),
        })
      );
    }
  } catch (e) {
    store.dispatch(
      setErrorSlice({ error: "Failed to toggle follow", show: true })
    );
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
