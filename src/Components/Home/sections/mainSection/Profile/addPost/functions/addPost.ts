import { setErrorSlice } from "../../../../../../../reducers/status/error";
import { setUserPosts } from "../../../../../../../reducers/user/userInfo";
import { store } from "../../../../../../../store";
import { setLoadingState } from "../../../../../../../reducers/status/loading";
import { type IaddPost } from "../../../../../types/post/postTypes";

interface props {
  title: string;
}

export const addPost = async ({ title }: props) => {
  store.dispatch(setErrorSlice({ error: "", show: false }));
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const token = localStorage.getItem("authToken");
    if (!token) return;
    const addPost = await fetch("http://localhost:3000/api/post/addPost", {
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
    store.dispatch(setUserPosts({ post: response.Post }));
    return true;
  } catch (e) {
    console.log(e);
    return;
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
