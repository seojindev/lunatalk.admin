import React, { useState } from 'react';
import { Card, Form, Input, Row, Col, Divider, Button, message, Upload } from 'antd';
import { useHistory } from 'react-router-dom';
// import { addProductCategory, saveProductBadgeImage, uploadProductBadgeImage } from '@API';
import { useLoading } from '@Hooks';
import * as _API from '@API';
// import * as Helper from '@Helper';

export default function AddBadge() {
    const history = useHistory();

    const { loadingControl } = useLoading();

    const [form] = Form.useForm();
    const [cardLoading] = useState<boolean>(false);
    const [badgeImage, setBadgeImage] = useState<any>([]);
    // 이미지 로딩 처리.
    const [loadingRep, setLoadingRep] = useState<boolean>(false);

    // 대표 이미지 삭제 버튼 처리.
    const handleRepImageOnChange = (e: any) => {
        if (e.file.status === 'removed') {
            setBadgeImage(e.fileList);
        }
    };

    // media 서버 이미지 등록.
    const imageOnChange = (options: any) => {
        const { file } = options;

        const fetchData = async () => {
            setLoadingRep(true);
            const formData = new FormData();
            formData.append('media_file', file);
            const response = await _API.uploadProductBadgeImage(formData);
            if (response.status) {
                const fileObj = {
                    uid: response.payload.media_id,
                    name: response.payload.file_name,
                    status: 'done',
                    url: response.payload.media_full_url,
                };
                setBadgeImage([fileObj]);
            } else {
                // TODO: error 처리.
            }
            setLoadingRep(false);
        };
        fetchData().then();
    };

    const handleSave = async (values: { badgeName: string }) => {
        await loadingControl({
            type: 'fetch',
        });

        if (badgeImage.length === 0) {
            message.error('배찌 이미지를 등록해 주세요.');
        }

        const response = await _API.saveProductBadgeImage({
            name: values.badgeName,
            media_id: badgeImage[0].uid,
        });

        if (response.status) {
            message.success('정상 처리 되었습니다.');
            history.push({
                pathname: process.env.PUBLIC_URL + `/products/show-product-badge`,
            });
        } else {
            message.error(response.message);
        }
    };

    return (
        <>
            <Card title="배지 등록" loading={cardLoading}>
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
                                label="뱃지명"
                                name="badgeName"
                                rules={[{ required: true, message: '배지명을 입력해 주세요.', type: 'string' }]}
                            >
                                <Input placeholder="배지명을 입력해 주세요." />
                            </Form.Item>
                            <Form.Item label="배지 이미지">
                                <Upload
                                    listType="picture-card"
                                    multiple={false}
                                    fileList={badgeImage}
                                    customRequest={imageOnChange}
                                    onChange={handleRepImageOnChange}
                                >
                                    {loadingRep ? '업로드중...' : '+ 등록'}
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
        </>
    );
}
