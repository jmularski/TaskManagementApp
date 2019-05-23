import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/store/configureStore';
import RootNavigator from './src/RootNavigator';

const { store, persistor } = configureStore();

const App = () => (
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootNavigator />
    </PersistGate>
  </Provider>
);

export default RootNavigator;