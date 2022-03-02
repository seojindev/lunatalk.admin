import React from 'react';
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
                key: 'show-product-category',
            },
            {
                name: '배지 관리',
                key: 'show-product-badge',
            },
            {
                name: '상품',
                key: 'show-products',
            },
            {
                name: '리뷰관리',
                key: 'show-reviews',
            },
        ],
    },
    {
        name: '회원관리',
        key: 'users',
        icon: <TeamOutlined />,
        list: [
            {
                name: '회원',
                key: 'show-users',
            },
        ],
    },
    {
        name: '주문 관리',
        key: 'orders',
        icon: <PayCircleOutlined />,
        list: [
            {
                name: '주문목록',
                key: 'show-orders',
            },
        ],
    },
    {
        name: '페이지관리',
        key: 'pages',
        icon: <FundProjectionScreenOutlined />,
        list: [
            {
                name: '메인슬라이드',
                key: 'show-main-slide',
            },
        ],
    },
    {
        name: '싸이트 관리',
        key: 'sites',
        icon: <SlidersOutlined />,
        list: [
            {
                name: '싸이트 공지사항',
                key: 'show-site-notice',
            },
            {
                name: '서비스 공지사항',
                key: 'show-service-notice',
            },
        ],
    },
];
