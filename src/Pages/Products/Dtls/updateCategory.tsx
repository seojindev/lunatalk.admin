import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Row, Col, Divider, Button, message } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from '@Helper';
import { useLoading } from '@Hooks';
import { getProductCategoryDetail, updateProductCategory } from '@API';

export default function updateCategory() {
    const history = useHistory();
    const { loadingState, loadingControl } = useLoading();

    const [form] = Form.useForm();
    const parmas = useParams<{ category_uuid: string }>();
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    const [categoryInputName, setCategoryInputName] = useState<string>();
    const handleSave = (values: { categoryName: string }) => {
        const fnUpdate = async () => {
            await loadingControl({
                type: 'fetch',
            });
            const response = await updateProductCategory(parmas.category_uuid, values.categoryName);
            if (response.status) {
                await loadingControl({
                    type: 'success',
                });
                message.success('수정 되었습니다.').then();
                setCardLoading(false);
                history.push({ pathname: `${process.env.PUBLIC_URL}/products/show-product-category` });
            } else {
                await loadingControl({
                    type: 'error',
                });
                setCardLoading(false);
                message.error('문제가 발생했습니다.');
            }
        };

        fnUpdate().then();
    };

    useEffect(() => {
        const fnGetCategoryInfo = async () => {
            await loadingControl({
                type: 'fetch',
            });
            const response = await getProductCategoryDetail(parmas.category_uuid);
            if (response.status) {
                await loadingControl({
                    type: 'success',
                });
                setCategoryInputName(response.payload.name);
                setCardLoading(false);
            } else {
                await loadingControl({
                    type: 'error',
                });
                setCardLoading(false);
                message.error('문제가 발생했습니다.');
            }
        };

        if (!isEmpty(parmas.category_uuid)) {
            fnGetCategoryInfo().then();
        }
    }, []);

    return (
        <>
            {loadingState && categoryInputName && (
                <Card title="카테고리 등록" loading={cardLoading}>
                    <Row justify="center">
                        <Col span={12}>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                form={form}
                                name="product-form"
                                onFinish={handleSave}
                                initialValues={{ categoryName: categoryInputName }}
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
            )}
        </>
    );
}
