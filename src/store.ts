import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducer from "./reducers/user/userInfo";
import errorReducer from "./reducers/status/error";

export const store = configureStore({
  reducer: {
    userInfo: UserInfoReducer,
    error: errorReducer,
  },
});
