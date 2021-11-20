import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Row, Col, Divider, Button } from 'antd';
import * as API from '@API';

export default function AddSiteNotices() {
    const [form] = Form.useForm();
    const [cardLoading, setCardLoading] = useState<boolean>(true);

    const [systemNotice, setSystemNotice] = useState<{
        contents: string;
    }>({
        contents: '',
    });

    const handleSave = async (values: { contents: string }) => {
        setCardLoading(true);
        const response = await API.createSystemNotice(values.contents);

        if (response.status) {
            getNotice();
        }
    };

    const getNotice = async () => {
        const response = await API.getSystemNotice();
        if (response.status && response.payload.notice) {
            setSystemNotice({
                contents: response.payload.notice,
            });
        } else {
            setSystemNotice({
                contents: '',
            });
        }

        setCardLoading(false);
    };

    useEffect(() => {
        getNotice().then();
    }, []);

    return (
        <Card title="서비스 공지사항" loading={cardLoading}>
            <Row justify="center">
                <Col span={12}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        form={form}
                        name="notice-form"
                        onFinish={handleSave}
                        initialValues={systemNotice}
                    >
                        <Form.Item label="내용" name="contents">
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
