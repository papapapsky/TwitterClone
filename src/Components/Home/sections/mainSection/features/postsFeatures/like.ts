import { setErrorSlice } from "../../../../../../reducers/status/error";
import { store } from "../../../../../../store";

interface IProps {
  login: string;
  _id: number;
}

interface IResponse {
  success: boolean;
  message: string;
}

export const like = async ({ login, _id }: IProps) => {
  const url = import.meta.env.VITE_APP_API_LIKE_POST;
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        login: login,
        postID: _id,
      }),
    });

    const response: IResponse = await request.json();
    if (!response.success) {
      return store.dispatch(
        setErrorSlice({ error: "Failed to like/unlike the post", show: true })
      );
    }
    console.log(response);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("");
  }
};
