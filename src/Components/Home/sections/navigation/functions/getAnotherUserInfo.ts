import { setLoadingState } from "../../../../../reducers/status/loading";
import type { IUser } from "../../../../../reducers/user/types/initialState";
import { store } from "../../../../../store";

interface response {
  message: string;
  user: IUser;
}

interface IParams {
  login: string;
  authToken: string;
}

export const getAnotherUserInfo = async ({ login, authToken }: IParams) => {
  try {
    store.dispatch(setLoadingState({ loading: true }));
    const request = await fetch(
      `${import.meta.env.VITE_APP_API_GET_ANOTHER_USER_INFO}?login=${login}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!request.ok) {
      throw new Error(`${request.status}`);
    }

    const response: response = await request.json();
    return response.user;
  } catch (e) {
    console.error("Failed to load user", e);
    return null;
  } finally {
    store.dispatch(setLoadingState({ loading: false }));
  }
};
