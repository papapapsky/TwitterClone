import { setErrorSlice } from "../../../../../../reducers/status/error";
import type { postsType } from "../../../../../../reducers/user/types/initialState";
import { store } from "../../../../../../store";
import type { response } from "../../../../../Authorization/LoginPage/types/responseTypes";
import { setLoadingState } from "../../../../../../reducers/status/loading";

interface IProps {
  postId: string;
  setPost: (post: postsType) => void;
}

interface IResponse extends response {
  post: postsType;
}

export const getPostById = async ({ postId, setPost }: IProps) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    store.dispatch(setLoadingState({ loading: true }));

    const url = `${import.meta.env.VITE_APP_API_GET_POST_ID}?id=${postId}`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    });
    const response: IResponse = await request.json();
    console.log(response);
    if (!response.success) {
      store.dispatch(
        setErrorSlice({ error: "failed to load post", show: true })
      );
    }
    setPost(response.post);
  } catch (e) {
    store.dispatch(setErrorSlice({ error: "failed to load post", show: true }));
    console.log(e);
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
