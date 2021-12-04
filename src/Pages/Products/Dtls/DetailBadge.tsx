import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Row, Col, Divider, Button, message, Upload } from 'antd';
import { useHistory } from 'react-router-dom';
// import { addProductCategory, saveProductBadgeImage, uploadProductBadgeImage } from '@API';
// import { useLoading } from '@Hooks';
import * as _API from '@API';
// import * as Helper from '@Helper';
import { useParams } from 'react-router-dom';

export default function DetailBadge() {
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const params = useParams<{ id: number }>();

    // const { loadingControl } = useLoading();

    const [form] = Form.useForm();
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    const [badgeImage, setBadgeImage] = useState<any>([]);
    // 이미지 로딩 처리.
    const [loadingRep, setLoadingRep] = useState<boolean>(false);
    const [defaultInitValue, setDefaultInitValue] = useState<{
        badgeName: string;
    }>({
        badgeName: '',
    });

    // 대표 이미지 삭제 버튼 처리.
    const handleBadgeImageOnChange = (e: any) => {
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
        //
        const response = await _API.updateProductBadgeDetail({
            id: params.id,
            data: {
                name: values.badgeName,
                media_id: badgeImage[0].uid,
            },
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

    useEffect(() => {
        const fnGetDetail = async () => {
            const response = await _API.getProductBadgeDetail(Number(params.id));
            if (response.status) {
                setDefaultInitValue({
                    badgeName: response.payload.name,
                });

                setBadgeImage([
                    {
                        uid: response.payload.image.id,
                        status: 'done',
                        url: response.payload.image.url,
                        name: response.payload.image.file_name,
                    },
                ]);
            } else {
                message.error('문제가 발생 했습니다.');
            }

            setCardLoading(false);
        };
        if (params.id) {
            fnGetDetail().then();
        }
    }, []);

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
                            initialValues={defaultInitValue}
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
                                    onChange={handleBadgeImageOnChange}
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
