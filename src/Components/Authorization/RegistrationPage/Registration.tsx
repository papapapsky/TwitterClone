import { useForm, type SubmitHandler } from "react-hook-form";
import Xicon from "../../assets/Xicon.png";
import "./registration.css";
import { sendForm } from "./registrationLogic/sendForm";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { RegistrationModal } from "./modal/RegistrationModal";
import type { errorsType } from "./registrationLogic/sendForm";

type Inputs = {
  login: string;
  email: string;
  password: string;
  date: string;
};

export interface IError {
  message: string;
  errors: errorsType[];
}

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const [error, setError] = useState<IError>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data.email);
    sendForm({ ...data, setError, setLoading, navigate });
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-[500px] h-auto bg-neutral-950 rounded-xl flex justify-center p-5">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          <img src={Xicon} alt="" className="invert w-10 mb-5" />
          <h2 className="text-3xl font-semibold text-center">
            Create an account
          </h2>

          <form
            className="userData mt-8 flex flex-col gap-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative flex flex-col">
              <input
                {...register("login", { required: "Whats your name?" })}
                placeholder=""
                id="login"
                type="text"
                className="w-full box-border pt-6 pb-2 pl-2 rounded z-10 focusedInput border-neutral-600 border"
              />
              <label
                htmlFor="login"
                className="absolute left-2 text-neutral-500 animatedLable"
              >
                Login
              </label>
              <p className="text-sm text-red-500 mt-1">
                {errors.login?.message ||
                  (error?.errors &&
                    error?.errors.find((e) => e.field === "login")?.message)}
              </p>
            </div>

            <div className="relative flex flex-col">
              <input
                {...register("email", {
                  required: "Write your email",
                })}
                placeholder=""
                id="email"
                type="email"
                className="w-full box-border pt-6 pb-2 pl-2 rounded z-10 focusedInput border-neutral-600 border"
              />
              <label
                htmlFor="email"
                className="absolute left-2 text-neutral-500 animatedLable"
              >
                Email
              </label>
              <p className="text-sm text-red-500 mt-1">
                {errors.email?.message ||
                  (error?.errors &&
                    error?.errors.find((e) => e.field === "email")?.message)}
              </p>
            </div>

            <div className="relative flex flex-col">
              <input
                {...register("password", {
                  required: "Write your password",
                  minLength: 10,
                  maxLength: 32,
                })}
                placeholder=""
                id="password"
                type="password"
                className="w-full box-border pt-6 pb-2 pl-2 rounded z-10 focusedInput border-neutral-600 border"
              />
              <label
                htmlFor="password"
                className="absolute left-2 text-neutral-500 animatedLable"
              >
                Password
              </label>
              <p className="text-sm text-red-500 mt-1">
                {errors.password?.message ||
                  (error?.errors &&
                    error.errors.find((e) => e.field === "password")?.message)}
              </p>
            </div>

            <div className="flex flex-col mt-4">
              <label className="font-semibold mb-1">Birthday</label>
              <input
                {...register("date", { required: "Введите дату рождения" })}
                type="date"
                className="border rounded p-2 w-full outline-none border-gray-500"
              />
              <p className="text-sm text-red-500 mt-1">
                {errors.date?.message ||
                  (error?.errors &&
                    error?.errors.find((e) => e.field === "date")?.message)}
              </p>
            </div>

            {error?.message && (
              <p className="text-red-600 font-semibold text-center mt-2">
                {error?.message}
              </p>
            )}

            {loading && <RegistrationModal />}

            <button type="submit" className="mt-4 w-full white-link-btn">
              Register
            </button>

            <p className="text-center mt-2">
              Alredy have account?{" "}
              <Link to="/login" className="text-blue-700 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
