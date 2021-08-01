declare module 'StoreTypes' {
    import { RouterState } from 'connected-react-router';
    import { Login, Codes, LocalTokenInterface } from 'CommonTypes';

    // App Store
    export interface AppState {
        loading: boolean;
        pageLoading: boolean;
        status: boolean;
        loginState: boolean;
        service_message: string;
        common: {
            codes: Codes;
        };
    }

    export interface AuthsState {
        login: {
            result: boolean;
            message: string;
            token: LocalTokenInterface;
        };
    }

    // store 인터페이스.
    export interface RootState {
        router: RouterState;
        app: AppState;
        auths: AuthsState;
    }
}
