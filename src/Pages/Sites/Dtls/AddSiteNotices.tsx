import React, { useState } from 'react';
import { Switch, Card, Form, Input, Row, Col, Divider, Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default function AddSiteNotices() {
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
                        name="notice-form"
                        onFinish={handleSave}
                    >
                        <Form.Item
                            label="제목"
                            name="noticeTitle"
                            rules={[{ required: true, message: '공지사항 제목을 입력해 주세요.', type: 'string' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="상태" name="productActive" valuePropName="checked" initialValue={true}>
                            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                        </Form.Item>
                        <Form.Item label="내용" name="productMemo">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="이미지">
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
