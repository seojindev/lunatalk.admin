declare module 'StoreTypes' {
    import { RouterState } from 'connected-react-router';
    import { Login, Codes } from 'CommonTypes';
    import { Login } from 'ServiceTypes';

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
        loginUser: Login;
    }

    export interface AuthsState {}

    // store 인터페이스.
    export interface RootState {
        router: RouterState;
        app: AppState;
        auths: AuthsState;
    }
}
