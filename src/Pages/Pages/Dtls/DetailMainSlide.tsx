import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Descriptions, Button, Image, Badge, Card } from 'antd';
import { isEmpty } from '@Helper';
import * as API from '@API';
import CommonTypes from 'CommonTypes';

export default function DetailProduct() {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const params = useParams<{ slide_uuid: string }>();

    const [detailInfo, setDetailInfo] = useState<CommonTypes.mainSlideDetailResponse>();

    // 페이지 로딩시 데이터 가지고 오기.
    useEffect(() => {
        const fnGetMainSlideDetail = async () => {
            //
            const response: CommonTypes.ServiceResponse<CommonTypes.mainSlideDetailResponse> =
                await API.getDetailMainSlide({ uuid: params.slide_uuid });

            if (response.status) {
                setDetailInfo(response.payload);
            } else {
                // TODO: 에러 처리.
            }
        };

        if (!isEmpty(params.slide_uuid)) {
            fnGetMainSlideDetail().then();
        }
    }, []);

    return (
        <>
            <Card loading={!detailInfo}>
                <Descriptions
                    bordered
                    title="메인 슬라이드 정보"
                    size="middle"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    colon={true}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push({
                                    pathname: `${process.env.PUBLIC_URL}/pages/update-main-slide/${params.slide_uuid}`,
                                });
                            }}
                        >
                            Edit
                        </Button>
                    }
                    labelStyle={{ width: '20%' }}
                >
                    <Descriptions.Item label="메인 슬라이드 명">{detailInfo?.name}</Descriptions.Item>
                    <Descriptions.Item label="메인슬라이드 상태">
                        {detailInfo && detailInfo.active && detailInfo.active === 'Y' ? (
                            <Badge status="processing" text="사용" />
                        ) : (
                            <Badge status="error" text="사용안함" />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="슬라이드 이미지">
                        <>
                            <Image
                                preview={{ visible: false }}
                                width={200}
                                src={detailInfo && detailInfo.image ? detailInfo.image.url : ''}
                                onClick={() => setVisible(true)}
                            />
                            <div style={{ display: 'none' }}>
                                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                    {detailInfo && detailInfo.image && <Image src={detailInfo.image.url} />}
                                </Image.PreviewGroup>
                            </div>
                        </>
                    </Descriptions.Item>
                    <Descriptions.Item label="링크">
                        <div>{detailInfo && detailInfo.link && process.env.PUBLIC_URL + detailInfo.link}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="상품">
                        <div
                            onClick={() => {
                                history.push({
                                    pathname: `${process.env.PUBLIC_URL}/products/${
                                        detailInfo &&
                                        detailInfo.product_uuid &&
                                        process.env.PUBLIC_URL + detailInfo.product_uuid
                                    }/detail-product`,
                                });
                            }}
                        >
                            {detailInfo && detailInfo.product_name && process.env.PUBLIC_URL + detailInfo.product_name}
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
}
