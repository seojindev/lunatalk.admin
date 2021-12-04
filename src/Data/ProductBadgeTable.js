// import History from '@Module/History';
import React from 'react';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '이름',
        key: 'data',
        dataIndex: 'data',
        render: data => <div>{data.name}</div>,
    },
    {
        title: '이미지',
        key: 'data',
        dataIndex: 'data',
        render: data => <img src={data.image.url} />,
    },
];
