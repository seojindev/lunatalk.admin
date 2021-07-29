import React from 'react';
import { Layout } from 'antd';
import { FooterBar } from '@Element/Bar';

const { Content } = Layout;

export default function BlankLayoutComponent({ children }: { children: any }) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            background: '#fff',
                            minHeight: '90vh',
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    );
}
