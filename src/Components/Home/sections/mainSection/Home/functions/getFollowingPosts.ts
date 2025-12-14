import { setErrorSlice } from "../../../../../../reducers/status/error";
import { setLoadingState } from "../../../../../../reducers/status/loading";
import { store } from "../../../../../../store";
import type { postsType } from "../../../../../../reducers/user/types/initialState";

interface IResponse {
  posts: postsType[];
  message: string;
  success: boolean;
}

interface IProps {
  followingPosts: postsType[];
  setFollowingPosts: (posts: postsType[]) => void;
  alredyChecked: number;
}

export const getFollowingPosts = async ({
  followingPosts,
  setFollowingPosts,
  alredyChecked,
}: IProps) => {
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;
    const url = `${
      import.meta.env.VITE_APP_API_SEARCH_FOLLOWING
    }?alredyChecked=${alredyChecked}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Berer ${authToken}`,
      },
    });
    const response: IResponse = await request.json();
    if (response.success) {
      return setFollowingPosts([
        ...response.posts.reverse(),
        ...followingPosts,
      ]);
    }
  } catch (e) {
    store.dispatch(
      setErrorSlice({ error: "failed to load following posts", show: true })
    );
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
