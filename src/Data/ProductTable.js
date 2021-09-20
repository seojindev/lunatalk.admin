import React from 'react';
import History from '@Module/History';
import { Tag } from 'antd';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'uuid',
    },
    {
        title: '상품명',
        dataIndex: 'product',
        key: 'product',
        render: product => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/products/${product.uuid}/detail-product`,
                    });
                }}
            >
                {product.name}
            </a>
        ),
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'category',
        render: category => (
            <>
                <Tag color={`blue`}>{category.toUpperCase()}</Tag>
            </>
        ),
    },
    {
        title: '컬러',
        dataIndex: 'color',
        key: 'color',
        render: color => {
            return (
                <>
                    {color.map(name => {
                        return (
                            <Tag color={`blue`} key={name}>
                                {name.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            );
        },
    },
    {
        title: '유/무선',
        dataIndex: 'wireless',
        key: 'wireless',
        render: wireless => {
            return (
                <>
                    <Tag color={`blue`}>{wireless}</Tag>
                </>
            );
        },
    },
    {
        title: '제고',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: '가격',
        dataIndex: 'price',
        key: 'price',
    },
];
