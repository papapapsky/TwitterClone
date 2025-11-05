import { useForm, type SubmitHandler } from "react-hook-form";
import Xicon from "../../assets/Xicon.png";
import { Link, useNavigate } from "react-router";
import { sendLoginForm } from "./loginLogic/sendForm";
import { useEffect, useState } from "react";
import { LoginModal } from "./modal/LoginModal";

interface Inputs {
  login: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      sendLoginForm({
        navigate: navigate,
        login: "",
        password: "",
        token: authToken,
        setError,
        setLoading,
      });
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    sendLoginForm({ ...data, setError, setLoading, navigate });
  };

  return (
    <div className="flex w-auto justify-center items-center min-h-screen px-4">
      {loading && <LoginModal />}
      {error && (
        <div className="absolute errorShow">
          <p className="text-red-600 font-semibold text-center">{error}</p>
        </div>
      )}
      <div className="w-[500px] h-[780px] bg-neutral-950 rounded-xl flex justify-center p-5">
        <div className="max-w-[420px] mt-5 flex flex-col items-center">
          <img src={Xicon} alt="" className="invert w-10 mb-5" />
          <h2 className="text-3xl font-semibold">Log in to your account</h2>
          <form
            className="userData mt-8 flex flex-col gap-8 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <input
                {...register("login", {
                  required: true,
                })}
                placeholder=""
                id="login"
                type="text"
                className="w-full box-border pt-6 pb-2 pl-2 rounded z-10 focusedInput border-neutral-600 border"
              />
              <label
                htmlFor="login"
                className={`absolute left-2 text-neutral-500 animatedLable`}
              >
                Login
              </label>
              {errors.login && (
                <p className="absolute text-sm text-red-500 mt-1 ml-2">
                  Please write correct login
                </p>
              )}
            </div>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 10,
                  maxLength: 32,
                })}
                placeholder=""
                id="password"
                type="text"
                className="w-full box-border pt-6 pb-2 pl-2 rounded z-10 focusedInput border-neutral-600 border"
              />
              <label
                htmlFor="password"
                className="absolute left-2 text-neutral-500 animatedLable"
              >
                Password
              </label>
              {errors.password && (
                <p className="absolute text-sm text-red-500 mt-1 ml-2">
                  The correct password must contain between 10 and 30
                  characters.
                </p>
              )}
            </div>
            <button className="white-link-btn mt-5">Log In</button>
            <p>
              Don`t have account? -{" "}
              <Link
                to="/registration"
                className="text-blue-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
