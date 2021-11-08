import React from 'react';
// import { Tag } from 'antd';
import History from '@Module/History';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '타입',
        dataIndex: 'type',
        key: 'type',
        // render: text => <a>{text}</a>,
    },
    {
        title: '레벨',
        dataIndex: 'level',
        key: 'level',
        // render: text => <a>{text}</a>,
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        // render: text => <a>{text}</a>,
    },
    {
        title: '아이디',
        dataIndex: 'login_id',
        key: 'login_id',
        render: user => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/users/${user.uuid}/detail-users`,
                    });
                }}
            >
                {user.login_id}
            </a>
        ),
    },
    {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '이메일',
        dataIndex: 'email',
        key: 'email',
        // render: text => <a>{text}</a>,
    },
    {
        title: '전화번호',
        dataIndex: 'phone_number',
        key: 'phone_number',
        // render: text => <a>{text}</a>,
    },
    {
        title: '가입일',
        dataIndex: 'created_at',
        key: 'created_at',
        // render: text => <a>{text}</a>,
    },
];
