import "./profile.css";
import type { IUser } from "../../../../../reducers/user/types/initialState";
import type { RootState } from "../../../../../reducers/user/userInfo";
import { getUserInfo } from "../../navigation/functions/getUserInfo";
import { useEffect, useState } from "react";
import { store } from "../../../../../store";
import { Arrow } from "./assets/Arrow";
import { UserIcon } from "../../navigation/assets/UserIcon";
import { AddPost } from "./addPost/AddPost";
import { useSelector } from "react-redux";
import { UserPostsRender } from "./addPost/sections/userPosts/PostsRender";
import { useNavigate, useParams } from "react-router";
import { SetUpProfile } from "./setUpProfile/SetUpProfile";
import { anotherUserInfo } from "./functions/anotherUserInfo";
import { AnotherUserPostsRender } from "./addPost/sections/anotherUserPosts/PostsRender";
import { ProfileInfoRender } from "./addPost/sections/profileInfo/ProfileInfoRender";
import { setLoadingState } from "../../../../../reducers/status/loading";

export const Profile = () => {
  const [anotherUser, setAnotherUser] = useState<IUser>();
  const [postAddActive, setPostAddActive] = useState(false);
  const [changeProfile, setChangeProfile] = useState(false);
  const [userAccount, setUserAccount] = useState(false);
  const linkParams = useParams<{ [type: string]: string }>();
  const prevLinkSelector = useSelector(
    (state: RootState) => state.prevPage.page
  );
  const userInfoSelector = useSelector((state: RootState) => state.userInfo);
  const navigate = useNavigate();

  const isUserAccount = () => {
    if (
      userInfoSelector.login !== linkParams.user &&
      store.getState().userInfo.login !== linkParams.user
    ) {
      setUserAccount(false);
      return false;
    }
    setUserAccount(true);
    return true;
  };

  const ifUserAccount = async () => {
    if (!store.getState().userInfo.login) {
      store.dispatch(setLoadingState({ loading: true }));
      await getUserInfo();
      store.dispatch(setLoadingState({ loading: false }));
    }
    console.log(store.getState().userInfo.login);
    const accountCheck = isUserAccount();
    if (accountCheck) {
      if (store.getState().userInfo.login) {
        return;
      }
    } else {
      anotherUserInfo({ user: linkParams.user as string, setAnotherUser });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    ifUserAccount();
  }, [linkParams.user]);

  return (
    <>
      {postAddActive && <AddPost setPostAddActive={setPostAddActive} />}
      {changeProfile && <SetUpProfile setChangeProfile={setChangeProfile} />}

      <div className="min-h-screen w-full bg-black text-white border-x border-neutral-700">
        <header className="h-14 w-full flex items-center px-4 bg-black/80 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-10">
          <button
            onClick={() => navigate(prevLinkSelector ?? "/x/home")}
            className="p-2 hover:bg-neutral-800 duration-200 rounded-full mr-4"
          >
            <Arrow />
          </button>
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">
              {userAccount ? userInfoSelector.username : anotherUser?.username}
            </h2>
            <p className="text-neutral-500 text-sm">
              {userAccount
                ? userInfoSelector.posts.length
                : anotherUser?.posts.length}{" "}
              posts
            </p>
          </div>
        </header>

        <section className="relative w-full h-40 bg-linear-to-r from-neutral-800 to-neutral-700">
          <div className="absolute -bottom-12 left-6 right-6 flex items-end">
            <UserIcon classes="w-28 h-28 rounded-full border-4 border-black bg-neutral-900" />
            {userAccount && (
              <button
                onClick={() => setChangeProfile(true)}
                className="ml-auto font-semibold rounded-full px-5 py-2 mr-1 border border-gray-600 hover:bg-neutral-700/40 duration-200"
              >
                Set up profile
              </button>
            )}
          </div>
        </section>

        <ProfileInfoRender
          anotherUser={anotherUser}
          userAccount={userAccount}
          userInfoSelector={userInfoSelector}
        />

        <section className="pt-10 px-6">
          <div className="flex justify-center mb-2">
            <button className="border-b-4 border-blue-500 pb-1 font-semibold">
              Posts
            </button>
          </div>
          <div className="flex flex-col-reverse">
            {userAccount ? (
              userInfoSelector.posts.length > 0 ? (
                userInfoSelector.posts.map((item, index) => (
                  <div key={index}>
                    <UserPostsRender
                      _id={item._id}
                      uploadDate={item.uploadDate}
                      likes={item.likes}
                      login={userInfoSelector.login}
                      title={item.title}
                      username={userInfoSelector.username}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center mt-5">
                  <h1 className="text-xl font-semibold mb-3">
                    You don’t have any posts
                  </h1>
                  <button
                    onClick={() => setPostAddActive(true)}
                    className="bg-blue-500 hover:bg-blue-600 duration-200 px-6 py-2 rounded-full font-semibold"
                  >
                    Post
                  </button>
                </div>
              )
            ) : anotherUser?.posts && anotherUser?.posts.length > 0 ? (
              anotherUser.posts.map((item, index) => (
                <div key={index}>
                  <AnotherUserPostsRender
                    _id={item._id}
                    uploadDate={item.uploadDate}
                    likes={item.likes}
                    login={item.login}
                    username={anotherUser.username}
                    title={item.title}
                  />
                </div>
              ))
            ) : (
              <div className="text-center mt-5">
                <h1 className="text-xl font-semibold">
                  {anotherUser?.username} doesn’t have any posts
                </h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
