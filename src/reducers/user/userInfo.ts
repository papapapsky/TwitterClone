import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../../store";
import type { IUser, postsType } from "./types/initialState";

interface actionState {
  post: postsType;
}

const initialState: IUser = {
  email: "",
  username: "",
  login: "",
  date: "",
  biography: "",
  joinDate: "",
  postsEqual: 0,
  followersEqual: 0,
  followingEqual: 0,
  posts: [],
  followers: [],
  following: [],
};

const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfoDispatch: (_, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    setUserPosts: (state, action: PayloadAction<actionState>) => {
      state.posts.push(action.payload.post);
    },
  },
});

export const { setUserInfoDispatch, setUserPosts } = userInfo.actions;
export type RootState = ReturnType<typeof store.getState>;
export default userInfo.reducer;
