import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Divider, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { addProductCategory } from '@API';
import { useLoading } from '@Hooks';

export default function AddCategory() {
    const navigate = useNavigate();

    const { loadingControl } = useLoading();

    const [form] = Form.useForm();
    const [cardLoading, setCardLoading] = useState<boolean>(false);
    const handleSave = async (values: { categoryName: string }) => {
        await loadingControl({
            type: 'fetch',
        });
        const { status } = await addProductCategory({ name: values.categoryName });
        if (status) {
            await loadingControl({
                type: 'success',
            });
            message.success('정상 처리 하였습니다.');
            navigate({ pathname: `${process.env.PUBLIC_URL}/products/show-product-category` });
        } else {
            await loadingControl({
                type: 'error',
            });
            message.error('문제가 발생했습니다.');
        }
        setCardLoading(false);

        return () => {
            //
        };
    };

    return (
        <>
            <Card title="카테고리 등록" loading={cardLoading}>
                <Row justify="center">
                    <Col span={12}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            form={form}
                            name="product-form"
                            onFinish={handleSave}
                        >
                            <Form.Item
                                label="카테고리명"
                                name="categoryName"
                                rules={[{ required: true, message: '상품명을 입력해 주세요.', type: 'string' }]}
                            >
                                <Input placeholder="상품명을 입력해 주세요." />
                            </Form.Item>
                            <Divider />
                            <Row justify="center">
                                <Button type="primary" htmlType="submit">
                                    저장
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    );
}
