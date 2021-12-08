// @flow
import { combineReducers } from 'redux';
import type { ActionType } from './types';
import app from './modules/app';
import location from './modules/location';
import type { LocationStateType } from './modules/location';
import profile from './modules/profile';
import type { ProfileStateType } from './modules/profile';
import session, { actionTypes as sessionActions } from './modules/session';
import type { SessionStateType } from './modules/session';
import type { AppStateType } from './modules/app';

export type StateType = {
  app: AppStateType,
  location: LocationStateType,
  profile: ProfileStateType,
  session: SessionStateType,
};

const appReducer = combineReducers({
  app,
  location,
  profile,
  session,
});

export default function rootReducer(
  state: StateType,
  action: ActionType,
): StateType {
  if (action.type === sessionActions.SIGN_OUT) {
    state = {};
  }

  return appReducer(state, action);
}
