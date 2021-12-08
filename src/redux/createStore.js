// @flow
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import transforms from './transforms';
import { getAppName } from '../utils/contentProviders';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const persistConfig = {
  key: getAppName(),
  storage,
  whitelist: ['session', 'profile', 'search'],
  transforms,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Object = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware)),
);

const persistor: Object = persistStore(store);

export default store;

export { persistor };
