import { createReducer } from 'typesafe-actions';
import { SagaAction, Codes } from 'CommonTypes';
import produce from 'immer';
// import { ErrorMessage } from 'StoreTypes';
import { AuthsState } from 'StoreTypes';
import {} from './actions';

import * as _Types from './types';

// 스토어 init.
const initialState: AuthsState = {};

export const AppSagaReducer = createReducer<AuthsState>(initialState, {});
export default AppSagaReducer;
