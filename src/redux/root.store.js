import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./root.reducer";
import rootSaga from "./root.saga";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);
