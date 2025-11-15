import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router";
import { Welocome } from "./Components/Authorization/WelcomePage/Welcome";
import { Registration } from "./Components/Authorization/RegistrationPage/Registration";
import { Login } from "./Components/Authorization/LoginPage/Login";
import { Container } from "./Components/Home/Container";
import { EmailConfirm } from "./Components/Authorization/EmailConfirmPage/EmailConfirm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Welocome />} />
          <Route path="/emailConfirm" element={<EmailConfirm />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/x/*" element={<Container />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
