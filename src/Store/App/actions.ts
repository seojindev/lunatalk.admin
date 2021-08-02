import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;
import * as _Types from './types';

/* action action start */
export const appInitAction = createStandardAction(_Types.APP_INIT_START)();
/* action action end */
