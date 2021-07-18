import { createReducer } from 'typesafe-actions';
import { SagaAction, Codes } from 'CommonTypes';
import produce from 'immer';
// import { ErrorMessage } from 'StoreTypes';
import { AppState } from 'StoreTypes';
import {} from './actions';

import {
    START_APP_LOADING,
    END_APP_LOADING,
    APP_INIT_END,
    COMMON_DATA,
    APP_ERROR,
    LOGIN_SET_END,
    LOGIN_SET_START,
} from './actions';

// 스토어 init.
const initialState: AppState = {
    loading: false,
    status: false,
    loginState: false,
    service_message: '',
    common: {
        codes: {
            code_name: '',
            code_group: {
                S01: [],
                S02: [],
                S03: [],
                S04: [],
                G01: [],
                P01: [],
                O10: [],
                O20: [],
                E01: [],
            },
        },
    },
    loginUser: {
        access_token: '',
        refresh_token: '',
    },
};

export const AppSagaReducer = createReducer<AppState>(initialState, {
    [START_APP_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.loading = true;
        });
    },
    [END_APP_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.loading = false;
        });
    },
    [COMMON_DATA]: (state: AppState, action: SagaAction<{ codes: Codes }>) => {
        return produce(state, draft => {
            draft.common.codes = action.payload.codes;
        });
    },
    [APP_INIT_END]: (state: AppState) => {
        return produce(state, draft => {
            draft.status = true;
        });
    },
    [APP_ERROR]: (state: AppState, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.service_message = action.payload.message;
        });
    },
    // 새로고침시 로그인 확인
    // 로그인 정보 저장시 초기화.
    [LOGIN_SET_START]: (state: AppState) => {
        return produce(state, draft => {
            draft.loginState = false;
            draft.loginUser = initialState.loginUser;
        });
    },
    // 로그인 체크후 로그인 정보 저장.
    [LOGIN_SET_END]: (state: AppState, action: SagaAction<{ access_token: string; refresh_token: string }>) => {
        return produce(state, draft => {
            //TODO: access_token, refresh_token 이 null이여도 check_api 탈때 비정상인 토큰일 경우 false 처리로 변경 되야함.
            draft.loginState = true;
            draft.loginUser.access_token = action.payload.access_token;
            draft.loginUser.refresh_token = action.payload.refresh_token;
        });
    },
});
export default AppSagaReducer;
