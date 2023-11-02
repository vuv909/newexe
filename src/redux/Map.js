import { createSlice } from "@reduxjs/toolkit";

const initialState =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.491147777979!2d105.52392847504824!3d21.01302518831929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBGUFQ!5e0!3m2!1svi!2s!4v1696357814233!5m2!1svi!2s";
const Map = createSlice({
  name: "map",
  initialState: { value: initialState },
  reducers: {
    location: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { location } = Map.actions;
export default Map.reducer;
