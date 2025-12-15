import type { IUser } from "../../../../../../reducers/user/types/initialState";
import { UserIcon } from "../../../navigation/assets/UserIcon";
import { useEffect, useState } from "react";
import { getProfiles } from "../functions/getProfiles";
import { store } from "../../../../../../store";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../reducers/user/userInfo";
import { ProfilesLoadingSkeleton } from "../../../../skeleton/ProfilesLoadingSkeleton";

export const ShowProfiles = () => {
  const [profiles, setProfiles] = useState<IUser[]>([]);
  const userInfoSelector = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    getProfiles({ setProfiles });
  }, [userInfoSelector]);

  return (
    <div>
      {!profiles.length && <ProfilesLoadingSkeleton />}
      <div className="mt-2 flex gap-5 px-10 justify-evenly flex-wrap w-full">
        {profiles
          .filter((user) => user.login !== store.getState().userInfo.login)
          .map(({ login, username }, index) => (
            <Link
              to={`/x/profile/${login}`}
              key={index}
              className="hover:bg-neutral-950 flex flex-col items-center max-w-30 min-w-40 py-3 rounded-xl duration-200"
            >
              <div>
                <UserIcon classes="w-20 h-20 mx-auto" />
                <div className="mt-2 text-center">
                  <h2 className="font-semibold">{username}</h2>
                  <h2 className="text-gray-500">@{login}</h2>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
