import { setErrorSlice } from "../../../../../../reducers/status/error";
import { store } from "../../../../../../store";

export const deletePost = async (postId: string) => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;
    const url = import.meta.env.VITE_APP_API_DELETE_POST;
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
      }),
    });
    const response = await request.json();
    console.log(response);
  } catch (e) {
    console.log(e);
    store.dispatch(
      setErrorSlice({ error: "failed to delete post", show: true })
    );
  }
};
