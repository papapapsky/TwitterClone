import { setErrorSlice } from "../../../../../../../reducers/status/error";
import { setLoadingState } from "../../../../../../../reducers/status/loading";
import type { postsType } from "../../../../../../../reducers/user/types/initialState";
import { store } from "../../../../../../../store";
import type { searchedUserType } from "../../../../rightMenu/types/usersType";

interface IParams {
  parameter: string;
  title: string;
  login: string;
}

interface IResponse {
  message: string;
  success: boolean;
  type: "All" | "Profiles" | "Posts";

  users: searchedUserType[];
  posts: postsType[];
}

export const getSearchedInfo = async ({ title, login, parameter }: IParams) => {
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const token = localStorage.getItem("authToken");
    if (!token) return;
    const url = `${
      import.meta.env.VITE_APP_API_GET_SEARCHED_INFO
    }?title=${title}&login=${login}&parameter=${parameter}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response: IResponse = await request.json();
    if (!response.success) {
      store.dispatch(
        setErrorSlice({ error: "failed to load search info", show: true })
      );
    }
    return response;
  } catch (e) {
    store.dispatch(
      setErrorSlice({ error: "failed to load search info", show: true })
    );
    console.log(e);
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
