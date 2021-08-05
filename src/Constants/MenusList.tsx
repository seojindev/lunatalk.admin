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
                name: '카테고리 등록',
                key: 'add-product-category',
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
        name: '결제 관리',
        key: 'pays',
        icon: <PayCircleOutlined />,
        list: [
            {
                name: '결제 목록',
                key: 'show-pays',
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
            {
                name: '메인슬라이드 추가',
                key: 'add-main-slide',
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
                key: 'show-sites-notice',
            },
            {
                name: '싸이트 공지사항 추가',
                key: 'add-sites-notice',
            },
            {
                name: '서비스 공지사항',
                key: 'show-services-notice',
            },
            {
                name: '서비스 공지사항 추가',
                key: 'add-services-notice',
            },
        ],
    },
];
