import { setErrorSlice } from "../../../../../../../reducers/status/error";
import { setUserInfoDispatch } from "../../../../../../../reducers/user/userInfo";
import { store } from "../../../../../../../store";
import type { IUser } from "../../../../../../../reducers/user/types/initialState";

interface IProps {
  setActive: (active: boolean) => void;
  setLoading: (loading: boolean) => void;
  biography: string;
  username: string;
}

interface IResponse {
  success: boolean;
  message: string;
  newUser: IUser;
}

export const changeProfileInfo = async ({
  setLoading,
  biography,
  username,
  setActive,
}: IProps) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    setLoading(true);
    const change = await fetch(
      "http://localhost:3000/api/post/changeUserInfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          biography: biography,
          username: username,
        }),
      }
    );

    const newUserInfo: IResponse = await change.json();
    if (!newUserInfo.success) {
      store.dispatch(
        setErrorSlice({
          error: "failed to load new user information",
          show: true,
        })
      );
      return;
    }
    setActive(false);
    store.dispatch(setUserInfoDispatch(newUserInfo.newUser));
  } catch (e) {
    store.dispatch(
      setErrorSlice({
        error: "failed to load new user information",
        show: true,
      })
    );
    console.log(e);
  } finally {
    setLoading(false);
  }
};
