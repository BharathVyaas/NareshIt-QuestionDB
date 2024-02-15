import { combineReducers } from "redux";
import {
  technologiesListSlice,
  modulesListSlice,
  topicsListSlice,
  subtopicListSlice,
} from "./root.slice";

import technologySlice from "./technology.slice";

const reducersSlice = {
  technologiesListReducer: technologiesListSlice.reducer,
  modulesListReduer: modulesListSlice.reducer,
  topicsListReducer: topicsListSlice.reducer,
  subtopicsListReducer: subtopicListSlice.reducer,

  technologyReducer: technologySlice.reducer, // For Local Data
};
const reducers = combineReducers(reducersSlice);
export default reducers;
