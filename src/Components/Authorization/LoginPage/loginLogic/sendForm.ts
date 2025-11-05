import type { NavigateFunction } from "react-router";
import type { responseWithToken, response } from "../types/responseTypes";
import { authWithToken } from "../../../fetch/authWithToken";
import { loginRequest } from "./requests/loginRequest";

interface props {
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  navigate: NavigateFunction;
  token?: string;
  login: string;
  password: string;
}

export const sendLoginForm = async ({
  login,
  password,
  token,
  setError,
  setLoading,
  navigate,
}: props) => {
  try {
    setError("");
    setLoading(true);
    if (token) {
      const response: responseWithToken = await authWithToken(
        import.meta.env.VITE_APP_API_AUTH_TOKEN_LOGIN,
        "POST"
      );

      if (!response.success) {
        setError(response.message);
        return false;
      }
      navigate("/x/home");
      return response;
    } else {
      const response: response = await loginRequest({ login, password });
      if (!response.success) {
        setError(response.message);
        return false;
      }
      localStorage.setItem("authToken", response.token);
      navigate("/x/home");
      return response;
    }
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    setTimeout(() => {
      setError("");
    }, 1500);
    setLoading(false);
  }
};
