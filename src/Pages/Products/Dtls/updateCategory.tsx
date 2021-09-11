import React, { useEffect, useState } from 'react';
import { RootState } from 'StoreTypes';
import { Card, Form, Input, Row, Col, Divider, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAction, productCateogoryResetAction } from '@Store/Products';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from '@Helper';
import { detailCategoryAction, updateCategoryAction } from '@Store/Products';

export default function updateCategory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { storeResult, storeState, storeUpdateMessage, storeUpdateState } = useSelector((state: RootState) => ({
        storeState: state.products.category.detail.state,
        storeResult: state.products.category.detail.result,
        storeMessage: state.products.category.detail.message,

        storeUpdateMessage: state.products.category.update.message,
        storeUpdateState: state.products.category.update.state,
    }));
    const [form] = Form.useForm();
    const parmas = useParams<{ category_uuid: string }>();
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    const [categoryInputName, setCategoryInputName] = useState<string>();
    const handleSave = (values: { categoryName: string }) => {
        dispatch(updateCategoryAction({ uuid: parmas.category_uuid, name: values.categoryName }));
    };

    useEffect(() => {
        console.debug('start');
        console.debug(parmas.category_uuid);

        const funcGetCategoryInfo = () => {
            dispatch(detailCategoryAction(parmas.category_uuid));
        };

        if (!isEmpty(parmas.category_uuid)) {
            funcGetCategoryInfo();
        }
        return () => {
            dispatch(productCateogoryResetAction());
        };
    }, []);

    useEffect(() => {
        const funcSetCategoryName = () => {
            console.debug(storeResult.name);
            setCategoryInputName(storeResult.name);
        };

        const funcSetFormLoading = () => {
            if (storeState === 'success') {
                setCardLoading(false);
            } else {
                setCardLoading(true);
            }
        };

        if (storeState) {
            funcSetCategoryName();
        }
        funcSetFormLoading();
    }, [storeState]);

    useEffect(() => {
        if (storeUpdateState) {
            message.success(storeUpdateMessage ? storeUpdateMessage : '정상 처리 하였습니다.').then();
            history.push({ pathname: `${process.env.PUBLIC_URL}/products/show-product-category` });
        } else if (storeUpdateState === 'failure') {
            message.error(storeUpdateMessage ? storeUpdateMessage : '문제가 발생했습니다.').then();
        }
    }, [storeUpdateState]);

    return (
        <>
            {storeState && categoryInputName && (
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
