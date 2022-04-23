import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    recordHistories: [],
    authToken: "",
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.isAuth = true;
      state.authToken = action.payload;
    },
    setRecordHistories: (state, action) => {
      state.recordHistories = action.payload;
    },
    addRecordHistory: (state, action) => {
      state.recordHistories = [...state.recordHistories, action.payload];
    },
  },
});

export const { setAuthUser, setRecordHistories, addRecordHistory } =
  userSlice.actions;

export default userSlice.reducer;
