import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;
import * as _Types from './types';

/* action action start */
export const appInitAction = createStandardAction(_Types.APP_INIT_START)();

export const startAppLoadingAction = createStandardAction(_Types.APP_PAGE_LOADING_START)();
export const endAppLoadingAction = createStandardAction(_Types.APP_PAGE_LOADING_END)();
export const resetAppLoadingAction = createStandardAction(_Types.RESET_PAGE_LOADING)();
export const getProductAction = createStandardAction(_Types.GET_PRODUCT_REQUEST)();
export const resetProductAction = createStandardAction(_Types.RESET_PRODUCT_LIST)();
/* action action end */
