import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guestId: localStorage.getItem("guestId") || null,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuestId: (state, action) => {
      state.guestId = action.payload;
      localStorage.setItem("guestId", action.payload);
    },
    clearGuestId: (state) => {
      state.guestId = null;
      localStorage.removeItem("guestId");
    },
  },
});

export const { setGuestId, clearGuestId } = guestSlice.actions;
export default guestSlice.reducer;
