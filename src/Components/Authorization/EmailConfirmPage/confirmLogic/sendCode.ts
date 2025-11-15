import type { NavigateFunction } from "react-router";
import type { IUser } from "../../../../reducers/user/types/initialState";
import type { IUnregisteredUser } from "../../../../reducers/unregisteredUser/unregisteredUser";

interface IResponse {
  success: boolean;
  message: string;
  token: string;
  user: IUser;
}

interface IParams {
  navigate: NavigateFunction;
  code: string;
  setLoading: (loading: boolean) => void;
  user: IUnregisteredUser;
}

export const sendCode = async ({
  code,
  setLoading,
  user,
  navigate,
}: IParams) => {
  try {
    setLoading(true);
    const { password, date, email, login } = user;
    const url = import.meta.env.VITE_APP_API_SEND_CODE;
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        password: password,
        date: date,
        email: email,
        login: login,
      }),
    });

    const response: IResponse = await request.json();
    if (!response.success) {
      return;
    }
    localStorage.removeItem("unregisteredUser");
    localStorage.setItem("authToken", response.token);
    navigate("/x/home");
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
