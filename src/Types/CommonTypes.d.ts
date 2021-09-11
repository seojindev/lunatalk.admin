declare module 'CommonTypes' {
    export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure';
    export type defaultYesNo = 'Y' | 'N';

    // 사가 기본 타입.
    export interface SagaAction<T> {
        type: SagaTypes;
        payload: T;
    }

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

    // 토큰
    export type AccessTokenType = string;

    // 토큰 저장 인터페이스.
    export interface LocalTokenInterface {
        access_token: string;
        refresh_token: string;
    }

    // 공통 코드 세부
    export interface CodeItem {
        code_id: string;
        code_name: string;
    }

    // 공통 코드.
    export interface Codes {
        code_name: any;
        code_group: {
            S01: CodeItem[];
            S02: CodeItem[];
            S03: CodeItem[];
            S04: CodeItem[];
            G01: CodeItem[];
            P01: CodeItem[];
            O10: CodeItem[];
            O20: CodeItem[];
            E01: CodeItem[];
        };
    }

    export interface ProductCategoryItem {
        id: number;
        uuid: string;
        name: string;
        products_count: number;
    }

    export interface LoginResult {}

    interface lunaTreeSelectItem {
        title: string;
        value: string | number;
        key: string | number;
    }

    interface productCategoryResponse {
        id: number;
        uuid: string;
        name: string;
        products_count: number;
    }

    interface productCategoryDetailResponse {
        uuid: string;
        name: string;
    }
}
