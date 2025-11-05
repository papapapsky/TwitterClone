import { setErrorSlice } from "../../../../../../reducers/status/error";
import { store } from "../../../../../../store";
import type { IPost } from "../Home";

interface response {
  posts: IPost[];
  message: string;
  success: boolean;
}

interface props {
  setLoading: (loading: boolean) => void;
  setPosts: (posts: IPost[]) => void;
  page: number;
  posts: IPost[];
}

export const getPosts = async ({
  setPosts,
  setLoading,
  posts,
  page,
}: props) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchPosts = await fetch(
      `http://localhost:3000/api/get/posts?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response: response = await fetchPosts.json();
    if (!response.success) {
      return store.dispatch(
        setErrorSlice({ error: "failed to load posts", show: true })
      );
    }
    store.dispatch(setErrorSlice({ error: "", show: false }));
    return setPosts([...response.posts, ...posts]);
  } catch (e) {
    store.dispatch(
      setErrorSlice({ error: "failed to load posts", show: true })
    );
    console.log(e);
  } finally {
    setLoading(false);
  }
};
