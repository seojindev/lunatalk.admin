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

    const [repfileList] = useState<any>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `${process.env.REACT_APP_MEDIA_URL}/storage/products/rep/8e3121f1cb97b450e3b7623f631dd966811cbfa2/f97ade69-a617-49a3-962e-50dffc9e006a.jpeg`,
        },
    ]);

    const [detailFileList] = useState<any>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `${process.env.REACT_APP_MEDIA_URL}/storage/products/detail/8e8f0ba84b11269265ef00d1744c3b1e950c6840/0033a6e2-5e5b-4fae-ad84-faa992f6cbaf.jpg`,
        },
    ]);

    const onChange = ({ fileList }: { fileList: any }) => {
        // setFileList(newFileList);
        console.debug(fileList);
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
        if (imgWindow) {
            imgWindow.document.write(image.outerHTML);
        }
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
                        <Form.Item
                            label="옵션(유무선)"
                            name="productOptionStep2"
                            rules={[{ required: true, message: '색상을 선택해 주세요.', type: 'string' }]}
                        >
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
                            rules={[{ required: true, message: '수량을 입력해 주세요.', type: 'number' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="판매 상태"
                            name="productSaleActive"
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                        </Form.Item>
                        <Form.Item label="상품 상태" name="productActive" valuePropName="checked" initialValue={true}>
                            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                        </Form.Item>
                        <Form.Item label="메모" name="productMemo">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="대표 사진">
                            <ImgCrop rotate>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={repfileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {repfileList.length < 5 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                        <Form.Item label="상세 사진">
                            <ImgCrop rotate>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={detailFileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {detailFileList.length < 5 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
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
