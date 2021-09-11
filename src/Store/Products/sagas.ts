import { takeLatest, fork, put, call } from 'redux-saga/effects';
import * as _API from '@API';
import * as CommonTypes from 'CommonTypes';

import * as _Types from './types';
import * as _AppTypes from '@Store/App/types';

// 카테고리 등록 사가.
function* addProductCategoryRequestSaga({ payload: { name } }: { payload: { name: string } }) {
    const response: CommonTypes.ServiceResponse<{ uuid: string }> = yield call(_API.addProductCategory, { name: name });

    const { status, message, payload } = response;

    if (status) {
        yield put({
            type: _Types.ADD_PRODUCT_CATEGORY_SUCCESS,
            payload: {
                message: message,
                uuid: payload.uuid,
            },
        });
    } else {
        yield put({
            type: _Types.ADD_PRODUCT_CATEGORY_FAILURE,
            payload: {
                message: message,
            },
        });
    }
}

// 상품 카테고리 목록 가지고 오기.
function* getProductCategorySaga() {
    const response: CommonTypes.ServiceResponse<CommonTypes.productCategoryResponse> = yield call(
        _API.getProductCategory
    );

    if (response.status) {
        yield put({
            type: _Types.SHOW_PRODUCT_CATEGORY_SUCCESS,
            payload: {
                message: response.message,
                result: response.payload,
            },
        });
    } else {
        yield put({
            type: _Types.SHOW_PRODUCT_CATEGORY_FAILURE,
            payload: {
                message: response.message,
            },
        });
    }
}

// category 상세.
function* getCategoryDetailSaga({ payload: { uuid } }: { payload: { uuid: string } }) {
    const response: CommonTypes.ServiceResponse<CommonTypes.productCategoryDetailResponse> = yield call(
        _API.getProductCategoryDetail,
        uuid
    );

    if (response.status) {
        yield put({
            type: _Types.DETAIL_PRODUCT_CATEGORY_SUCCESS,
            payload: {
                message: response.message,
                result: response.payload,
            },
        });
    } else {
        yield put({
            type: _Types.DETAIL_PRODUCT_CATEGORY_FAILURE,
            payload: {
                message: response.message,
            },
        });
    }
}

function* updateCategoryDetailSaga({ payload: { uuid, name } }: { payload: { uuid: string; name: string } }) {
    const response: CommonTypes.ServiceResponse<CommonTypes.productCategoryDetailResponse> = yield call(
        _API.updateProductCategory,
        uuid,
        name
    );

    if (response.status) {
        yield put({
            type: _Types.UPDATE_PRODUCT_CATEGORY_SUCCESS,
            payload: {
                message: response.message,
                result: response.payload,
            },
        });
    } else {
        yield put({
            type: _Types.UPDATE_PRODUCT_CATEGORY_FAILURE,
            payload: {
                message: response.message,
            },
        });
    }
}

function* onBaseSagaWatcher() {
    yield takeLatest(_Types.ADD_PRODUCT_CATEGORY_REQUEST as any, addProductCategoryRequestSaga);
    yield takeLatest(_Types.SHOW_PRODUCT_CATEGORY_REQUEST as any, getProductCategorySaga);
    yield takeLatest(_Types.DETAIL_PRODUCT_CATEGORY_REQUEST as any, getCategoryDetailSaga);
    yield takeLatest(_Types.UPDATE_PRODUCT_CATEGORY_REQUEST as any, updateCategoryDetailSaga);
}

export default [fork(onBaseSagaWatcher)];
