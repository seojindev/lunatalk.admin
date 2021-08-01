import { takeLatest, fork, put, call } from 'redux-saga/effects';
import { postLogin } from '@API';
import { setlocalToken, removeLocalToken } from '@Helper';
import { ServiceResponse } from 'CommonTypes';

import * as _Types from './types';
import * as _AppTypes from '@Store/App/types';

function* loginRequestSaga({
    payload: { login_id, login_password },
}: {
    payload: { login_id: string; login_password: string };
}) {
    yield put({ type: _AppTypes.START_PAGE_LOADING });

    const response: ServiceResponse<{ access_token: string; refresh_token: string }> = yield call(postLogin, {
        login_id: login_id,
        login_password: login_password,
    });

    const { status, message, payload } = response;

    if (status === true) {
        setlocalToken({
            access_token: payload.access_token,
            refresh_token: payload.refresh_token,
        });
        yield put({
            type: _Types.LOGIN_SUCCESS,
            payload: {
                message: '로그인 성공했습니다.',
                access_token: payload.access_token,
                refresh_token: payload.refresh_token,
            },
        });

        yield put({
            type: _AppTypes.SET_LOGIN_STATE_TRUE,
        });
    } else {
        removeLocalToken();
        yield put({
            type: _Types.LOGIN_FAILURE,
            payload: {
                message: message,
            },
        });
        yield put({
            type: _AppTypes.SET_LOGIN_STATE_FALSE,
        });
    }

    yield put({ type: _AppTypes.END_PAGE_LOADING });
}

function* startLogoutSaga() {
    yield put({ type: _AppTypes.START_PAGE_LOADING });

    removeLocalToken();
    yield put({
        type: _AppTypes.SET_LOGIN_STATE_FALSE,
    });
    yield put({ type: _AppTypes.END_PAGE_LOADING });
}

function* onBaseSagaWatcher() {
    yield takeLatest(_Types.LOGIN_REQUEST as any, loginRequestSaga);
    yield takeLatest(_Types.START_LOGOUT as any, startLogoutSaga);
}

export default [fork(onBaseSagaWatcher)];
