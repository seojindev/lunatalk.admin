import React, { lazy, Suspense } from 'react';
import { PageSpinner } from '@Element/Spinners';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RootState } from 'StoreTypes';
import { useSelector } from 'react-redux';

const DtlPage = lazy(() => import('./Dtls/ShowCategory'));

export default function ShowProductsCategoryPage() {
    const { storeRouterLocation } = useSelector((store: RootState) => ({
        storeRouterLocation: store.router.location,
    }));

    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    :: {process.env.REACT_APP_TITLE} :: {`카테고리`}
                </title>
                <link rel="canonical" href={`${globalThis.location.origin}${storeRouterLocation}`} />
            </Helmet>
            <Suspense fallback={<PageSpinner />}>
                <DtlPage />
            </Suspense>
        </HelmetProvider>
    );
}
