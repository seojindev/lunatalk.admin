import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MainLayout, BlankLayout } from '@Layouts';

// import PagesList from '@Constants/RoutesList.json';
// import { BodySpinner } from '@Element/Spinners';

// blankLayout
import TestPage from '@Page/TestPage';
import SamplePage from '@Page/SamplePage';
import DefaultPage from '@Page/DefaultPage';
import LoginPage from '@Page/Auths/LoginPage';
import LogoutPage from '@Page/Auths/LogoutPage';
// blankLayout

// MainLayout
import Dashboard from '@Page/Mains/Dashboard';
import ShowProductsCategoryPage from '@Page/Products/ShowProductsCategoryPage';
import AddProductsCategoryPage from '@Page/Products/AddProductsCategoryPage';
import UpdateProductsCategoryPage from '@Page/Products/UpdateProductsCategoryPage';
import AddProductBadgePage from '@Page/Products/AddProductBadgePage';
import ShowProductBadgePage from '@Page/Products/ShowProductBadgePage';
import DetailProductBadgePage from '@Page/Products/DetailProductBadgePage';
import ShowProductsPage from '@Page/Products/ShowProductsPage';
import DetailProductPage from '@Page/Products/DetailProductPage';
import AddProductPage from '@Page/Products/AddProductPage';
import UpdateProductPage from '@Page/Products/UpdateProductPage';
import ShowReviewsPage from '@Page/Products/ShowReviewsPage';
import DetailReviewsPage from '@Page/Products/DetailReviewsPage';
import ShowUsersPage from '@Page/Users/ShowUsersPage';
import AddUsersPage from '@Page/Users/AddUsersPage';
import DetailUsersPage from '@Page/Users/DetailUsersPage';
import ShowOrdersPage from '@Page/Orders/ShowOrdersPage';
import DetailOrdersPage from '@Page/Orders/DetailOrdersPage';
import ShowMainSlidePage from '@Page/Pages/ShowMainSlidePage';
import AddUpdateMainSlidePage from '@Page/Pages/AddUpdateMainSlidePage';
import DetailMainSlidePage from '@Page/Pages/DetailMainSlidePage';
import ShowSiteNoticesPage from '@Page/Sites/ShowSiteNoticesPage';
import AddSiteNoticesPage from '@Page/Sites/AddSiteNoticesPage';
import DetailSiteNoticesPage from '@Page/Sites/DetailSiteNoticesPage';
import UpdateSiteNoticesPage from '@Page/Sites/UpdateSiteNoticesPage';
import ShowServiceNoticePage from '@Page/Sites/ShowServiceNoticePage';

// MainLayout

const RootRoutes = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route element={<BlankLayout />}>
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/sample" element={<SamplePage />} />
                    <Route path="/default" element={<DefaultPage />} />
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/logout" element={<LogoutPage />} />
                </Route>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products/show-product-category" element={<ShowProductsCategoryPage />} />
                    <Route path="/products/add-product-category" element={<AddProductsCategoryPage />} />
                    <Route
                        path="/products/update-product-category/:category_uuid"
                        element={<UpdateProductsCategoryPage />}
                    />
                    <Route path="/products/add-product-badge" element={<AddProductBadgePage />} />
                    <Route path="/products/show-product-badge" element={<ShowProductBadgePage />} />
                    <Route path="/products/:id/detail-product-badge" element={<DetailProductBadgePage />} />
                    <Route path="/products/show-products" element={<ShowProductsPage />} />
                    <Route path="/products/:product_uuid/detail-product" element={<DetailProductPage />} />
                    <Route path="/products/add-product" element={<AddProductPage />} />
                    <Route path="/products/:product_uuid/update-product" element={<UpdateProductPage />} />
                    <Route path="/products/show-reviews" element={<ShowReviewsPage />} />
                    <Route path="/products/:id/detail-reviews" element={<DetailReviewsPage />} />
                    <Route path="/users/show-users" element={<ShowUsersPage />} />
                    <Route path="/users/add-users" element={<AddUsersPage />} />
                    <Route path="/users/:uuid/detail-users" element={<DetailUsersPage />} />
                    <Route path="/orders/show-orders" element={<ShowOrdersPage />} />
                    <Route path="/orders/show-orders/:uuid/detail" element={<DetailOrdersPage />} />
                    <Route path="/pages/show-main-slide" element={<ShowMainSlidePage />} />
                    <Route path="/pages/add-main-slide" element={<AddUpdateMainSlidePage />} />
                    <Route path="/pages/update-main-slide/:slide_uuid" element={<AddUpdateMainSlidePage />} />
                    <Route path="/pages/:slide_uuid/detail-main-slide" element={<DetailMainSlidePage />} />
                    <Route path="/sites/show-site-notice" element={<ShowSiteNoticesPage />} />
                    <Route path="/sites/add-site-notice" element={<AddSiteNoticesPage />} />
                    <Route path="/sites/:uuid/detail-site-notice" element={<DetailSiteNoticesPage />} />
                    <Route path="/sites/:uuid/update-site-notice" element={<UpdateSiteNoticesPage />} />
                    <Route path="/sites/show-service-notice" element={<ShowServiceNoticePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RootRoutes;
