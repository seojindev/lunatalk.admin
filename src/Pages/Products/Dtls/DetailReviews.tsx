import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Button, Card, Form, Input, Divider, Row, message } from 'antd';
import { isEmpty } from '@Helper';
import * as API from '@API';
import History from '@Module/History';

export default function DetailReviews() {
    const [visible, setVisible] = useState(true);
    const params = useParams<{ id: string }>();
    const [form] = Form.useForm();

    const [formInitialData, setFormInitialData] = useState<{
        reviewTitle: string;
        reviewContents: string;
        created_at: string;
    }>();

    const [detailInfo, setDetailInfo] = useState<{
        id: number;
        user: {
            id: number;
            name: string;
            email: string;
        };
        product: {
            id: number;
            uuid: string;
            name: string;
        };
        title: string;
        contents: string;
        created_at: string;
        answer: {
            title: string;
            contents: string;
            created_at: string;
        };
    }>();

    const handleSave = async (data: { reviewTitle: string; reviewContents: string }) => {
        const response = await API.productReviewAnswer(Number(params.id), {
            title: data.reviewTitle,
            contents: data.reviewContents,
        });

        if (response.status) {
            message.success(response.payload.message);
        } else {
            message.error(response.message);
        }
    };

    // 페이지 로딩시 데이터 가지고 오기.
    useEffect(() => {
        const fnGetDetail = async () => {
            //
            const response = await API.getProductReviewDetail(Number(params.id));

            if (response.status) {
                setDetailInfo(response.payload);

                setFormInitialData({
                    reviewTitle: response.payload.answer?.title ? response.payload.answer.title : '',
                    reviewContents: response.payload.answer?.contents ? response.payload.answer.contents : '',
                    created_at: response.payload.answer?.created_at ? response.payload.answer.created_at : '',
                });
                setVisible(false);
            } else {
                // TODO: 에러 처리.
            }
        };

        if (!isEmpty(params.id)) {
            fnGetDetail().then();
        }
    }, []);

    return (
        <>
            <Card loading={visible}>
                <Descriptions
                    bordered
                    title="상품 정보"
                    size="middle"
                    column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                    colon={true}
                    labelStyle={{ width: '20%' }}
                >
                    <Descriptions.Item label="상품">
                        <a
                            onClick={() => {
                                History.push({
                                    pathname:
                                        process.env.PUBLIC_URL + `/products/${detailInfo?.product.uuid}/detail-product`,
                                });
                            }}
                        >
                            {detailInfo?.product.name}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="제목">{detailInfo?.title}</Descriptions.Item>
                    <Descriptions.Item label="내용">
                        <pre>{detailInfo?.contents}</pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="등록일">
                        <pre>{detailInfo?.created_at}</pre>
                    </Descriptions.Item>
                </Descriptions>
                <Divider />
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    name="product-form"
                    onFinish={handleSave}
                    initialValues={formInitialData}
                >
                    <Form.Item
                        label="제목"
                        name="reviewTitle"
                        rules={[{ required: true, message: '제목을 입력해 주세요.', type: 'string' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="답글"
                        name="reviewContents"
                        rules={[{ required: true, message: '내용을 입력해 주세요.', type: 'string' }]}
                    >
                        <Input.TextArea rows={7} />
                    </Form.Item>
                    <Divider />
                    <Row justify="center">
                        <Button type="primary" htmlType="submit">
                            저장
                        </Button>
                    </Row>
                </Form>
            </Card>
        </>
    );
}
