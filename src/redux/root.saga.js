import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  technologiesListSlice,
  modulesListSlice,
  topicsListSlice,
  subtopicListSlice,
} from "./root.slice";

const endpointModules = "https://www.nareshit.net/fetchModules/2";
const endpointTechnoloies = "http://www.nareshit.net/FetchTechnologies";
const endpointTopics = "https://www.nareshit.net/FetchTopics/2";
const endpointSubTopics = "https://www.nareshit.net/FetchSubTopics/2";
export function* technologieslistRequestSaga(action) {
  try {
    const res = yield call(axios.get, endpointTechnoloies, action.payload);

    if (res.status === 200) {
      console.log("res", JSON.parse(JSON.stringify(res)));
      yield put(technologiesListSlice.actions.response(res.data));
    } else {
      yield put(technologiesListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(technologiesListSlice.actions.error(error?.message));
  }
}
export function* moduleslistRequestSaga(action) {
  try {
    const res = yield call(axios.get, endpointModules, action.payload);

    if (res.status === 200) {
      console.log("res", JSON.parse(JSON.stringify(res)));
      yield put(modulesListSlice.actions.response(res.data));
    } else {
      yield put(modulesListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(modulesListSlice.actions.error(error?.message));
  }
}
export function* topiclistRequestSaga(action) {
  try {
    const res = yield call(axios.get, endpointTopics, action.payload);

    if (res.status === 200) {
      console.log("res", JSON.parse(JSON.stringify(res)));
      yield put(topicsListSlice.actions.response(res.data));
    } else {
      yield put(topicsListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(topicsListSlice.actions.error(error?.message));
  }
}
export function* subTopiclistRequestSaga(action) {
  try {
    const res = yield call(axios.get, endpointSubTopics, action.payload);

    if (res.status === 200) {
      console.log("res", JSON.parse(JSON.stringify(res)));
      yield put(subtopicListSlice.actions.response(res.data));
    } else {
      yield put(subtopicListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(subtopicListSlice.actions.error(error?.message));
  }
}
function* adminWatcher() {
  yield takeEvery(
    technologiesListSlice.actions.request.type,
    technologieslistRequestSaga
  );
  yield takeEvery(
    modulesListSlice.actions.request.type,
    moduleslistRequestSaga
  );
  yield takeEvery(topicsListSlice.actions.request.type, topiclistRequestSaga);
  yield takeEvery(
    subtopicListSlice.actions.request.type,
    subTopiclistRequestSaga
  );
}

export default function* rootSaga() {
  yield all([fork(adminWatcher)]);
}
