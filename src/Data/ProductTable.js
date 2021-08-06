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
        title: 'UUID',
        dataIndex: 'uuid',
        key: 'uuid',
        render: text => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/products/${text}/detail-product`,
                    });
                }}
            >
                {text}
            </a>
        ),
    },
    {
        title: '상품명',
        dataIndex: 'name',
        key: 'name',
        render: text => (
            <a
                onClick={e => {
                    console.debug(e);
                }}
            >
                {text}
            </a>
        ),
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
            uuid: '02044820563-57378387982-05071466738',
            name: '핑크 가방',
            description: '필크',
            qty: 32,
            owner: 'John Brown',
            category: ['jewellery'],
        },
        {
            key: '2',
            uuid: '31166073535-23002777704-14457730101',
            name: '파란 가방',
            description: 'Vegan-friendly leather',
            qty: 12,
            owner: 'John Green',
            category: ['living'],
        },
        {
            key: '3',
            uuid: '05536136307-83877962299-01693136394',
            name: '블랙 가방',
            description: 'This is a metal bracelet',
            qty: 32,
            owner: 'John Brown',
            category: ['clothing'],
        },
        // ...
    ],
};
