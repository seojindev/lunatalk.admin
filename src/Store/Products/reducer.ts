import { action, createReducer } from 'typesafe-actions';
import { DefaultStatus, SagaAction, ProductCategoryItem } from 'CommonTypes';
import produce from 'immer';
import { ProductsState } from 'StoreTypes';

import * as _Types from './types';

// 스토어 init.
const initialState: ProductsState = {
    category: {
        add: {
            state: 'idle',
            message: '',
            result: {
                uuid: '',
            },
        },
        show: {
            state: 'idle',
            message: '',
            result: [],
        },
        detail: {
            state: 'idle',
            message: '',
            result: {
                uuid: '',
                name: '',
            },
        },
        update: {
            state: 'idle',
            message: '',
            result: {
                uuid: '',
                name: '',
            },
        },
    },
    products: {
        show: {
            state: 'idle',
            message: '',
            result: [],
        },
    },
};

export const AppSagaReducer = createReducer<ProductsState>(initialState, {
    [_Types.PRODUCT_CATEGORY_RESET]: (state: ProductsState) => {
        return produce(state, draft => {
            draft.category = initialState.category;
        });
    },
    // 카테고리 추가.
    [_Types.ADD_PRODUCT_CATEGORY_REQUEST]: (state: ProductsState) => {
        return produce(state, draft => {
            draft.category.add.state = 'loading';
            draft.category.add.message = initialState.category.add.message;
            draft.category.add.result = initialState.category.add.result;
        });
    },
    [_Types.ADD_PRODUCT_CATEGORY_SUCCESS]: (
        state: ProductsState,
        action: SagaAction<{ message: string; uuid: string }>
    ) => {
        return produce(state, draft => {
            draft.category.add.state = 'success';
            draft.category.add.message = action.payload.message;
            draft.category.add.result.uuid = action.payload.uuid;
        });
    },
    [_Types.ADD_PRODUCT_CATEGORY_FAILURE]: (state, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.category.add.state = 'failure';
            draft.category.add.message = action.payload.message;
            draft.category.add.result = initialState.category.add.result;
        });
    },
    [_Types.SHOW_PRODUCT_CATEGORY_REQUEST]: (state: ProductsState) => {
        return produce(state, draft => {
            draft.category.show.state = 'loading';
            draft.category.show.message = initialState.category.show.message;
            draft.category.show.result = initialState.category.show.result;
        });
    },
    [_Types.SHOW_PRODUCT_CATEGORY_SUCCESS]: (
        state: ProductsState,
        action: SagaAction<{ result: ProductCategoryItem[] }>
    ) => {
        return produce(state, draft => {
            draft.category.show.state = 'success';
            draft.category.show.message = initialState.category.show.message;
            draft.category.show.result = action.payload.result;
        });
    },
    [_Types.SHOW_PRODUCT_CATEGORY_FAILURE]: (state, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.category.show.state = 'failure';
            draft.category.show.message = action.payload.message;
            draft.category.show.result = initialState.category.show.result;
        });
    },
    [_Types.DETAIL_PRODUCT_CATEGORY_REQUEST]: (state: ProductsState) => {
        return produce(state, draft => {
            draft.category.detail.state = 'loading';
            draft.category.detail.message = initialState.category.detail.message;
            draft.category.detail.result = initialState.category.detail.result;
        });
    },
    [_Types.DETAIL_PRODUCT_CATEGORY_SUCCESS]: (
        state: ProductsState,
        action: SagaAction<{ result: { uuid: string; name: string } }>
    ) => {
        return produce(state, draft => {
            draft.category.detail.state = 'success';
            draft.category.detail.message = initialState.category.detail.message;
            draft.category.detail.result = action.payload.result;
        });
    },
    [_Types.DETAIL_PRODUCT_CATEGORY_FAILURE]: (state, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.category.detail.state = 'failure';
            draft.category.detail.message = action.payload.message;
            draft.category.detail.result = initialState.category.detail.result;
        });
    },
    [_Types.UPDATE_PRODUCT_CATEGORY_REQUEST]: (state: ProductsState) => {
        return produce(state, draft => {
            draft.category.update.state = 'loading';
            draft.category.update.message = initialState.category.update.message;
            draft.category.update.result = initialState.category.update.result;
        });
    },
    [_Types.UPDATE_PRODUCT_CATEGORY_SUCCESS]: (
        state: ProductsState,
        action: SagaAction<{ result: { uuid: string; name: string } }>
    ) => {
        return produce(state, draft => {
            draft.category.update.state = 'success';
            draft.category.update.message = initialState.category.update.message;
            draft.category.update.result = action.payload.result;
        });
    },
    [_Types.UPDATE_PRODUCT_CATEGORY_FAILURE]: (state, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.category.update.state = 'failure';
            draft.category.update.message = action.payload.message;
            draft.category.update.result = initialState.category.update.result;
        });
    },
});
export default AppSagaReducer;
