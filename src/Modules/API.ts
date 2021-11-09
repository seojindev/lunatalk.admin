import { _Axios_ } from '@Utils';
import * as CommonTypes from 'CommonTypes';

// 서버 공지 사항 체크.
export function checkServerNotice(): Promise<CommonTypes.ServiceResponse<{ notice: string }>> {
    return _Axios_({ method: 'get', url: '/api/system/check-notice', payload: { data: {} } });
}

// 싸이트 기본 데이터.
export function getBaseData(): Promise<CommonTypes.ServiceResponse<CommonTypes.AppBase>> {
    return _Axios_({ method: 'get', url: '/api/system/base-data', payload: { data: {} } });
}

// 로그인.
export function postLogin(payload: {
    login_id: string;
    login_password: string;
}): Promise<CommonTypes.ServiceResponse<{ access_token: string; refresh_token: string }>> {
    return _Axios_({ method: 'post', url: '/api/admin-front/v1/auth/login', payload: payload });
}

// 상품 카테고리 등록.
export function addProductCategory(payload: { name: string }): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({ method: 'post', url: '/api/admin-front/v1/product/create-product-category', payload: payload });
}

// 상품 카테고리 리스트 가지고 오기.
export function getProductCategory(): Promise<CommonTypes.ServiceResponse<CommonTypes.productCategoryResponse[]>> {
    return _Axios_({ method: 'get', url: '/api/admin-front/v1/product/show-product-category', payload: { data: {} } });
}

// 상품 카테고리 상세
export function getProductCategoryDetail(
    uuid: string
): Promise<CommonTypes.ServiceResponse<CommonTypes.productCategoryDetailResponse>> {
    return _Axios_({
        method: 'get',
        url: `/api/admin-front/v1/product/${uuid}/detail-product-category`,
        payload: { data: {} },
    });
}

// 상품 카테고리 업데이트
export function updateProductCategory(
    uuid: string,
    name: string
): Promise<CommonTypes.ServiceResponse<CommonTypes.productCategoryDetailResponse>> {
    return _Axios_({
        method: 'put',
        url: `/api/admin-front/v1/product/${uuid}/update-product-category`,
        payload: { name: name },
    });
}

// 상품 카테고리 삭제
export function deleteProductCategory(uuid: string[]): Promise<CommonTypes.ServiceResponse<{ message: string }>> {
    return _Axios_({
        method: 'delete',
        url: '/api/admin-front/v1/product/delete-product-categories',
        payload: { uuid: uuid },
    });
}

// 상품 대표 이미지 업로드.
export function uploadProductRepImage(formData: any): Promise<
    CommonTypes.ServiceResponse<{
        status: boolean;
        media_id: number;
        media_full_url: string;
        file_name: string;
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/api/other/v1/media/products/rep/create',
        payload: formData,
    });
}

// 상품 상세 이미지 업로드.
export function uploadProductDetailImage(formData: any): Promise<
    CommonTypes.ServiceResponse<{
        status: boolean;
        media_id: number;
        media_full_url: string;
        file_name: string;
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/api/other/v1/media/products/detail/create',
        payload: formData,
    });
}

// 싸이트 공지사항 이미지 업로드.
export function uploadSitesNoticeImage(formData: any): Promise<
    CommonTypes.ServiceResponse<{
        status: boolean;
        media_id: number;
        media_full_url: string;
        file_name: string;
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/api/other/v1/media/sites/notice/create',
        payload: formData,
    });
}

// 공지 사항 이미지 업로드.
export function uploadSiteNoticeImage(formData: any): Promise<
    CommonTypes.ServiceResponse<{
        status: boolean;
        media_id: number;
        media_full_url: string;
        file_name: string;
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/api/other/v1/media/sites/notice/create',
        payload: formData,
    });
}

// 상품 등록.
export function addProduct({
    name,
    category,
    barcode,
    color,
    wireless,
    original_price,
    price,
    quantity,
    memo,
    sale,
    active,
    rep_image,
    detail_image,
}: {
    name: string;
    category: number;
    barcode: string;
    color: number[];
    wireless: number[];
    original_price: number;
    price: number;
    quantity: number;
    memo: string;
    sale: string;
    active: string;
    rep_image: number[];
    detail_image: number[];
}): Promise<
    CommonTypes.ServiceResponse<{
        uuid: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/api/admin-front/v1/product/create-product',
        payload: {
            name: name,
            category: category,
            barcode: barcode,
            color: color,
            wireless: wireless,
            original_price: original_price,
            price: price,
            quantity: quantity,
            memo: memo,
            sale: sale,
            active: active,
            rep_image: rep_image,
            detail_image: detail_image,
        },
    });
}

