import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toast } from 'react-native-redux-toast';
import configureStore from './src/store/configureStore';
import RootContainer from './src/RootContainer';

const { store, persistor } = configureStore();

const App = () => (
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootContainer />
    </PersistGate>
  </Provider>
);

export default App;