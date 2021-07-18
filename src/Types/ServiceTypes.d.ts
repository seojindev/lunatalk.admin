declare module 'ServiceTypes' {
    // 기본 api 리턴 인테페이스
    export interface ServiceResponse<T> {
        status: boolean;
        message: string;
        payload: T;
    }

    // 기본 데이터들.
    export interface AppBase {
        codes: Codes[];
    }
}
