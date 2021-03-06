import { createStore, applyMiddleware, compose } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { navMiddleware } from "@root/RootContainer";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = {
    key: "root",
    blacklist: ["nav"],
    storage: AsyncStorage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middlewares = [navMiddleware, sagaMiddleware];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const store = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  const persistor = persistStore(store);
  persistor.purge();
  return { store, persistor };
}
