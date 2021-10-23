import React from 'react';
import History from '@Module/History';
import { Tag, Button, message } from 'antd';
import * as _API from '@API';

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
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: '가격',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '메인 아이템',
        dataIndex: 'main_item',
        key: 'main_item',
        render: main_item => {
            return (
                <>
                    {main_item.best_item === true ? <Tag color={`blue`}>BESTITEM</Tag> : ``}
                    {main_item.new_item === true ? <Tag color={`green`}>NEWITEM</Tag> : ``}
                </>
            );
        },
    },
    {
        title: '메인 아이템 추가',
        dataIndex: 'main_item',
        key: 'main_item',
        render: main_item => {
            const addBestItem = async () => {
                const response = await _API.mainBestItemCreate(main_item.uuid);
                if (response.status) {
                    main_item.created();
                } else {
                    message.error(response.message);
                }
            };

            const removeBestItem = async () => {
                const response = await _API.mainBestItemDelete(main_item.uuid);
                if (response.status) {
                    main_item.deleted();
                } else {
                    message.error(response.message);
                }
            };

            const addNewItem = async () => {
                const response = await _API.mainNewItemCreate(main_item.uuid);
                if (response.status) {
                    main_item.created();
                } else {
                    message.error(response.message);
                }
            };

            const removeNewItem = async () => {
                const response = await _API.mainNewItemDelete(main_item.uuid);
                if (response.status) {
                    main_item.deleted();
                } else {
                    message.error(response.message);
                }
            };

            return (
                <>
                    {main_item.best_item === true ? (
                        <Button type="danger" shape="circle" onClick={() => removeBestItem()}>
                            베스트
                        </Button>
                    ) : (
                        <Button type="primary" shape="circle" onClick={() => addBestItem()}>
                            베스트
                        </Button>
                    )}
                    {main_item.new_item === true ? (
                        <Button type="danger" shape="circle" onClick={() => removeNewItem()}>
                            뉴
                        </Button>
                    ) : (
                        <Button type="primary" shape="circle" onClick={() => addNewItem()}>
                            뉴
                        </Button>
                    )}
                </>
            );
        },
    },
];
