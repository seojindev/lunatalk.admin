import { createReducer } from 'typesafe-actions';
import { SagaAction } from 'CommonTypes';
import produce from 'immer';
import { AuthsState } from 'StoreTypes';

import * as _Types from './types';

// 스토어 init.
const initialState: AuthsState = {
    login: {
        state: 'idle',
        message: '',
        token: {
            access_token: '',
            refresh_token: '',
        },
    },
};

export const AppSagaReducer = createReducer<AuthsState>(initialState, {
    [_Types.LOGIN_REQUEST]: (state: AuthsState) => {
        return produce(state, draft => {
            draft.login.state = 'loading';
            draft.login.message = '';
            draft.login.token = initialState.login.token;
        });
    },
    [_Types.LOGIN_FAILURE]: (state: AuthsState, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.login.state = 'failure';
            draft.login.message = action.payload.message;
            draft.login.token = initialState.login.token;
        });
    },
    [_Types.LOGIN_SUCCESS]: (
        state: AuthsState,
        action: SagaAction<{ message: string; access_token: string; refresh_token: string }>
    ) => {
        return produce(state, draft => {
            draft.login.state = 'success';
            draft.login.message = action.payload.message;
            draft.login.token = {
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
            };
        });
    },
    [_Types.START_LOGOUT]: (state: AuthsState) => {
        return produce(state, draft => {
            draft.login = initialState.login;
        });
    },
});
export default AppSagaReducer;
