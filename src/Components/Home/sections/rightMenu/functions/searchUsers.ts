import type { searchedUserType } from "../types/usersType";

interface IResponse {
  success: boolean;
  users: searchedUserType[];
}

interface IProps {
  login: string;
  setSearchedUsers: (searchedUsers: searchedUserType[]) => void;
  setLoading: (loading: boolean) => void;
}

export const searchUsers = async ({
  login,
  setSearchedUsers,
  setLoading,
}: IProps) => {
  try {
    setLoading(true);
    if (!login) return;
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    const request = await fetch(
      `${import.meta.env.VITE_APP_API_SEARCH_USER}?login=${login}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (!request.ok) {
      throw new Error("failed to load users");
    }
    const response: IResponse = await request.json();
    setSearchedUsers(response.users);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
