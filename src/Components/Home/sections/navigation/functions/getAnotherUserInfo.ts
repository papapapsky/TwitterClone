import type { userInfo } from "../../../types/user/userTypes";

interface response {
  message: string;
  user: userInfo;
}

interface IParams {
  login: string;
  authToken: string;
}

export const getAnotherUserInfo = async ({
  login,
  authToken,
}: IParams): Promise<userInfo | null> => {
  try {
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
  }
};
