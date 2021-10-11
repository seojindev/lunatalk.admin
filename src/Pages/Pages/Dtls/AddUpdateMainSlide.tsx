import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import SlideForm from './SlideForm';
import { isEmpty } from '@Helper';
import { useParams } from 'react-router-dom';
import * as CommonTypes from 'CommonTypes';
import * as API from '@API';

interface imagesInterface {
    uid: number;
    name: string;
    status: 'done' | 'loading';
    url: string;
    active: boolean;
}

export default function AddUpdateMainSlide() {
    const params = useParams<{ slide_uuid: string }>();
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    const [pageMode, setPageMode] = useState<'add' | 'update'>('add');
    const [inputData, setInputData] = useState<{
        slideName: string;
        slideActive: boolean;
        slideLink: string;
    }>({
        slideName: '',
        slideActive: false,
        slideLink: '',
    });
    const [imageData, setImageData] = useState<imagesInterface[]>([]);

    // 페이지 모드가 update 일시 데이터 불러오기.
    useEffect(() => {
        const fnGetPageDetail = async () => {
            setCardLoading(true);
            const { status, payload }: CommonTypes.ServiceResponse<CommonTypes.mainSlideDetailResponse> =
                await API.getDetailMainSlide({ uuid: params.slide_uuid });

            if (status) {
                // 슬라이드 정보
                setInputData({
                    slideName: payload.name,
                    slideActive: payload.active === 'Y',
                    slideLink: payload.image ? payload.image[0]?.link : '',
                });

                // 슬라이드 이미지 정보
                setImageData(
                    payload.image?.map(item => {
                        return {
                            uid: item.id,
                            name: item.file_name,
                            status: 'done',
                            active: item.active === 'Y',
                            link: item.link,
                            url: item.url,
                        };
                    })
                );
            } else {
                //TODO: 에러처리.
            }
            setCardLoading(false);
        };
        if (pageMode === 'update' && params.slide_uuid) {
            fnGetPageDetail().then();
        }
    }, [pageMode]);

    // 슬라이드 추가 수정 체크
    useEffect(() => {
        setCardLoading(true);
        const fnSetPageMode = async () => {
            if (!isEmpty(params.slide_uuid)) {
                setPageMode('update');
            } else {
                setPageMode('add');
            }
        };
        setCardLoading(false);

        fnSetPageMode().then();
    }, [params]);
    return (
        <Card title="슬라이드 이미지 등록" loading={cardLoading}>
            <Row justify="center">
                <Col span={12}>
                    <SlideForm
                        SlideUUid={params.slide_uuid}
                        FormMode={pageMode}
                        FormInitialData={inputData}
                        ImageInitialData={imageData}
                    />
                </Col>
            </Row>
        </Card>
    );
}
