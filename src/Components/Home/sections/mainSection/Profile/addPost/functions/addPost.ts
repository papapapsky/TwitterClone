import { setErrorSlice } from "../../../../../../../reducers/status/error";
import { setUserPosts } from "../../../../../../../reducers/user/userInfo";
import { store } from "../../../../../../../store";
import { setLoadingState } from "../../../../../../../reducers/status/loading";
import type { IaddPost } from "../../../../rightMenu/types/postTypes";

interface props {
  title: string;
}

export const addPost = async ({ title }: props) => {
  store.dispatch(setErrorSlice({ error: "", show: false }));
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const token = localStorage.getItem("authToken");
    if (!token) return;
    const url = import.meta.env.VITE_APP_API_ADD_POST;
    const addPost = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    const response: IaddPost = await addPost.json();
    if (!response.success) {
      store.dispatch(
        setErrorSlice({ error: "Failed to create post", show: true })
      );
      return;
    }
    store.dispatch(setErrorSlice({ error: "", show: false }));
    console.log(response.Post);
    store.dispatch(setUserPosts({ post: response.Post }));
    return true;
  } catch (e) {
    console.log(e);
    return;
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
