import { setErrorSlice } from "../../../../../../../reducers/status/error";
import { setLoadingState } from "../../../../../../../reducers/status/loading";
import { setDeleteUserPost } from "../../../../../../../reducers/user/userInfo";
import { store } from "../../../../../../../store";

interface IResponse {
  success: boolean;
  message: string;
}

export const deletePost = async (postId: string) => {
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;
    const url = import.meta.env.VITE_APP_API_DELETE_POST;

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        postId,
      }),
    });
    const response: IResponse = await request.json();
    if (!response.success) {
      store.dispatch(setErrorSlice({ error: response.message, show: true }));
    }
    const posts = store.getState().userInfo.posts;
    const currentPost = posts.filter((post) => post._id === postId)[0];

    store.dispatch(setDeleteUserPost({ post: currentPost }));
    return;
  } catch (error) {
    store.dispatch(
      setErrorSlice({ error: "failed to delete post", show: true })
    );
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
