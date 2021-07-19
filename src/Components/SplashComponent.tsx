import React, { useEffect } from 'react';
import { useRoot } from '@Hooks';
import { PageSpinner } from '@Element/Spinners';

export default function SplashComponent({ appLoading }: { appLoading: () => void }) {
    const { AppBaseCheckState } = useRoot();

    useEffect(() => {
        const setAppMainLoading = (loading: boolean) => {
            if (loading === true) {
                appLoading();
            }
        };

        setAppMainLoading(AppBaseCheckState);
    }, [AppBaseCheckState]);

    return (
        <>
            <PageSpinner />
        </>
    );
}
