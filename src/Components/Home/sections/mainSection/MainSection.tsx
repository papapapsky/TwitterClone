import { Routes, Route } from "react-router";
import { Profile } from "./Profile/Profile";
import { Home } from "./Home/Home";

export const MainSection = () => {
  return (
    <>
      <header className="mb-3">
        <hr />
      </header>
      <div className="w-2/5">
        <Routes>
          <Route path="home/*" element={<Home />} />
          <Route path="profile/:user" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};
