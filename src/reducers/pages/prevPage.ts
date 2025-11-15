import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IState {
  page: string;
}

const initialState: IState = {
  page: "/x/home",
};

const prevPage = createSlice({
  name: "prevPage",
  initialState,
  reducers: {
    setPrevPage: (state, action: PayloadAction<IState>) => {
      state.page = action.payload.page;
    },
  },
});

export const { setPrevPage } = prevPage.actions;
export default prevPage.reducer;
