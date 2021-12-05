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

    export interface ProductColorOptionItem {
        id: number;
        name: string;
    }

    export interface ProductWirelessOptionItem {
        id: number;
        wireless: string;
    }

    export interface ProductDetailImageItem {
        id: number;
        file_name: string;
        url: string;
    }

    export interface ColorOptionListItem {
        id: number;
        name: string;
        eng_name: string;
    }

    export interface WirelessOptionsListItem {
        id: number;
        wireless: string;
    }

    export interface OptionItem {
        id: number;
        color: ProductColorOptionItem[] | null;
        wireless: ProductWirelessOptionItem | null;
    }

    export interface productListColorItem {
        id: number;
        name: string;
    }

    export interface productListWirelessItem {
        id: number;
        wireless: string;
    }

    export interface productBadgeItem {
        id: number;
        name: string;
        image: {
            id: number;
            file_name: string;
            url: string;
        };
    }

    export interface productListItem {
        id: number;
        uuid: string;
        name: string;
        quantity: {
            number: number;
            string: string;
        };
        original_price: {
            number: number;
            string: string;
        };
        price: {
            number: number;
            string: string;
        };
        category: {
            id: number;
            uuid: string;
            name: string;
        };
        color: productListColorItem[];
        wireless: productListWirelessItem;
        badge: productBadgeItem[];
        best_item: boolean;
        new_item: boolean;
    }

    export interface ProductsCategoryItms {
        id: number;
        uuid: string;
        name: string;
    }

    export interface Products {
        category: ProductsCategoryItms[];
        list: productListItem[];
        color_options: ColorOptionListItem[];
        wireless_options: WirelessOptionsListItem[];
        badge: productBadgeItem[];
    }

    // 기본 데이터들.
    export interface AppBase {
        codes: Codes[];
        products: Products;
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
            '010': CodeItem[];
            '110': CodeItem[];
            '120': CodeItem[];
            '130': CodeItem[];
            '210': CodeItem[];
            '220': CodeItem[];
            '300': CodeItem[];
            '400': CodeItem[];
        };
    }

    // 상품 카테고리 아이템
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

    // 상품 카테고리 결과
    interface productCategoryResponse {
        id: number;
        uuid: string;
        name: string;
        products_count: number;
    }

    // 상품 카테고리 상세 결과.
    interface productCategoryDetailResponse {
        uuid: string;
        name: string;
    }

    // 상품 상세 정보 결과.
    interface productDeatailResponse {
        uuid: string;
        category: {
            id: number;
            name: string;
        };
        name: string;
        barcode: string;
        original_price: {
            number: number;
            string: string;
        };
        price: {
            number: number;
            string: string;
        };
        quantity: {
            number: number;
            string: string;
        };
        memo: string;
        sale: string;
        active: string;
        color: productListColorItem[];
        wireless: ProductWirelessOptionItem;
        badge: productBadgeItem[];
        rep_images: ProductDetailImageItem[];
        detail_images: ProductDetailImageItem[];
    }

    // 메인 슬라이드 리스트 아이템
    export interface MainSlideItem {
        id: number;
        uuid: string;
        name: string;
        active: string;
    }

    export interface NoticetItem {
        id: number;
        uuid: string;
        category: CodeItem;
        title: string;
        content: {
            default: string;
        };
        active: string;
        images: array<{
            uid: string;
            url: string;
            file_name: string;
        }>;
        created_at: string;
        updated_at: string;
    }

    // 메인 슬라이드 상세 결과.
    interface mainSlideDetailResponse {
        uuid: string;
        name: string;
        active: string;
        image: {
            file_name: string;
            id: number;
            url: string;
        };
        link: string;
        product_id: number;
        product_uuid: string;
        product_name: string;
        memo: string;
    }

    interface userListResponseItem {
        id: number;
        uuid: string;
        client: CodeItem;
        type: CodeItem;
        level: CodeItem;
        status: CodeItem;
        login_id: string;
        name: string;
        email: string;
        phone_number: string;
        active: 'Y' | 'N';
        created_at: string;
        updated_at: string;
    }

    interface userDetailResponseItem {
        id: number;
        uuid: string;
        client: CodeItem;
        type: CodeItem;
        level: CodeItem;
        status: CodeItem;
        login_id: string;
        name: string;
        email: string;
        active: 'Y' | 'N';
        user_select: {
            email: 'Y' | 'N';
            message: 'Y' | 'N';
        };
        phone_verifies: {
            uuid: string;
            phone_number: string;
            auth_code: string;
            verified: 'Y' | 'N';
        };
        memo: string;
        created_at: string;
        updated_at: string;
    }
}
