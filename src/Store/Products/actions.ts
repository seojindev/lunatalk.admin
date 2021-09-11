import { deprecated, createAction } from 'typesafe-actions';
const { createStandardAction } = deprecated;
import * as _Types from './types';

export const addCategoryAction = createAction(_Types.ADD_PRODUCT_CATEGORY_REQUEST, ({ name }: { name: string }) => ({
    name,
}))();

// get list.
export const showCategoryAction = createStandardAction(_Types.SHOW_PRODUCT_CATEGORY_REQUEST)();

// get detail
export const detailCategoryAction = createAction(_Types.DETAIL_PRODUCT_CATEGORY_REQUEST, (uuid: string) => ({
    uuid,
}))();

export const updateCategoryAction = createStandardAction(_Types.UPDATE_PRODUCT_CATEGORY_REQUEST).map(
    ({ uuid, name }: { uuid: string; name: string }) => ({
        payload: { uuid, name },
    })
);

// store reset
export const productCateogoryResetAction = createStandardAction(_Types.PRODUCT_CATEGORY_RESET)();
