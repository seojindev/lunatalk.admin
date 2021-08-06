// import React from 'react';
// import { Tag } from 'antd';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '결제일',
        dataIndex: 'date',
        key: 'date',
        // render: text => <a>{text}</a>,
    },
    {
        title: '상품',
        dataIndex: 'product',
        key: 'product',
        // render: text => <a>{text}</a>,
    },
    {
        title: '등록일',
        dataIndex: 'created_at',
        key: 'created_at',
        // render: text => <a>{text}</a>,
    },
];

export const data = {
    totalElements: 3,
    content: [
        {
            key: '1',
            date: '2021-08-03 08:30',
            payCode: 'F129393471020381230DF',
            product: '가방',
            user_id: 'testuser',
            user_name: '테스트 사용자',
            login_id: 'testuser',
            name: '테스트유저',
            email: 'test@test.com',
            phone_number: '010-1234-1234',
            created_at: '2021년 8월 6일',
        },
        {
            key: '2',
            date: '2021-08-03 08:30',
            payCode: 'F129393471020381230DF',
            product: '가방',
            user_id: 'testuser',
            user_name: '테스트 사용자',
            login_id: 'testuser',
            name: '테스트유저',
            email: 'test@test.com',
            phone_number: '010-1234-1234',
            created_at: '2021년 8월 6일',
        },
        {
            key: '3',
            date: '2021-08-03 08:30',
            payCode: 'F129393471020381230DF',
            product: '가방',
            user_id: 'testuser',
            user_name: '테스트 사용자',
            login_id: 'testuser',
            name: '테스트유저',
            email: 'test@test.com',
            phone_number: '010-1234-1234',
            created_at: '2021년 8월 6일',
        },
    ],
};
