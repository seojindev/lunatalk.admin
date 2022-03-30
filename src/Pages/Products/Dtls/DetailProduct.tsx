import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Descriptions, Button, Image, Badge, Tag, Card } from 'antd';
import { isEmpty } from '@Helper';
import * as API from '@API';
import CommonTypes from 'CommonTypes';

export default function DetailProduct() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const params = useParams<{ product_uuid: string }>();

    const [detailInfo, setDetailInfo] = useState<CommonTypes.productDeatailResponse>();

    // 페이지 로딩시 데이터 가지고 오기.
    useEffect(() => {
        const fnGetProductDetail = async () => {
            //
            const response: CommonTypes.ServiceResponse<CommonTypes.productDeatailResponse> =
                await API.getDetailProducts({ uuid: params.product_uuid ? params.product_uuid : '' });

            if (response.status) {
                setDetailInfo(response.payload);
            } else {
                // TODO: 에러 처리.
            }
        };

        if (!isEmpty(params.product_uuid)) {
            fnGetProductDetail().then();
        }
    }, [params]);

    return (
        <>
            <Card loading={!detailInfo}>
                <Descriptions
                    bordered
                    title="상품 정보"
                    size="middle"
                    column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                    colon={true}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => {
                                navigate({
                                    pathname: `${process.env.PUBLIC_URL}/products/${params.product_uuid}/update-product`,
                                });
                            }}
                        >
                            Edit
                        </Button>
                    }
                    labelStyle={{ width: '20%' }}
                >
                    <Descriptions.Item label="카테고리">{detailInfo?.category.name}</Descriptions.Item>
                    <Descriptions.Item label="상품명">{detailInfo?.name}</Descriptions.Item>
                    <Descriptions.Item label="옵션(색상)">
                        {detailInfo &&
                            detailInfo.color &&
                            detailInfo.color.map((color, index) => {
                                return (
                                    <Tag color="magenta" key={index}>
                                        {color.name}
                                    </Tag>
                                );
                            })}
                    </Descriptions.Item>
                    <Descriptions.Item label="옵션(유무선)">
                        {detailInfo && detailInfo.wireless ? detailInfo.wireless.wireless : '없음'}
                    </Descriptions.Item>
                    <Descriptions.Item label="배지">
                        {detailInfo && detailInfo.badge
                            ? detailInfo.badge.map(item => <img key={item.id} src={item.image.url} alt={'배지'} />)
                            : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="남은 수량">
                        {detailInfo && detailInfo.quantity ? detailInfo.quantity.string : '없음'}
                    </Descriptions.Item>
                    <Descriptions.Item label="판매 상태">
                        {detailInfo && detailInfo.sale && detailInfo.sale === 'Y' ? (
                            <Badge status="processing" text="판매중" />
                        ) : (
                            <Badge status="error" text="미판매" />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="상품 상태">
                        {detailInfo && detailInfo.active && detailInfo.active === 'Y' ? (
                            <Badge status="processing" text="정상" />
                        ) : (
                            <Badge status="error" text="중지" />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="상품 이미지">
                        <>
                            <Image
                                preview={{ visible: false }}
                                width={200}
                                src={
                                    detailInfo && detailInfo.rep_images && detailInfo.rep_images.length > 0
                                        ? detailInfo.rep_images[0].url
                                        : ''
                                }
                                onClick={() => setVisible(true)}
                            />
                            <div style={{ display: 'none' }}>
                                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                    {detailInfo &&
                                        detailInfo.rep_images &&
                                        detailInfo.rep_images.map((item, index) => {
                                            return <Image src={item.url} key={index} />;
                                        })}
                                </Image.PreviewGroup>
                            </div>
                        </>
                    </Descriptions.Item>
                    <Descriptions.Item label="상세 이미지">
                        <>
                            <Image
                                preview={{ visible: false }}
                                width={200}
                                src={
                                    detailInfo && detailInfo.detail_images && detailInfo.detail_images.length > 0
                                        ? detailInfo.detail_images[0].url
                                        : ''
                                }
                                onClick={() => setVisible(true)}
                            />
                            <div style={{ display: 'none' }}>
                                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                    {detailInfo &&
                                        detailInfo.detail_images &&
                                        detailInfo.detail_images.map((item, index) => {
                                            return <Image src={item.url} key={index} />;
                                        })}
                                </Image.PreviewGroup>
                            </div>
                        </>
                    </Descriptions.Item>
                    <Descriptions.Item label="메모">
                        {detailInfo && detailInfo.memo && detailInfo.memo}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
}
