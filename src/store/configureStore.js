import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware  from 'redux-saga';

import { navMiddleware } from '../RootContainer';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const persistConfig = {
    key: 'root',
    blacklist: ['nav'],
    storage: AsyncStorage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middlewares = [navMiddleware, sagaMiddleware];
  if(process.env.NODE_ENV === 'development'){
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
  return { store, persistor }
}