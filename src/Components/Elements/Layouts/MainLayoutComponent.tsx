import React, { useState } from 'react';
import { Layout } from 'antd';
import { SideBar, TopBar, FooterBar } from '@Element/Bar';

const { Content } = Layout;

export default function MainLayoutComponent({ children }: { children: any }) {
    const [collapsed, setCollapsed] = useState(false);

    const handleOnCollapse = () => {
        setCollapsed(prevState => !prevState);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideBar collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
            <Layout>
                <TopBar collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 20 }}>{children}</div>
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    );
}
