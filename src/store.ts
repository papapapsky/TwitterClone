import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducer from "./reducers/user/userInfo";
import errorReducer from "./reducers/status/error";
import unregisteredUserReducer from "./reducers/unregisteredUser/unregisteredUser";
import loadingReducer from "./reducers/status/loading";
import prevPageReducer from "./reducers/pages/prevPage";

export const store = configureStore({
  reducer: {
    userInfo: UserInfoReducer,
    error: errorReducer,
    unregisteredUser: unregisteredUserReducer,
    loading: loadingReducer,
    prevPage: prevPageReducer,
  },
});
