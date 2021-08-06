import React from 'react';
import { Card, Form, Input, Row, Col, Divider, Button } from 'antd';

export default function AddSiteNotices() {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log('onFinish', values);
        // call save API
    };

    return (
        <Card title="서비스 공지사항" loading={false}>
            <Row justify="center">
                <Col span={12}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        form={form}
                        name="notice-form"
                        onFinish={handleSave}
                    >
                        <Form.Item label="내용" name="productMemo">
                            <Input.TextArea rows={4} />
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
