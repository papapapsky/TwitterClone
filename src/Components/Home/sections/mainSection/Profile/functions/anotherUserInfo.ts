import type { IUser } from "../../../../../../reducers/user/types/initialState";
import { getAnotherUserInfo } from "../../../navigation/functions/getAnotherUserInfo";

interface IParams {
  user: string;
  setAnotherUser: (userInfo: IUser) => void;
}

export const anotherUserInfo = async ({ user, setAnotherUser }: IParams) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) return;

  if (user) {
    const userInfo: IUser | null = await getAnotherUserInfo({
      login: user,
      authToken,
    });
    console.log(userInfo);
    if (userInfo) setAnotherUser(userInfo);
  }
};
