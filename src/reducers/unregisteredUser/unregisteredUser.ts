import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IUnregisteredUser {
  email: string | undefined;
  login: string | undefined;
  date: string | undefined;
  password: string | undefined;
}

const initialState: IUnregisteredUser = {
  email: undefined,
  login: undefined,
  date: undefined,
  password: undefined,
};

const unregisteredUser = createSlice({
  name: "unregisteredUser",
  initialState,
  reducers: {
    setUnregisteredUser: (_, action: PayloadAction<IUnregisteredUser>) => {
      return action.payload;
    },
  },
});

export const { setUnregisteredUser } = unregisteredUser.actions;
export default unregisteredUser.reducer;
