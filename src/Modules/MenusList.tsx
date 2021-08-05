import React, { lazy, Suspense } from 'react';
import {
    DashboardOutlined,
    FundProjectionScreenOutlined,
    PartitionOutlined,
    SlidersOutlined,
    TeamOutlined,
    PayCircleOutlined,
} from '@ant-design/icons';

export const menus = [
    {
        name: '대시보드',
        key: 'dashboard',
        icon: <DashboardOutlined />,
        list: [],
    },
    {
        name: '상품관리',
        key: 'products',
        icon: <PartitionOutlined />,
        list: [
            {
                name: '카테고리',
                key: 'show-product-catgory',
            },
            {
                name: '카테고리 등록',
                key: 'add-product-catgory',
            },
            {
                name: '상품보기',
                key: 'show-products',
            },
            {
                name: '상품 등록',
                key: 'add-products',
            },
        ],
    },
    {
        name: '회원관리',
        key: 'customers',
        icon: <TeamOutlined />,
        list: [
            {
                name: '회원리스트',
                key: 'show-customers',
            },
        ],
    },
    {
        name: '싸이트관리',
        key: 'sites',
        icon: <SlidersOutlined />,
        list: [
            {
                name: '메인슬라이드',
                key: 'show-main-slade',
            },
        ],
    },
];
