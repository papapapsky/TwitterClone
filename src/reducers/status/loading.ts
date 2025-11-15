import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false,
};

const loadingState = createSlice({
  name: "loadingState",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<State>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { setLoadingState } = loadingState.actions;
export default loadingState.reducer;
