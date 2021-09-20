import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { isEmpty } from '@Helper';
import CommonTypes from 'CommonTypes';
import * as API from '@API';
import ProductForm from './ProductForm';

interface imagesInterface {
    uid: number;
    name: string;
    status: 'done' | 'loading';
    url: string;
}

export default function AddUpdateProduct() {
    const params = useParams<{ product_uuid: string }>();
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    const [pageMode, setPageMode] = useState<'add' | 'update'>('add');
    const [inputData, setInputData] = useState<{
        productName: string;
        productCategory: number;
        productColorOption: number[];
        productWirelessOption: number[];
        productPrice: number;
        productQuantity: number;
        productMemo: string;
        productSaleActive: boolean;
        productActive: boolean;
    }>({
        productName: '',
        productCategory: 1,
        productColorOption: [],
        productWirelessOption: [],
        productPrice: 0,
        productQuantity: 0,
        productMemo: '',
        productSaleActive: false,
        productActive: false,
    });
    const [repImageData, setRepInageData] = useState<imagesInterface[]>([]);
    const [detailImageData, setDetailInageData] = useState<imagesInterface[]>([]);

    // 페이지 모드( 추가, 수정) 변경시 input 데이터 처리.
    useEffect(() => {
        const fnGetPageDetail = async () => {
            setCardLoading(true);
            const { status, payload }: CommonTypes.ServiceResponse<CommonTypes.productDeatailResponse> =
                await API.getDetailProducts({ uuid: params.product_uuid });

            if (status) {
                // 상품 정보.
                setInputData({
                    productName: payload.name,
                    productCategory: payload.category.id,
                    productColorOption: payload.color.map(item => {
                        return item.id;
                    }),
                    productWirelessOption: payload.wireless.map(item => {
                        return item.id;
                    }),
                    productPrice: payload.price.number,
                    productQuantity: payload.quantity.number,
                    productMemo: payload.memo,
                    productSaleActive: payload.sale === 'Y',
                    productActive: payload.active === 'Y',
                });

                // 대표 이미지
                setRepInageData(
                    payload.rep_images.map(item => {
                        return {
                            uid: item.id,
                            name: item.file_name,
                            status: 'done',
                            url: item.url,
                        };
                    })
                );

                // 상세 이미지.
                setDetailInageData(
                    payload.detail_images.map(item => {
                        return {
                            uid: item.id,
                            name: item.file_name,
                            status: 'done',
                            url: item.url,
                        };
                    })
                );
            } else {
                // TODO: 에러 처리.
            }
            setCardLoading(false);
        };

        if (pageMode === 'update' && params.product_uuid) {
            fnGetPageDetail().then();
        }
    }, [pageMode]);

    // 상품 추가 수정 체크 parameter - uuid
    useEffect(() => {
        setCardLoading(true);
        const fnSetPageMode = async () => {
            if (!isEmpty(params.product_uuid)) {
                setPageMode('update');
            } else {
                setPageMode('add');
            }
        };
        setCardLoading(false);

        fnSetPageMode().then();
    }, [params]);

    return (
        <Card title="상품 등록" loading={cardLoading}>
            <Row justify="center">
                <Col span={12}>
                    <ProductForm
                        ProductUUid={params.product_uuid}
                        FormMode={pageMode}
                        FormInitialData={inputData}
                        RepImageInitialData={repImageData}
                        DetailImageInitalData={detailImageData}
                    />
                </Col>
            </Row>
        </Card>
    );
}
