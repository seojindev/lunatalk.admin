import React, { lazy, Suspense } from 'react';
import { PageSpinner } from '@Element/Spinners';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RootState } from 'StoreTypes';
import { useSelector } from 'react-redux';

const DtlPage = lazy(() => import('./Dtls/DetailOrders'));

export default function DetailOrdersPage() {
    const { storeRouterLocation } = useSelector((store: RootState) => ({
        storeRouterLocation: store.router.location,
    }));

    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    :: {process.env.REACT_APP_TITLE} :: {`주문 상세 정보`}
                </title>
                <link rel="canonical" href={`${globalThis.location.origin}${storeRouterLocation}`} />
            </Helmet>
            <Suspense fallback={<PageSpinner />}>
                <DtlPage />
            </Suspense>
        </HelmetProvider>
    );
}
