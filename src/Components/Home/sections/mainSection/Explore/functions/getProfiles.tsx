import type { IUser } from "../../../../../../reducers/user/types/initialState";
import { store } from "../../../../../../store";

interface IParams {
  setProfiles: (profiles: IUser[]) => void;
}

interface IResponse {
  success: boolean;
  message: string;
  users: IUser[];
}

export const getProfiles = async ({ setProfiles }: IParams) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    const url = `${import.meta.env.VITE_APP_API_GET_PROFILES}?login=${
      store.getState().userInfo.login
    }`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response: IResponse = await request.json();
    if (response.success) {
      setProfiles(response.users);
    }
  } catch (e) {
    console.log(e);
  }
};
