import { takeLatest, fork, put, call } from 'redux-saga/effects';
import _Alert_ from '@_Alert_';
import { checkServerNotice, getBaseData, getShowProducts } from '@API';
import { COLORLOG } from '@Helper';
import { axiosDefaultHeader } from '@Util/_Axios_';
import axios from 'axios';
import { ServiceResponse, AppBase, productListItem } from 'CommonTypes';

import * as _Types from './types';

// 서버 통신 체크만 따로 뺴서..
const checkServerStatus = async () => {
    return axios.get('/api/system/check-status', axiosDefaultHeader);
};

// app 최초 로딩.
function* appInitSaga() {
    yield put({ type: _Types.START_APP_LOADING }); // 공통 로딩 시작.

    try {
        yield call(checkServerStatus);

        const serverNotice: ServiceResponse<{ notice: string }> = yield call(checkServerNotice);
        if (serverNotice.status && serverNotice.payload && serverNotice.payload.notice) {
            _Alert_.default({ text: serverNotice.payload.notice });
        }

        const serverBaseData: ServiceResponse<AppBase> = yield call(getBaseData);

        yield put({
            type: _Types.COMMON_DATA,
            payload: {
                codes: serverBaseData.payload.codes,
                products: serverBaseData.payload.products,
            },
        });

        yield put({ type: _Types.APP_INIT_END });
    } catch (error) {
        COLORLOG(':: check Server Error :: ', 'error');
        yield put({
            type: _Types.APP_ERROR,
            payload: {
                message: '어플리 케이션 초기화중 문제가 발생했습니다. \n 잠시후 다시 시도해 주세요.',
            },
        });
    }

    yield put({ type: _Types.END_APP_LOADING }); // 공통 로딩 끝.
}

// common store 에 상품 정보만 가지고 오기.
function* getProductSaga() {
    yield put({ type: _Types.START_APP_LOADING }); // 공통 로딩 시작.

    const response: ServiceResponse<productListItem[]> = yield call(getShowProducts);

    if (response.status) {
        yield put({
            type: _Types.GET_PRODUCT_SUCCESS,
            payload: response.payload,
        });
    } else {
        yield put({
            type: _Types.GET_PRODUCT_FAILURE,
            payload: {
                message: response.message,
            },
        });
    }

    yield put({ type: _Types.END_APP_LOADING }); // 공통 로딩 끝.
}

function* onBaseSagaWatcher() {
    yield takeLatest(_Types.APP_INIT_START as any, appInitSaga);
    yield takeLatest(_Types.GET_PRODUCT_REQUEST as any, getProductSaga);
}

export default [fork(onBaseSagaWatcher)];
