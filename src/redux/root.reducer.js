import { combineReducers } from "redux";
import {
  technologiesListSlice,
  modulesListSlice,
  topicsListSlice,
  subtopicListSlice,
} from "./root.slice";

const reducersSlice = {
  technologiesListReducer: technologiesListSlice.reducer,
  modulesListReduer: modulesListSlice.reducer,
  topicsListReducer: topicsListSlice.reducer,
  subtopicsListReducer: subtopicListSlice.reducer,
};
const reducers = combineReducers(reducersSlice);
export default reducers;
