import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* action type start */
export const LOGIN_REQUEST = 'auths/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auths/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auths/LOGIN_FAILURE';

export const START_LOGOUT = 'auths/START_LOGOUT';
export const END_LOGOUT = 'auths/END_LOGOUT';

export type AppAction = ActionType<typeof actions>;
