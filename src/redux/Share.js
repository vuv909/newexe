import { createSlice } from "@reduxjs/toolkit";


const Share = createSlice({
  name: "share",
  initialState: { value: false },
  reducers: {
    share: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { share } = Share.actions;
export default Share.reducer;
