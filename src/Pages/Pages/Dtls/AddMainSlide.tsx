import React from 'react';
import { Switch, Card, Form, Input, Row, Col, Select, Divider, Button, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as DataProduct from '@Src/Data/Product';

export default function AddMainSlide() {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log('onFinish', values);
        // call save API
    };

    const imageUrl = `${process.env.REACT_APP_MEDIA_URL}/storage/products/rep/8e3121f1cb97b450e3b7623f631dd966811cbfa2/f97ade69-a617-49a3-962e-50dffc9e006a.jpeg`;

    function beforeUpload(file: any) {
        console.debug('beforeUpload', file);
    }

    function handleChange(e: any) {
        console.debug('handleChange', e);
    }

    const uploadButton = (
        <div>
            {true ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Card title="상품 등록" loading={false}>
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
                            label="상품"
                            name="productCategory"
                            rules={[{ required: true, message: '상품을 선택해 주세요.', type: 'string' }]}
                        >
                            <Select>
                                {DataProduct.category.map(item => (
                                    <Select.Option key={item.code} value={item.value}>
                                        {item.value}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="슬라이드 상태"
                            name="productActive"
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                        </Form.Item>
                        <Form.Item label="메모" name="productMemo">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="슬라이드 사진">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
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
