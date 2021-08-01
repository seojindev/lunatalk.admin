import { createReducer } from 'typesafe-actions';
import { SagaAction, Codes } from 'CommonTypes';
import produce from 'immer';
// import { ErrorMessage } from 'StoreTypes';
import { AppState } from 'StoreTypes';
import {} from './actions';

import * as _Types from './types';

// 스토어 init.
const initialState: AppState = {
    loading: false,
    pageLoading: false,
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
};

export const AppSagaReducer = createReducer<AppState>(initialState, {
    [_Types.START_APP_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.loading = true;
        });
    },
    [_Types.END_APP_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.loading = false;
        });
    },
    [_Types.COMMON_DATA]: (state: AppState, action: SagaAction<{ codes: Codes }>) => {
        return produce(state, draft => {
            draft.common.codes = action.payload.codes;
        });
    },
    [_Types.APP_INIT_END]: (state: AppState) => {
        return produce(state, draft => {
            draft.status = true;
        });
    },
    [_Types.APP_ERROR]: (state: AppState, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.service_message = action.payload.message;
        });
    },
    // 새로고침시 로그인 확인
    // 로그인 정보 저장시 초기화.
    [_Types.LOGIN_SET_START]: (state: AppState) => {
        return produce(state, draft => {
            draft.loginState = false;
        });
    },
    // 로그인 체크후 로그인 정보 저장.
    [_Types.LOGIN_SET_END]: (state: AppState) => {
        return produce(state, draft => {
            //TODO: access_token, refresh_token 이 null이여도 check_api 탈때 비정상인 토큰일 경우 false 처리로 변경 되야함.
            draft.loginState = true;
        });
    },
    [_Types.START_PAGE_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.pageLoading = true;
        });
    },
    [_Types.END_PAGE_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.pageLoading = false;
        });
    },
    [_Types.SET_LOGIN_STATE_TRUE]: (state: AppState) => {
        return produce(state, draft => {
            draft.loginState = true;
        });
    },
    [_Types.SET_LOGIN_STATE_FALSE]: (state: AppState) => {
        return produce(state, draft => {
            draft.loginState = false;
        });
    },
});
export default AppSagaReducer;
