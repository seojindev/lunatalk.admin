import React from 'react';
import { Card, Form, Input, Row, Col, Divider, Button } from 'antd';

export default function AddCategory() {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log('onFinish', values);
        // call save API
    };

    return (
        <Card title="카테고리 등록" loading={false}>
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
                            <Input />
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
    );
}
