import React from 'react';
import { Tag } from 'antd';

export const visitSummary = [
    { x: '2021-09-18', y: 21 },
    { x: '2021-09-19', y: 9 },
    { x: '2021-09-20', y: 5 },
    { x: '2021-09-21', y: 6 },
    { x: '2021-09-22', y: 14 },
    { x: '2021-09-23', y: 17 },
    { x: '2021-09-24', y: 5 },
    { x: '2021-09-25', y: 3 },
    { x: '2021-09-26', y: 11 },
    { x: '2021-09-27', y: 14 },
    { x: '2021-09-28', y: 12 },
    { x: '2021-09-29', y: 19 },
    { x: '2021-09-30', y: 5 },
    { x: '2021-10-01', y: 20 },
    { x: '2021-10-02', y: 2 },
    { x: '2021-10-03', y: 16 },
    { x: '2021-10-04', y: 11 },
    { x: '2021-10-05', y: 21 },
    { x: '2021-10-06', y: 32 },
    { x: '2021-10-07', y: 16 },
    { x: '2021-10-08', y: 7 },
    { x: '2021-10-09', y: 0 },
    { x: '2021-10-10', y: 11 },
    { x: '2021-10-11', y: 13 },
    { x: '2021-10-12', y: 18 },
    { x: '2021-10-13', y: 13 },
    { x: '2021-10-14', y: 27 },
    { x: '2021-10-15', y: 14 },
    { x: '2021-10-16', y: 2 },
    { x: '2021-10-17', y: 15 },
];

export const movementSummary = [
    { x: '2020-11', y: 0 },
    { x: '2020-12', y: 0 },
    { x: '2021-1', y: 0 },
    { x: '2021-2', y: 0 },
    { x: '2021-3', y: 730 },
    { x: '2021-4', y: 178 },
    { x: '2021-5', y: 0 },
    { x: '2021-6', y: 6 },
    { x: '2021-7', y: 18 },
    { x: '2021-8', y: 222 },
    { x: '2021-9', y: 99 },
    { x: '2021-10', y: 978 },
];

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
            category: ['jewellery', 'accessory'],
        },
        {
            key: '2',
            name: '파란 가방',
            description: 'Vegan-friendly leather',
            qty: 12,
            owner: 'John Green',
            category: ['clothing', 'living'],
        },
        {
            key: '3',
            name: '블랙 가방',
            description: 'This is a metal bracelet',
            qty: 32,
            owner: 'John Brown',
            category: ['jewellery', 'clothing'],
        },
        // ...
    ],
};
