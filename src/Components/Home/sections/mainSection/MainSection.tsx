import "./adaptive.css";
import { Routes, Route } from "react-router";
import { Profile } from "./Profile/Profile";
import { Home } from "./Home/Home";
import { Explore } from "./Explore/Explore";
import { SearchPage } from "./Explore/searchPage/SearchPage";
import { ViewPost } from "./ViewPost/ViewPost";
import { FollowersList } from "./Profile/sections/FollowersList";
import { FollowingsList } from "./Profile/sections/FollowingsList";

export const MainSection = () => {
  return (
    <>
      <header className="mb-3">
        <hr />
      </header>
      <div className="w-2/5 mainSection">
        <Routes>
          <Route path="home/*" element={<Home />} />
          <Route path="profile/:user" element={<Profile />} />
          <Route path="explore/search" element={<SearchPage />} />
          <Route path="explore" element={<Explore />} />
          <Route path="post/:id" element={<ViewPost />} />
          <Route path="profile/:login/followers" element={<FollowersList />} />
          <Route
            path="profile/:login/followings"
            element={<FollowingsList />}
          />
        </Routes>
      </div>
    </>
  );
};
