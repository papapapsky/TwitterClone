import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Istate {
  error: string;
  show: boolean;
}

const initialState = {
  error: "",
  show: false,
};

const error = createSlice({
  name: "error",
  initialState,
  reducers: {
    setErrorSlice: (_, action: PayloadAction<Istate>) => {
      return action.payload;
    },
  },
});

export const { setErrorSlice } = error.actions;
export default error.reducer;
