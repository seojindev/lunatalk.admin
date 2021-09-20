import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, InputNumber, message, Row, Select, Switch, Upload } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as _API from '@API';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'StoreTypes';
import { resetProductAction, getProductAction } from '@Store/App';
import { useHistory } from 'react-router-dom';
interface imagesInterface {
    uid: number;
    name: string;
    status: 'done' | 'loading';
    url: string;
}

// 등록, 수정 폼을 같이 쓰기위해 한 파일에서 처리.
export default function ProductForm({
    ProductUUid,
    FormMode,
    FormInitialData,
    RepImageInitialData,
    DetailImageInitalData,
}: {
    ProductUUid: string;
    FormInitialData: {
        productName: string;
        productCategory: number;
        productColorOption: number[];
        productWirelessOption: number[];
        productPrice: number;
        productQuantity: number;
        productMemo: string;
        productSaleActive: boolean;
        productActive: boolean;
    };
    FormMode: 'add' | 'update';
    RepImageInitialData: imagesInterface[];
    DetailImageInitalData: imagesInterface[];
}) {
    const dispatch = useDispatch();
    const history = useHistory();

    // 상품 리시트 처리. 상품 리스트는 최초 로딩시 가지고 온다. AppStore.
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

    // 이미지 로딩 처리.
    const [loadingRep, setLoadingRep] = useState<boolean>(false);
    const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

    // 상품 폼 저장 버튼 클릭 처리.
    const handleSave = async ({
        productName,
        productCategory,
        productColorOption,
        productWirelessOption,
        productPrice,
        productQuantity,
        productMemo,
        productSaleActive,
        productActive,
    }: {
        productName: string;
        productCategory: number;
        productColorOption: number[];
        productWirelessOption: number[];
        productPrice: number;
        productQuantity: number;
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

        // from 데이터 처리.
        const payload = {
            name: productName,
            category: productCategory,
            barcode: '',
            color: productColorOption,
            wireless: productWirelessOption,
            price: productPrice,
            quantity: productQuantity,
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

        // 수정 및 등록 api 호출.
        if (FormMode === 'add') {
            const addResponse = await _API.addProduct(payload);
            if (addResponse.status) {
                message.success('정상처리 하였습니다.');
            } else {
                message.error(addResponse.message);
            }
        } else if (FormMode === 'update') {
            const updateResponse = await _API.updateProduct({
                uuid: ProductUUid,
                payload: payload,
            });
            if (updateResponse.status) {
                message.success('정상처리 하였습니다.');
            } else {
                message.error(updateResponse.message);
            }
        }

        history.push({ pathname: `${process.env.PUBLIC_URL}/products/show-products` });
    };

    // 대표 이미지 삭제 버튼 처리.
    const handleRepImageOnChange = (e: any) => {
        if (e.file.status === 'removed') {
            setRepfileList(e.fileList);
        }
    };

    // 상세 이미지 삭제 버튼 처리.
    const handleDetailImageOnChange = (e: any) => {
        if (e.file.status === 'removed') {
            setRepfileList(e.fileList);
        }
    };

    // 대표 이미지 추가시 서버 등록 처리.
    const repImageonChange = (options: any) => {
        const { file } = options;

        const fetchData = async () => {
            setLoadingRep(true);
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
            } else {
                // TODO: error 처리.
            }
            setLoadingRep(false);
        };
        fetchData().then();
    };

    // 상세 이미지 추가시 서버 등록 처리.
    const detailImageonChange = (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fetchData = async () => {
            setLoadingDetail(true);
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
            setLoadingDetail(false);
        };
        onProgress();
        fetchData().then();
    };

    // 대표 이미지 업로드 완료시 스테이트 및 form에 등록 처리
    useEffect(() => {
        const fnSetRepImage = () => {
            setRepfileList(
                RepImageInitialData.map(item => {
                    return {
                        uid: item.uid,
                        name: item.name,
                        status: 'done',
                        url: item.url,
                    };
                })
            );
        };

        if (RepImageInitialData.length > 0) {
            fnSetRepImage();
        }
    }, [RepImageInitialData]);

    // 상세 이미지 업로드 완료시 스테이트 및 form에 등록 처리
    useEffect(() => {
        const fnSetRepImage = () => {
            setDetailFileList(
                DetailImageInitalData.map(item => {
                    return {
                        uid: item.uid,
                        name: item.name,
                        status: 'done',
                        url: item.url,
                    };
                })
            );
        };

        if (DetailImageInitalData.length > 0) {
            fnSetRepImage();
        }
    }, [DetailImageInitalData]);

    useEffect(() => {
        return () => {
            dispatch(resetProductAction());
            dispatch(getProductAction());
        };
    }, []);

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="product-form"
            onFinish={handleSave}
            initialValues={FormInitialData}
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
                rules={[{ required: true, message: '카테고리를 선택해 주세요.', type: 'number' }]}
            >
                <Select>
                    {storeProductCategory.map(item => (
                        <Select.Option key={item.id} value={item.id}>
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
                    mode="multiple"
                    // allowClear
                    style={{ width: '100%' }}
                    placeholder="색상을 선택해 주세요."
                    onChange={e => console.debug(e)}
                    // tokenSeparators={[',']}
                >
                    {storeProductColorOptions.map(item => (
                        <Select.Option key={item.id} value={item.id}>
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
                name="productQuantity"
                rules={[{ required: true, message: '수량을 입력해 주세요.', type: 'number' }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item label="판매 상태" name="productSaleActive" valuePropName="checked">
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item label="상품 상태" name="productActive" valuePropName="checked">
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item label="메모" name="productMemo">
                <Input.TextArea rows={7} />
            </Form.Item>
            <Form.Item label="대표 사진">
                <Upload
                    listType="picture-card"
                    fileList={repfileList}
                    customRequest={repImageonChange}
                    onChange={handleRepImageOnChange}
                >
                    {loadingRep ? '업로드중...' : '+ 등록'}
                </Upload>
            </Form.Item>
            <Form.Item label="상세 사진">
                <Upload
                    listType="picture-card"
                    fileList={detailFileList}
                    customRequest={detailImageonChange}
                    onChange={handleDetailImageOnChange}
                >
                    {loadingDetail ? '업로드중...' : '+ 등록'}
                </Upload>
            </Form.Item>
            <Divider />
            <Row justify="center">
                <Button type="primary" htmlType="submit">
                    저장
                </Button>
            </Row>
        </Form>
    );
}
