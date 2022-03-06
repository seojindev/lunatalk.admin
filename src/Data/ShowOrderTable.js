// import { Tag } from 'antd';

export const columns = [
    {
        title: '결제코드',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '결제품목',
        dataIndex: 'orderName',
        key: 'orderName',
        // render: text => <a>{text}</a>,
    },
    {
        title: '사용자 아이디',
        dataIndex: 'user_id',
        key: 'user_id',
        // render: text => <a>{text}</a>,
    },
    {
        title: '사용자 이메일',
        dataIndex: 'user_email',
        key: 'user_email',
        // render: text => <a>{text}</a>,
    },
    {
        title: '사용자 이름',
        dataIndex: 'user_name',
        key: 'user_name',
        // render: text => <a>{text}</a>,
    },
    {
        title: '사용자 전호번호',
        dataIndex: 'user_phone_number',
        key: 'user_phone_number',
        // render: text => <a>{text}</a>,
    },
    {
        title: '결제금액',
        dataIndex: 'order_price',
        key: 'order_price',
        // render: text => <a>{text}</a>,
    },
    {
        title: '주문상태',
        dataIndex: 'order_active',
        key: 'order_active',
        // render: text => <a>{text}</a>,
    },
    {
        title: '결제상태',
        dataIndex: 'order_state',
        key: 'order_state',
        // render: text => <a>{text}</a>,
    },
    {
        title: '제품상태',
        dataIndex: 'order_delivery',
        key: 'order_delivery',
        // render: text => <a>{text}</a>,
    },
    {
        title: '주문일',
        dataIndex: 'order_created_at',
        key: 'order_created_at',
        // render: text => <a>{text}</a>,
    },
    {
        title: '결제일',
        dataIndex: 'created_at',
        key: 'created_at',
        // render: text => <a>{text}</a>,
    },
];
