import type { NavigateFunction } from "react-router";
import type { IError } from "../Registration";

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
    const registration = await fetch(
      "http://localhost:3000/auth/registration",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: login,
          password: password,
          email: email,
          date: date,
        }),
      }
    );
    const response: response = await registration.json();
    if (!response.success) {
      console.log(response.errors);
      setError({ message: response.message, errors: response.errors });
      return false;
    }
    localStorage.setItem("authToken", response.token);
    navigate("/login");
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
