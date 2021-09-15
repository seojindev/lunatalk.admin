import React, { useState } from 'react';
import { Switch, Card, Form, Input, Row, Col, Select, Divider, Button, InputNumber, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import * as _API from '@API';
import { useHistory } from 'react-router-dom';

export default function AddProduct() {
    const history = useHistory();
    const { storeProductCategory, storeProductColorOptions, storeProductWirelessOptions } = useSelector(
        (store: RootState) => ({
            storeProductCategory: store.app.common.products.category,
            storeProductColorOptions: store.app.common.products.color_options,
            storeProductWirelessOptions: store.app.common.products.wireless_options,
        })
    );
    const [form] = Form.useForm();
    const [repfileList, setRepfileList] = useState<any>([]);
    const [detailFileList, setDetailFileList] = useState<any>([]);

    const handleSave = async ({
        productName,
        productCategory,
        productColorOption,
        productWirelessOption,
        productPrice,
        productStock,
        productMemo,
        productSaleActive,
        productActive,
    }: {
        productName: string;
        productCategory: number;
        productColorOption: number[];
        productWirelessOption: number[];
        productPrice: number;
        productStock: number;
        productMemo: string;
        productSaleActive: boolean;
        productActive: boolean;
    }) => {
        if (repfileList.length === 0) {
            message.error('대표이미지를 하나 이상 선택해 주세요.');
            return;
        }

        if (detailFileList.length === 0) {
            message.error('상세 이미지를 하나 이상 선택해 주세요.');
            return;
        }

        const payload = {
            name: productName,
            category: productCategory,
            barcode: '',
            color: productColorOption,
            wireless: productWirelessOption,
            price: productPrice,
            stock: productStock,
            memo: productMemo,
            sale: productSaleActive ? 'Y' : 'N',
            active: productActive ? 'Y' : 'N',
            rep_image: repfileList.map((e: any) => {
                return e.uid;
            }),
            detail_image: detailFileList.map((e: any) => {
                return e.uid;
            }),
        };

        const response = await _API.addProduct(payload);
        if (response.status) {
            message.success('정상처리 하였습니다.');
            history.push({ pathname: `${process.env.PUBLIC_URL}/products/show-product-category` });
            return;
        } else {
            message.error('상세 이미지를 하나 이상 선택해 주세요.');
            return;
        }
    };

    const repImageonChange = (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fetchData = async () => {
            const formData = new FormData();
            formData.append('media_file', file);
            const response = await _API.uploadProductRepImage(formData);
            if (response.status) {
                const fileObj = {
                    uid: response.payload.media_id,
                    name: response.payload.file_name,
                    status: 'done',
                    url: response.payload.media_full_url,
                };
                setRepfileList((repfileList: any) => [...repfileList, fileObj]);
                onSuccess('Ok');
            } else {
                // TODO: error 처리.
                onError();
            }
        };
        onProgress();
        fetchData().then();
    };
    const detailImageonChange = (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fetchData = async () => {
            const formData = new FormData();
            formData.append('media_file', file);
            const response = await _API.uploadProductDetailImage(formData);
            if (response.status) {
                const fileObj = {
                    uid: response.payload.media_id,
                    name: response.payload.file_name,
                    status: 'done',
                    url: response.payload.media_full_url,
                };
                setDetailFileList((detailFileList: any) => [...detailFileList, fileObj]);
                onSuccess('Ok');
            } else {
                // TODO: error 처리.
                onError();
            }
        };
        onProgress();
        fetchData().then();
    };

    // TODO: 미리보기??
    // const onPreview = async (file: any) => {
    //     let src = file.url;
    //     if (!src) {
    //         src = await new Promise(resolve => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj);
    //             reader.onload = () => resolve(reader.result);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     if (imgWindow) {
    //         imgWindow.document.write(image.outerHTML);
    //     }
    // };

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
                                {storeProductCategory.map(item => (
                                    <Select.Option key={item.id} value={String(item.id)}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="옵션(색상)"
                            name="productColorOption"
                            rules={[{ required: true, message: '색상을 선택해 주세요.', type: 'array' }]}
                        >
                            <Select
                                mode="tags"
                                // allowClear
                                style={{ width: '100%' }}
                                placeholder="색상을 선택해 주세요."
                                onChange={e => console.debug(e)}
                                // tokenSeparators={[',']}
                            >
                                {storeProductColorOptions.map(item => (
                                    <Select.Option key={item.id} value={String(item.id)}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="옵션(유무선)"
                            name="productWirelessOption"
                            rules={[{ message: '유무선을 선택해 주세요.', type: 'array' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="유무선을 선택해 주세요."
                                onChange={e => console.debug(e)}
                            >
                                {storeProductWirelessOptions.map(item => (
                                    <Select.Option key={item.id} value={String(item.id)}>
                                        {item.wireless === 'Y' ? '무선' : '유선'}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="금액"
                            name="productPrice"
                            rules={[{ required: true, message: '금액을 입력해 주세요.', type: 'number' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="수량"
                            name="productStock"
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
                            <Input.TextArea rows={7} />
                        </Form.Item>
                        <Form.Item label="대표 사진">
                            <ImgCrop rotate>
                                <Upload
                                    listType="picture-card"
                                    fileList={repfileList}
                                    customRequest={repImageonChange}
                                    // onChange={handleOnChange}
                                    // onPreview={onPreview}
                                >
                                    {repfileList.length < 5 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                        <Form.Item label="상세 사진">
                            <ImgCrop rotate>
                                <Upload
                                    listType="picture-card"
                                    fileList={detailFileList}
                                    customRequest={detailImageonChange}
                                    // onPreview={onPreview}
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
