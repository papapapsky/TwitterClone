import type { IUser } from "../../../../../reducers/user/types/initialState";

interface IProps {
  userInfoSelector: IUser;
  userInfo: IUser;
  setModalVisible: (modalVisible: boolean) => void;
}

export const UserFeatures = ({
  userInfoSelector,
  userInfo,
  setModalVisible,
}: IProps) => {
  return (
    <div className="border rounded-xl mb-2 userFeaturesShow bg-black">
      <button
        onClick={() => setModalVisible(true)}
        className="hover:bg-neutral-950 duration-200 py-3 rounded-xl px-3 mx-auto block w-full text-left"
      >
        Log out{" "}
        <span className="font-semibold">
          @{userInfoSelector.login || userInfo.login}
        </span>
      </button>
    </div>
  );
};
