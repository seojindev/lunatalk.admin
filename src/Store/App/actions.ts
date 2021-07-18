import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;

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
/* action type end */

/* action action start */
export const appInitAction = createStandardAction(APP_INIT_START)();
/* action action end */

// 로그인 체크.
export const loginCheckAction = createStandardAction(CHECK_LOGIN_START)();

// 로그인 정보 저장.
export const loginSetAction = createStandardAction(LOGIN_SET_START)();
