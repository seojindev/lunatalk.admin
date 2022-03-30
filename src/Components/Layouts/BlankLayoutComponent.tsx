import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { FooterBar } from '@Element/Bar';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import { PageSpinner } from '@Element/Spinners';

const { Content } = Layout;

export default function BlankLayoutComponent() {
    const { appPageLoading } = useSelector((store: RootState) => ({
        appPageLoading: store.app.pageState.loading,
    }));

    const [viewLoading, setViewLoading] = useState<boolean>(false);

    useEffect(() => {
        setViewLoading(appPageLoading);
    }, [appPageLoading]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    {(() => {
                        if (viewLoading) {
                            return <PageSpinner />;
                        } else {
                            return (
                                <div
                                    style={{
                                        padding: 24,
                                        background: '#fff',
                                        minHeight: '90vh',
                                    }}
                                >
                                    <Outlet />
                                </div>
                            );
                        }
                    })()}
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    );
}
