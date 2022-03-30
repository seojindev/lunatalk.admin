import React from 'react';
import History from '@Module/History';
import { Tag } from 'antd';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '상품명',
        dataIndex: 'data',
        key: 'data',
        render: data => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/products/${data.product.uuid}/detail-product`,
                    });
                }}
            >
                {data.product.name}
            </a>
        ),
    },
    {
        title: '사용자',
        dataIndex: 'data',
        key: 'data',
        render: data => (
            <>
                <div>{data.user.name}</div>
            </>
        ),
    },
    {
        title: '제목',
        dataIndex: 'data',
        key: 'data',
        render: data => {
            return (
                <>
                    <a
                        onClick={() => {
                            History.push({
                                pathname: process.env.PUBLIC_URL + `/products/${data.id}/detail-reviews`,
                            });
                        }}
                    >
                        {data.title}
                    </a>
                </>
            );
        },
    },
    {
        title: '등록일',
        dataIndex: 'data',
        key: 'data',
        render: data => {
            return (
                <>
                    <Tag color={`blue`}>{data.created_at}</Tag>
                </>
            );
        },
    },
];
