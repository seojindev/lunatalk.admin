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
    loginUser: {
        access_token: '',
        refresh_token: '',
    },
};

export const AppSagaReducer = createReducer<AppState>(initialState, {});
export default AppSagaReducer;
