import { createSlice } from "@reduxjs/toolkit";

const technologySlice = createSlice({
  name: "technologySlice",
  initialState: [],
  reducers: {
    insertOne(state, action) {
      state.push(action.payload);
    },
    removeOne(state, action) {
      state = state.filter((item) => item.TechnologyID !== action.payload);
    },
  },
});

export const technologyActions = technologySlice.actions;
export default technologySlice;
