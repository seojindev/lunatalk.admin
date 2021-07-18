declare module 'StoreTypes' {
    import { RouterState } from 'connected-react-router';
    import { Codes } from 'CommonTypes';
    import { Login } from 'ServiceTypes';

    // App Store
    export interface AppState {
        loading: boolean;
        status: boolean;
        loginState: boolean;
        service_message: string;
        common: {
            codes: Codes;
        };
        loginUser: Login;
    }

    // store 인터페이스.
    export interface RootState {
        router: RouterState;
        app: AppState;
    }
}
