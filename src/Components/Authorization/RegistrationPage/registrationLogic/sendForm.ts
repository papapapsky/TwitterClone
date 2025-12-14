import type { NavigateFunction } from "react-router";
import type { IError } from "../Registration";
import { setUnregisteredUser } from "../../../../reducers/unregisteredUser/unregisteredUser";
import { store } from "../../../../store";

export type errorsType = {
  field: string;
  message: string;
};

interface props {
  setLoading: (loading: boolean) => void;
  setError: (error: IError) => void;

  navigate: NavigateFunction;
  login: string;
  password: string;
  email: string;
  date: string;
}

interface response {
  token: string;
  message: string;
  success: boolean;
  errors: errorsType[];
}

export const sendForm = async ({
  login,
  password,
  email,
  date,
  setError,
  setLoading,
  navigate,
}: props) => {
  try {
    setLoading(true);
    const registration = await fetch(import.meta.env.VITE_APP_API_AUTH_REG, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: login,
        password: password,
        email: email,
        date: date,
      }),
    });
    const response: response = await registration.json();
    if (!response.success) {
      console.log(response.errors);
      setError({ message: response.message, errors: response.errors });
      return false;
    }
    localStorage.setItem("authToken", response.token);
    localStorage.setItem(
      "unregisteredUser",
      JSON.stringify({ date, login, password, email })
    );
    store.dispatch(setUnregisteredUser({ date, login, password, email }));
    navigate("/emailConfirm");
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
