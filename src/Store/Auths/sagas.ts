import { takeLatest, fork, put, call } from 'redux-saga/effects';
import _Alert_ from '@_Alert_';
import { checkServerNotice, getBaseData } from '@API';
import { COLORLOG, getLocalToken } from '@Helper';
import { axiosDefaultHeader } from '@Util/_Axios_';
import axios from 'axios';
import { ServiceResponse, AppBase } from 'CommonTypes';

import * as _Types from './types';

function* loginRequestSaga({ login_id, login_password }: { login_id: string; login_password: string }) {
    // const response: ServerDefaultResult<GetTagGroupResult> = yield call(getTagGroups);
}

function* onBaseSagaWatcher() {
    yield takeLatest(_Types.LOGIN_REQUEST as any, loginRequestSaga);
}

export default [fork(onBaseSagaWatcher)];
