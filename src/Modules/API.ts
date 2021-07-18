import { _Axios_ } from '@Utils';
import { ServiceResponse } from 'ServiceTypes';
import { AppBase } from 'ServiceTypes';

// 서버 공지 사항 체크.
export function checkServerNotice(): Promise<ServiceResponse<{ notice: string }>> {
    return _Axios_({ method: 'get', url: '/api/system/check-notice', payload: { data: {} } });
}

// 싸이트 기본 데이터.
export function getBaseData(): Promise<ServiceResponse<AppBase>> {
    return _Axios_({ method: 'get', url: '/api/system/base-data', payload: { data: {} } });
}
