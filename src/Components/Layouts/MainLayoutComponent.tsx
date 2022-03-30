import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { SideBar, TopBar, FooterBar } from '@Element/Bar';
import { RootState } from 'StoreTypes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import _Alert_ from '@_Alert_';
const { Content } = Layout;

export default function MainLayoutComponent() {
    const navigate = useNavigate();
    const { appLoginState } = useSelector((store: RootState) => ({
        appLoginState: store.app.loginState,
    }));

    const [collapsed, setCollapsed] = useState(false);

    const handleOnCollapse = () => {
        setCollapsed(prevState => !prevState);
    };

    useEffect(() => {
        if (!appLoginState) {
            _Alert_.error({ text: '로그인이 필요한 서비스 입니다.' });
            navigate({
                pathname: process.env.PUBLIC_URL + `/auth/login`,
            });
        }
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideBar collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
            <Layout>
                <TopBar collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 20 }}>
                        <Outlet />
                    </div>
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    );
}
