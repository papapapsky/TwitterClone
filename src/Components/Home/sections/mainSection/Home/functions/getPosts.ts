import { setErrorSlice } from "../../../../../../reducers/status/error";
import { setLoadingState } from "../../../../../../reducers/status/loading";
import { store } from "../../../../../../store";
import type { postsType } from "../../../../../../reducers/user/types/initialState";

interface response {
  posts: postsType[];
  message: string;
  success: boolean;
}

interface props {
  setPosts: (posts: postsType[]) => void;
  page: number;
  posts: postsType[];
  exceptionUser?: string;
}

const shuffleArray = (arr: postsType[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const getPosts = async ({
  setPosts,
  posts,
  page,
  exceptionUser,
}: props) => {
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const url = `${import.meta.env.VITE_APP_API_GET_POSTS}?page=${page}${
      exceptionUser ? `&exceptionUser=${exceptionUser}` : ""
    }`;

    const fetchPosts = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response: response = await fetchPosts.json();
    if (!response.success) {
      return store.dispatch(
        setErrorSlice({ error: "failed to load posts", show: true })
      );
    }
    store.dispatch(setErrorSlice({ error: "", show: false }));
    response.posts = shuffleArray(response.posts);
    return setPosts([...response.posts, ...posts]);
  } catch (e) {
    store.dispatch(
      setErrorSlice({ error: "failed to load posts", show: true })
    );
    console.log(e);
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
