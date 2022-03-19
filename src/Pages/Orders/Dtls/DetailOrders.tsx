import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Card } from 'antd';
import { isEmpty } from '@Helper';
import { getProductOrderDetail } from '@API';
import { productOrderDetailItem } from 'CommonTypes';

export default function DetailOrders() {
    const { uuid } = useParams();
    const [detailInfo, setDetailInfo] = useState<productOrderDetailItem>();
    const [cardLoading, setCardLoading] = useState<boolean>(true);

    useEffect(() => {
        const fnGetOrderDetail = async (uuid: string) => {
            const response = await getProductOrderDetail({ uuid: uuid }).then();
            if (response.status) {
                setDetailInfo(response.payload);
            } else {
                // 에러 났을때??
            }
            setCardLoading(false);
        };

        if (!isEmpty(uuid)) {
            fnGetOrderDetail(String(uuid));
        }
    }, [uuid]);

    useEffect(() => {
        console.debug(detailInfo);
    }, [detailInfo]);
    return (
        <>
            <Card loading={cardLoading}>
                <Descriptions title="주문상세" bordered>
                    <Descriptions.Item label="주문번호">{detailInfo?.uuid}</Descriptions.Item>
                    <Descriptions.Item label="주문상태">
                        {detailInfo?.active === 'Y' ? '주문' : '시도'}
                    </Descriptions.Item>
                    <Descriptions.Item label="주문금액">{detailInfo?.order_price.string}</Descriptions.Item>
                    <Descriptions.Item label="주문명">{detailInfo?.order_name}</Descriptions.Item>
                    <Descriptions.Item label="주문날짜" span={2}>
                        {detailInfo?.created_at.type1}
                    </Descriptions.Item>
                    <Descriptions.Item label="결제구분">
                        {detailInfo?.payments.virtuals ? '가상계좌' : '카드'}
                    </Descriptions.Item>
                    <Descriptions.Item label="결제상태" span={2}>
                        {detailInfo?.state.code_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="사용자 아이디">{detailInfo?.user.login_id}</Descriptions.Item>
                    <Descriptions.Item label="사용자 이름" span={2}>
                        {detailInfo?.user.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="사용자 이메일">{detailInfo?.user.email}</Descriptions.Item>
                    <Descriptions.Item label="사용자 전화번호" span={2}>
                        {detailInfo?.user.phone_number.type2}
                    </Descriptions.Item>
                    <Descriptions.Item label="상품 정보">
                        <pre>
                            {detailInfo?.products.map(e => {
                                return `${e.name} \n`;
                            })}
                        </pre>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
}
