import type { followType } from "../../../../../../../reducers/user/types/initialState";
import { UserIcon } from "../../../../navigation/assets/UserIcon";
import { Link } from "react-router";

interface IProps {
  profileList: followType[];
}

export const ProfilesList = ({ profileList }: IProps) => {
  return (
    <div className="flex flex-col w-full mt-5 px-4">
      {profileList &&
        profileList.map((user, i) => (
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
              <span className="font-semibold text-base">{user.username}</span>
              <span className="text-neutral-500 text-sm">@{user.login}</span>
            </div>
          </Link>
        ))}
    </div>
  );
};
