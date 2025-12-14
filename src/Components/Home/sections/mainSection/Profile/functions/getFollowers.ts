import { setErrorSlice } from "../../../../../../reducers/status/error";
import { setLoadingState } from "../../../../../../reducers/status/loading";
import { store } from "../../../../../../store";
import type { followType } from "../../../../../../reducers/user/types/initialState";

interface IResponse {
  message: string;
  success: string;
  followers: followType[];
}

interface IProps {
  login: string | undefined;
  page: number;
}

export const getFollowers = async ({ login, page }: IProps) => {
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;
    const url = `${
      import.meta.env.VITE_APP_API_GET_FOLLOWERS
    }?login=${login}&page=${page}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const response: IResponse = await request.json();
    if (!response.success) {
      store.dispatch(setErrorSlice({ error: response.message, show: true }));
    }
    return response.followers;
  } catch (e) {
    console.log(e);
    store.dispatch(
      setErrorSlice({ error: "failed to load followers", show: true })
    );
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
