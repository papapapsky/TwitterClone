import { createPortal } from "react-dom";
import Xicon from "../../../../assets/Xicon.png";
import { useNavigate } from "react-router";

interface IProps {
  setModalVisible: (modalVisible: boolean) => void;
}

export const LogoutModal = ({ setModalVisible }: IProps) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return createPortal(
    <div className="fixed w-full h-lvh bg-black/50 z-10">
      <div className="modalElement top-[50%] max-w-120 min-w-80 py-5 px-10 bg-neutral-950 rounded-xl">
        <img src={Xicon} alt="" className="invert w-10 block mx-auto" />
        <div className="mt-5">
          <h2 className="text-xl font-bold">Log out of X?</h2>
          <p className="text-gray-500 mt-2">
            You can always log back in at any time. If you just want to switch
            accounts, you can do that by adding an existing account.{" "}
          </p>
          <div className="flex flex-col gap-y-5 my-5">
            <button onClick={logout} className="white-link-btn">
              Log out
            </button>
            <button
              onClick={() => {
                setModalVisible(false);
              }}
              className="hover:bg-neutral-900 border border-gray-500 duration-200 bg-black px-10 py-3 rounded-full font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("mainModal") as HTMLDivElement
  );
};
