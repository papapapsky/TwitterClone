import type { followType } from "../../../../../../reducers/user/types/initialState";
import { Content, Header } from "../../../Content";
import { useNavigate, useParams } from "react-router";
import { getFollowings } from "../functions/getFollowings";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../reducers/user/userInfo";
import { Arrow } from "../assets/Arrow";
import { ProfilesList } from "./additionalUI/ProfilesList";

export const FollowingsList = () => {
  const [followings, setFollowings] = useState<followType[]>([]);
  const [page, setPage] = useState<number>(0);
  const prevPageSelector = useSelector((state: RootState) => state.prevPage);
  const navigate = useNavigate();
  const { login } = useParams<{ login: string }>();

  useEffect(() => {
    const getFollowingsFunc = async () => {
      const followingsList = await getFollowings({ login, page });
      setFollowings(followingsList ?? []);
      console.log(followingsList);
      setPage((prev) => prev + 1);
    };
    getFollowingsFunc();
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
        <ProfilesList profileList={followings} />
      </Content>
    </>
  );
};