// 상품 수정.
export function updateProduct({
    uuid,
    payload: {
        name,
        category,
        barcode,
        color,
        wireless,
        original_price,
        price,
        quantity,
        memo,
        sale,
        active,
        rep_image,
        detail_image,
    },
}: {
    uuid: string;
    payload: {
        name: string;
        category: number;
        barcode: string;
        color: number[];
        wireless: number[];
        original_price: number;
        price: number;
        quantity: number;
        memo: string;
        sale: string;
        active: string;
        rep_image: number[];
        detail_image: number[];
    };
}): Promise<
    CommonTypes.ServiceResponse<{
        uuid: string;
    }>
> {
    return _Axios_({
        method: 'put',
        url: `/api/admin-front/v1/product/${uuid}/update-product`,
        payload: {
            name: name,
            category: category,
            barcode: barcode,
            color: color,
            wireless: wireless,
            original_price: original_price,
            price: price,
            quantity: quantity,
            memo: memo,
            sale: sale,
            active: active,
            rep_image: rep_image,
            detail_image: detail_image,
        },
    });
}

// 상품 리스트.
export function getShowProducts(): Promise<CommonTypes.ServiceResponse<CommonTypes.productListItem[]>> {
    return _Axios_({ method: 'get', url: '/api/admin-front/v1/product/show-product', payload: { data: {} } });
}

// 상품 상세 리스트.
export function getDetailProducts({
    uuid,
}: {
    uuid: string;
}): Promise<CommonTypes.ServiceResponse<CommonTypes.productDeatailResponse>> {
    return _Axios_({
        method: 'get',
        url: `/api/admin-front/v1/product/${uuid}/detail-product`,
        payload: { data: {} },
    });
}

// 메인슬라이드 리스트
export function getMainSlides(): Promise<CommonTypes.ServiceResponse<CommonTypes.MainSlideItem[]>> {
    return _Axios_({
        method: 'get',
        url: '/api/admin-front/v1/page-manage/show-main-slide',
        payload: { data: {} },
    });
}

// 메인 슬라이드 등록
export function addMainSlide(payload: {
    name: string;
    media_id: number;
    link: string;
    product_id: string;
    memo: string;
    active: string;
}): Promise<
    CommonTypes.ServiceResponse<{
        uuid: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/api/admin-front/v1/page-manage/create-main-slide',
        payload,
    });
}

// 메인 슬라이드 삭제
export function deleteMainSlides(uuid: string[]): Promise<CommonTypes.ServiceResponse<{ message: string }>> {
    return _Axios_({
        method: 'delete',
        url: '/api/admin-front/v1/page-manage/delete-main-slides',
        payload: { uuid: uuid },
    });
}

// 메인슬라이드 디테일.
export function getDetailMainSlide({
    uuid,
}: {
    uuid: string;
}): Promise<CommonTypes.ServiceResponse<CommonTypes.mainSlideDetailResponse>> {
    return _Axios_({
        method: 'get',
        url: `/api/admin-front/v1/page-manage/${uuid}/detail-main-slide`,
        payload: { data: {} },
    });
}

// 메인슬라이드 수정.
export function updateMainSlide({
    uuid,
    payload,
}: {
    uuid: string;
    payload: {
        name: string;
        media_id: number;
        link: string;
        product_id: string;
        memo: string;
        active: string;
    };
}): Promise<
    CommonTypes.ServiceResponse<{
        uuid: string;
    }>
> {
    return _Axios_({
        method: 'put',
        url: `/api/admin-front/v1/page-manage/${uuid}/update-main-slide`,
        payload: payload,
    });
}

// 싸이트 공지사항 리스트 가지고 오기.
export function getSiteNoticeList(): Promise<CommonTypes.ServiceResponse<CommonTypes.NoticetItem[]>> {
    return _Axios_({
        method: 'get',
        url: '/api/admin-front/v1/site-manage/show-notice',
        payload: { data: {} },
    });
}

//메인 슬라이드 이미지 등록
export function uploadMainSlideImage(formData: any): Promise<
    CommonTypes.ServiceResponse<{
        status: boolean;
        media_id: number;
        media_full_url: string;
        file_name: string;
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: '/api/other/v1/media/page-manage/main-slide/create',
        payload: formData,
    });
}

