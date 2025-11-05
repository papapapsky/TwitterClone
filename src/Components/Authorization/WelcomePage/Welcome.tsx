import Xicon from "../../assets/Xicon.png";
import "./welcome.css";
import { Link } from "react-router";

export const Welocome = () => {
  return (
    <div className="flex w-full h-lvh justify-center p-20 welcomeContainer">
      <div className="flex items-start gap-[20vw] welcomeContent">
        <img src={Xicon} alt="Xicon" className="invert w-[18vw] Xicon" />
        <div className="w-150 h-full flex flex-col justify-center">
          <h1 className="text-7xl font-semibold">В курсе происходящего</h1>
          <div className="mt-10">
            <h2 className="text-4xl font-medium">Присоединяйтесь сегодня.</h2>
            <div className="mt-12">
              <Link to="/registration" className="white-link-btn">
                Зарегистрироваться
              </Link>
              <p className="text-[12px] mt-5">
                Регистрируясь, вы соглашаетесь с{" "}
                <a
                  href="https://x.com/ru/tos"
                  className="text-blue-700 hover:underline"
                  target="_blank"
                >
                  Условиями предоставления услуг {""}
                </a>
                и {""}
                <a
                  href="https://x.com/ru/privacy"
                  className="text-blue-700 hover:underline"
                  target="_blank"
                >
                  Политикой конфиденциальности
                </a>
                , а также с{" "}
                <a
                  className="text-blue-700 hover:underline"
                  target="_blank"
                  href="https://help.x.com/ru/rules-and-policies/x-cookies"
                >
                  Политикой использования файлов cookie.
                </a>
                .
              </p>
            </div>
            <div className="mt-10">
              <h2 className="text-lg font-medium">Уже зарегистрированы?</h2>
              <div className="mt-5">
                <Link to="/login" className="black-link-btn">
                  Войти
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
