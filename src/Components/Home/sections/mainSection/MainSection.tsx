import "./adaptive.css";
import { Routes, Route } from "react-router";
import { Profile } from "./Profile/Profile";
import { Home } from "./Home/Home";
import { Explore } from "./Explore/Explore";

export const MainSection = () => {
  return (
    <>
      <header className="mb-3">
        <hr />
      </header>
      <div className="w-2/5 ml-4 mainSection">
        <Routes>
          <Route path="home/*" element={<Home />} />
          <Route path="profile/:user" element={<Profile />} />
          <Route path="explore/*" element={<Explore />} />
        </Routes>
      </div>
    </>
  );
};