// 싸이트 공지사항 등록.
export function createSiteNotice(payload: {
    title: string;
    category: string;
    content: string;
    active: string;
    image: Array<number>;
}): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({ method: 'post', url: '/api/admin-front/v1/site-manage/create-notice', payload });
}

// 싸이트 공지 사항 업데이트.
export function updateSIteNotice(
    uuid: string,
    payload: {
        title: string;
        category: string;
        content: string;
        active: string;
        image: Array<number>;
    }
): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({ method: 'put', url: `/api/admin-front/v1/site-manage/${uuid}/update-notice`, payload });
}

// 싸이트 공지 사항 상세.
export function getSiteNoticeDetail(payload: {
    uuid: string;
}): Promise<CommonTypes.ServiceResponse<CommonTypes.NoticetItem>> {
    return _Axios_({
        method: 'get',
        url: `/api/admin-front/v1/site-manage/${payload.uuid}/detail-notice`,
        payload: { data: [] },
    });
}

// 메인 베스트 아이템 추가.
export function mainBestItemCreate(uuid: string): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({
        method: 'post',
        url: `/api/admin-front/v1/page-manage/${uuid}/create-best-item`,
        payload: { data: [] },
    });
}

// 메인 베스트 아아템 삭제.
export function mainBestItemDelete(uuid: string): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({
        method: 'delete',
        url: `/api/admin-front/v1/page-manage/${uuid}/delete-best-item`,
        payload: { data: [] },
    });
}

// 메인 뉴 아이템 추가.
export function mainNewItemCreate(uuid: string): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({
        method: 'post',
        url: `/api/admin-front/v1/page-manage/${uuid}/create-new-item`,
        payload: { data: [] },
    });
}

// 메인 뉴 아아템 삭제.
export function mainNewItemDelete(uuid: string): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({
        method: 'delete',
        url: `/api/admin-front/v1/page-manage/${uuid}/delete-new-item`,
        payload: { data: [] },
    });
}

// 회원 생성.
export function userCreate(payload: {
    type: string;
    level: string;
    status: string;
    user_id: string;
    user_password: string;
    user_phone_number: string;
    user_name: string;
    user_email: string;
    user_select_email: string;
    user_select_message: string;
    user_memo: string;
}): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({
        method: 'post',
        url: `/api/admin-front/v1/user-manage/create-user`,
        payload: payload,
    });
}

export function getUserList(): Promise<CommonTypes.ServiceResponse<Array<CommonTypes.userListResponseItem>>> {
    return _Axios_({
        method: `get`,
        url: `/api/admin-front/v1/user-manage/show-user`,
        payload: { data: [] },
    });
}

export function getUserDetail({
    uuid,
}: {
    uuid: string;
}): Promise<CommonTypes.ServiceResponse<CommonTypes.userDetailResponseItem>> {
    return _Axios_({
        method: `get`,
        url: `/api/admin-front/v1/user-manage/${uuid}/detail-user`,
        payload: { data: [] },
    });
}

export function updateUser({
    uuid,
    payload,
}: {
    uuid: string;
    payload: {
        type: string;
        level: string;
        status: string;
        user_name: string;
        user_email: string;
        user_memo: string;
        user_select_email: 'Y' | 'N';
        user_select_message: 'Y' | 'N';
    };
}): Promise<CommonTypes.ServiceResponse<{ uuid: string }>> {
    return _Axios_({
        method: `put`,
        url: `/api/admin-front/v1/user-manage/${uuid}/update-user`,
        payload: payload,
    });
}

// 메인 베스트 아아템 리스트
// export function mainBestItemList(uuid: string): Promise<
//     CommonTypes.ServiceResponse<{
//         uuid: string;
//         product: {
//             uuid: string;
//         };
//     }>
// > {
//     return _Axios_({
//         method: 'delete',
//         url: `/api/admin-front/v1/page-manage/show-best-item`,
//         payload: { data: [] },
//     });
// }

// 메인 뉴 아아템 리스트
// export function mainNewItemList(uuid: string): Promise<
//     CommonTypes.ServiceResponse<{
//         uuid: string;
//         product: {
//             uuid: string;
//         };
//     }>
// > {
//     return _Axios_({
//         method: 'delete',
//         url: `/api/admin-front/v1/page-manage/show-new-item`,
//         payload: { data: [] },
//     });
// }
