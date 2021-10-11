import React from 'react';
import { Tag, Badge } from 'antd';
import History from '@Module/History';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        render: title => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/sites/${title.uuid}/detail-site-notice`,
                    });
                }}
            >
                {title.title}
            </a>
        ),
    },
    {
        title: '카테고리',
        key: 'category',
        dataIndex: 'category',
        render: category => (
            <>
                {(() => {
                    return <Tag color="geekblue">{category.code_name}</Tag>;
                })()}
            </>
        ),
    },
    {
        title: '상태',
        key: 'active',
        dataIndex: 'active',
        render: active => (
            <>
                {(() => {
                    if (active === 'Y') {
                        return <Badge status="processing" text="정상" />;
                    } else if (active === 'N') {
                        return <Badge Error="" text="감춤" />;
                    }
                })()}
            </>
        ),
    },
    {
        title: '등록일',
        dataIndex: 'created_at',
        key: 'created_at',
        // render: text => <a>{text}</a>,
    },
];
