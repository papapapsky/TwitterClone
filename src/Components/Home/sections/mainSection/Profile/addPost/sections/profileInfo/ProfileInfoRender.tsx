import type { userInfo } from "../../../../../../types/user/userTypes";
import { Calendar } from "../../../assets/Calendar";

interface IProps {
  userAccount: boolean;
  userInfoSelector: userInfo;
  anotherUser: userInfo | undefined;
}

export const ProfileInfoRender = ({
  userAccount,
  userInfoSelector,
  anotherUser,
}: IProps) => {
  return (
    <section className="pt-16 px-6">
      <h3 className="text-xl font-semibold">
        {userAccount ? userInfoSelector.username : anotherUser?.username}
      </h3>
      <p className="text-neutral-500 text-sm mb-3">
        @{userAccount ? userInfoSelector.login : anotherUser?.login}
      </p>

      <div className="flex items-center text-neutral-500 text-sm gap-2 mb-3">
        <Calendar />
        <span>
          Joined{" "}
          {userAccount ? userInfoSelector.joinDate : anotherUser?.joinDate}
        </span>
      </div>

      <p className="text-neutral-400 text-sm mb-3 whitespace-pre-line leading-relaxed">
        {userAccount
          ? userInfoSelector.biography || "no bio yet"
          : anotherUser?.biography || "no bio yet"}
      </p>

      <div className="flex gap-5 text-sm">
        <p className="text-neutral-500">
          <span className="text-white font-semibold">
            {userAccount
              ? userInfoSelector.followingEqual
              : anotherUser?.followingEqual}
          </span>{" "}
          following
        </p>
        <p className="text-neutral-500">
          <span className="text-white font-semibold">
            {userAccount
              ? userInfoSelector.followersEqual
              : anotherUser?.followersEqual}
          </span>{" "}
          followers
        </p>
      </div>
    </section>
  );
};
