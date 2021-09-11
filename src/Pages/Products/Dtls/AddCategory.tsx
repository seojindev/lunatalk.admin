import React, { useEffect, useState } from 'react';
import { RootState } from 'StoreTypes';
import { Card, Form, Input, Row, Col, Divider, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAction, productCateogoryResetAction } from '@Store/Products';
import {} from '@Store/App';
import { useHistory } from 'react-router-dom';
import { addProductCategory } from '@API';

export default function AddCategory() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { storeState, storeMessage } = useSelector((store: RootState) => ({
        storeState: store.products.category.add.state,
        storeMessage: store.products.category.add.message,
    }));

    const [form] = Form.useForm();
    const [cardLoading, setCardLoading] = useState<boolean>(false);
    const handleSave = async (values: { categoryName: string }) => {
        console.log('onFinish', values);
        // call save API
        // dispatch(addCategoryAction({ name: values.categoryName }));

        const response = await addProductCategory({ name: values.categoryName });

        console.debug(response);
    };

    useEffect(() => {
        const funcSetCardLoading = () => {
            if (storeState === 'loading') {
                setCardLoading(true);
            } else {
                setCardLoading(false);
            }
        };

        const funcSetMessage = () => {
            if (storeState === 'failure') {
                message.error(storeMessage ? storeMessage : '문제가 발생했습니다.').then();
            } else if (storeState === 'success') {
                message.success(storeMessage ? storeMessage : '정상 처리 하였습니다.').then();
                history.push({ pathname: `${process.env.PUBLIC_URL}/products/show-product-category` });
            }
        };

        funcSetCardLoading();
        funcSetMessage();
    }, [storeState]);

    useEffect(() => {
        return () => {
            dispatch(productCateogoryResetAction());
        };
    }, [storeMessage]);

    return (
        <>
            <Card title="카테고리 등록" loading={cardLoading}>
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
        </>
    );
}
