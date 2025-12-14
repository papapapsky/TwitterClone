import { Link, useNavigate, useParams } from "react-router";
import { Content, Header } from "../../../Content";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../reducers/user/userInfo";
import { getFollowers } from "../functions/getFollowers";
import { UserIcon } from "../../../navigation/assets/UserIcon";
import { Arrow } from "../assets/Arrow";

interface followersType {
  bio: string;
  username: string;
  login: string;
}

export const FollowersList = () => {
  const [followers, setFollowers] = useState<followersType[]>();
  const [page, setPage] = useState<number>(0);
  const prevPageSelector = useSelector((state: RootState) => state.prevPage);
  const navigate = useNavigate();
  const { login } = useParams<{ login: string }>();

  useEffect(() => {
    const getFollowersFunc = async () => {
      console.log(page);
      const followersList = await getFollowers({ login, page });
      setFollowers(followersList);
      setPage((prev) => prev + 1);
    };
    getFollowersFunc();
  }, []);

  return (
    <>
      <Content>
        <Header additionalClasses="gap-2">
          <button
            onClick={() => navigate(prevPageSelector.page)}
            className="p-2 hover:bg-neutral-800 duration-200 rounded-full"
          >
            <Arrow />
          </button>
          <span className="text-xl font-semibold mb-1">{login}</span>
        </Header>
        <div className="flex flex-col w-full mt-5 px-4">
          {followers &&
            followers.map((user, i) => (
              <Link
                key={i}
                to={`/x/profile/${user.login}`}
                className="
                flex items-center gap-3 py-3 px-3 
                hover:bg-neutral-900/70 duration-150
                rounded-xl cursor-pointer
                border-b border-neutral-800 last:border-b-0
                "
              >
                <div className="w-11 h-11 rounded-full bg-neutral-800 flex items-center justify-center">
                  <UserIcon classes="" />
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-base">
                    {user.username}
                  </span>
                  <span className="text-neutral-500 text-sm">
                    @{user.login}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </Content>
    </>
  );
};
