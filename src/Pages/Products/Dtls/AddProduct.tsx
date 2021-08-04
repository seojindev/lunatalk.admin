import React, { useState } from 'react';
import { Switch, Card, Form, Input, Row, Col, Select, Divider, Button, InputNumber, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as DataProduct from '@Src/Data/Product';

export default function AddProduct() {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log('onFinish', values);
        // call save API
    };

    const [fileList, setFileList] = useState<any>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        // imgWindow.document.write(image.outerHTML);
    };

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
                            label="상품명"
                            name="productName"
                            rules={[{ required: true, message: '상품명을 입력해 주세요.', type: 'string' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="카테고리"
                            name="productCategory"
                            rules={[{ required: true, message: '카테고리를 선택해 주세요.', type: 'string' }]}
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
                            label="옵션(색상)"
                            name="productOptionStep1"
                            rules={[{ required: true, message: '색상을 선택해 주세요.', type: 'string' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="색상을 선택해 주세요."
                                onChange={e => console.debug(e)}
                            >
                                {DataProduct.optionStep1.map(item => (
                                    <Select.Option key={item.code} value={item.value}>
                                        {item.value}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="옵션(유무선)" name="productOptionStep1">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="유무선을 선택해 주세요."
                                onChange={e => console.debug(e)}
                            >
                                {DataProduct.optionStep2.map(item => (
                                    <Select.Option key={item.code} value={item.value}>
                                        {item.value}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="수량"
                            name="productQuantity"
                            rules={[{ required: true, message: '색상을 선택해 주세요.', type: 'number' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="판매 상태"
                            name="productSaleActive"
                            valuePropName="checked"
                            initialValue={false}
                        >
                            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                        </Form.Item>
                        <Form.Item label="상품 상태" name="productActive" valuePropName="checked" initialValue={false}>
                            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                        </Form.Item>
                        <Form.Item label="메모" name="productMemo">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <ImgCrop rotate>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                        <Divider />
                        <Row justify="center">
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
