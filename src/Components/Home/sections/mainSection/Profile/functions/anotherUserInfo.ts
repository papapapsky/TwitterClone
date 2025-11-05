import type { userInfo } from "../../../../types/user/userTypes";
import { getAnotherUserInfo } from "../../../navigation/functions/getAnotherUserInfo";

interface IParams {
  user: string;
  setAnotherUser: (userInfo: userInfo) => void;
}

export const anotherUserInfo = async ({ user, setAnotherUser }: IParams) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) return;

  if (user) {
    const userInfo: userInfo | null = await getAnotherUserInfo({
      login: user,
      authToken,
    });
    console.log(userInfo);
    if (userInfo) setAnotherUser(userInfo);
  }
};
