// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import ScriptLoader from 'react-script-loader-hoc';
import Routes from './Routes';
import store, { persistor } from './redux/createStore';
import './styles/master.scss';

type AppType = () => React$Node;

const App: AppType = ({ scriptsLoadedSuccessfully }) => {
  if (scriptsLoadedSuccessfully) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }

  return null;
};

export default ScriptLoader(
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
)(App);
