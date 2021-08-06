import React from 'react';
import { Tag } from 'antd';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '코드',
        dataIndex: 'codeId',
        key: 'codeId',
        render: text => <a>{text}</a>,
    },
    {
        title: '카테고리명',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = 'blue';
                    if (tag === 'accessory') {
                        color = 'volcano';
                    } else if (tag === 'clothing') {
                        color = 'geekblue';
                    } else if (tag === 'jewellery') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: '옵션',
        dataIndex: 'description',
        key: 'description',
    },
];

export const data = {
    totalElements: 4,
    content: [
        {
            key: '1',
            codeId: 'P010110',
            codeName: 'acc',
            name: 'acc',
            description: '액세서리',
            category: ['acc'],
        },
        {
            key: '2',
            codeId: 'P010120',
            codeName: 'bag',
            name: 'bag',
            description: '가방',
            category: ['bag'],
        },
        {
            key: '3',
            codeId: 'P010130',
            codeName: 'stationery',
            name: 'stationery',
            description: '문방구',
            category: ['stationery'],
        },
        {
            key: '4',
            codeId: 'P010140',
            codeName: 'wallet',
            name: 'wallet',
            description: '지갑',
            category: ['wallet'],
        },
        // ...
    ],
};
