import { takeLatest, fork, put, call } from 'redux-saga/effects';
import _Alert_ from '@_Alert_';
import { postLogin } from '@API';
import { COLORLOG, getLocalToken } from '@Helper';
import { axiosDefaultHeader } from '@Util/_Axios_';
import axios from 'axios';
import { ServiceResponse, AppBase } from 'CommonTypes';

import * as _Types from './types';

// function* loginRequestSaga({ login_id, login_password }: { login_id: string; login_password: string }) {
function* loginRequestSaga({
    payload: { login_id, login_password },
}: {
    payload: { login_id: string; login_password: string };
}) {
    console.debug({ login_id: login_id, login_password: login_password });
    const response: ServiceResponse<{ access_token: string; refresh_token: string }> = yield call(postLogin, {
        login_id: login_id,
        login_password: login_password,
    });

    const { status, message, payload } = response;

    if (status === true) {
    }
}

function* onBaseSagaWatcher() {
    yield takeLatest(_Types.LOGIN_REQUEST as any, loginRequestSaga);
}

export default [fork(onBaseSagaWatcher)];
