import React from 'react';
import { Tag } from 'antd';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '상품명',
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
    {
        title: '제고',
        dataIndex: 'qty',
        key: 'qty',
    },
];

export const data = {
    totalElements: 8,
    content: [
        {
            key: '1',
            name: '핑크 가방',
            description: '필크',
            qty: 32,
            owner: 'John Brown',
            category: ['jewellery'],
        },
        {
            key: '2',
            name: '파란 가방',
            description: 'Vegan-friendly leather',
            qty: 12,
            owner: 'John Green',
            category: ['living'],
        },
        {
            key: '3',
            name: '블랙 가방',
            description: 'This is a metal bracelet',
            qty: 32,
            owner: 'John Brown',
            category: ['clothing'],
        },
        // ...
    ],
};
