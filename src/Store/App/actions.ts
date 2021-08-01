import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;
import * as _Types from './types';

/* action action start */
export const appInitAction = createStandardAction(_Types.APP_INIT_START)();
/* action action end */

// 로그인 체크.
export const loginCheckAction = createStandardAction(_Types.CHECK_LOGIN_START)();

// 로그인 정보 저장.
export const loginSetAction = createStandardAction(_Types.LOGIN_SET_START)();
