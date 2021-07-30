import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

/* action type start */
export const START_APP_LOADING = 'app/START_APP_LOADING';
export const END_APP_LOADING = 'app/END_APP_LOADING';

export const APP_INIT_START = 'app/APP_INIT_START';
export const APP_INIT_END = 'app/APP_INIT_END';

export const APP_ERROR = 'app/APP_ERROR';
export const COMMON_DATA = 'app/COMMON_DATA';

export const CHECK_LOGIN_START = 'app/CHECK_LOGIN_START';
export const CHECK_LOGIN_SUCCESS = 'app/CHECK_LOGIN_SUCCESS';
export const CHECK_LOGIN_FAILURE = 'app/CHECK_LOGIN_FAILURE';

export const LOGIN_SET_START = 'app/LOGIN_SET_START';
export const LOGIN_SET_END = 'app/LOGIN_SET_END';

export const START_PAGE_LOADING = 'app/START_PAGE_LOADING';
export const END_PAGE_LOADING = 'app/END_PAGE_LOADING';
/* action type end */

export type AppAction = ActionType<typeof actions>;
