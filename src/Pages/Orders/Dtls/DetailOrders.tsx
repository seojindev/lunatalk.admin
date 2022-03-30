import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Card, Input, Select, Button, message, Col } from 'antd';
import { isEmpty } from '@Helper';
import { getProductOrderDetail } from '@API';
import { productOrderDetailItem } from 'CommonTypes';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import { orderChangeDelivery, orderChangeMemo } from '@API';

export default function DetailOrders() {
    const { uuid } = useParams();
    const { TextArea } = Input;
    const { Option } = Select;
    const [detailInfo, setDetailInfo] = useState<productOrderDetailItem>();
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    const { commonCodeGroup } = useSelector((store: RootState) => ({
        commonCodeGroup: store.app.common.codes.code_group,
    }));
    const [deliveryState, setDeliveryState] = useState<string>();
    const [memoState, setMemoState] = useState<string>('');

    useEffect(() => {
        const fnGetOrderDetail = async (uuid: string) => {
            const response = await getProductOrderDetail({ uuid: uuid }).then();
            if (response.status) {
                setDetailInfo(response.payload);
                setDeliveryState(response.payload.delivery.code_id);
                setMemoState(response.payload.memo);
            } else {
                // 에러 났을때??
            }
            setCardLoading(false);
        };

        if (!isEmpty(uuid)) {
            fnGetOrderDetail(String(uuid)).then();
        }
    }, [uuid]);

    const handleDeliveryChange = (e: string) => {
        setDeliveryState(e);
    };

    const handleOrderMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemoState(e.target.value);
    };

    // 배송 상태 변경.
    const handleClickDeliveryButtonClick = async () => {
        const response = await orderChangeDelivery({
            uuid: String(uuid),
            code: String(deliveryState),
        });

        if (response.status) {
            message.success(response.payload.message);
        } else {
            // 에러 났을때?
        }
    };

    const handleClickOrderMemoButtonClick = async () => {
        const response = await orderChangeMemo({
            uuid: String(uuid),
            memo: String(memoState),
        });

        if (response.status) {
            message.success(response.payload.message);
        } else {
            // 에러 났을때?
        }
    };

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
                        {detailInfo?.payments?.cards ? '카드' : '가상계좌'}
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
                    <Descriptions.Item label="상품 정보" span={3}>
                        <pre>
                            {detailInfo?.products.map(e => {
                                return `${e.name} \n`;
                            })}
                        </pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="배송 상태" span={3}>
                        <Select
                            defaultValue={deliveryState}
                            style={{ width: 300, paddingRight: 6 }}
                            onChange={handleDeliveryChange}
                        >
                            {commonCodeGroup &&
                                commonCodeGroup['520'].map(e => {
                                    return (
                                        <Option key={e.code_id} value={e.code_id}>
                                            {e.code_name}
                                        </Option>
                                    );
                                })}
                        </Select>
                        <Button type={`primary`} onClick={handleClickDeliveryButtonClick}>
                            변경
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="메모" span={3}>
                        <TextArea rows={10} onChange={handleOrderMemoChange} defaultValue={memoState} />
                        <Col style={{ paddingTop: 10 }}>
                            <Button type={`primary`} onClick={handleClickOrderMemoButtonClick}>
                                저장
                            </Button>
                        </Col>
                    </Descriptions.Item>
                    <Descriptions.Item label="결제 정보 상세" span={3}>
                        <TextArea value={JSON.stringify(detailInfo?.payments ? detailInfo.payments : '', null, 2)} />
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
}
