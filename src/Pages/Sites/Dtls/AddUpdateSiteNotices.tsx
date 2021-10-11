import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message as antdMessage } from 'antd';
import NoticeForm from './NoticeForm';
import { useParams } from 'react-router-dom';
import { isEmpty } from '@Helper';
import * as _API from '@API';
import { useHistory } from 'react-router-dom';

export default function AddUpdateSiteNotices() {
    const history = useHistory();
    const params = useParams<{ uuid: string }>();
    const [cardLoading, setCardLoading] = useState<boolean>(false);
    const [actionMode, setActionMode] = useState<'ADD' | 'UPDATE' | 'yet'>('yet');

    const [formInitialData, setFormInitialData] = useState<{
        category: string;
        title: string;
        content: string;
        active: boolean;
    }>({
        category: '',
        title: '',
        content: '',
        active: true,
    });

    const [imageList, setImageList] = useState<
        Array<{
            uid: string;
            name: string;
            status: string;
            url: string;
        }>
    >([]);

    // 등록 및 업데이트 처리.
    const handleSaveNotice = async ({
        category,
        title,
        content,
        active,
        image,
    }: {
        category: string;
        title: string;
        content: string;
        active: string;
        image: Array<number>;
    }) => {
        const payload = { category: category, title: title, content: content, active: active, image: image };

        if (actionMode === 'UPDATE') {
            const { status, message } = await _API.updateSIteNotice(params.uuid, payload);
            if (status) {
                antdMessage.success('정상 처리 하였습니다.');
                history.push({ pathname: `${process.env.PUBLIC_URL}/sites/show-site-notice` });
            } else {
                antdMessage.error(message);
            }
        } else if (actionMode === 'ADD') {
            const { status, message } = await _API.createSiteNotice(payload);
            if (status) {
                antdMessage.success('정상 처리 하였습니다.');
                history.push({ pathname: `${process.env.PUBLIC_URL}/sites/show-site-notice` });
            } else {
                antdMessage.error(message);
            }
        } else {
            console.debug(':: actionMode :: 없음');
        }
    };

    useEffect(() => {
        const fnSetActionMode = async () => {
            if (!isEmpty(params.uuid)) {
                setCardLoading(true);
                const { status, payload, message } = await _API.getSiteNoticeDetail({ uuid: params.uuid });
                if (status) {
                    setActionMode('UPDATE');
                    setFormInitialData({
                        category: payload.category.code_id,
                        title: payload.title,
                        content: payload.content.default,
                        active: payload.active === 'Y',
                    });
                    setImageList(
                        payload.images.map((item: { uid: string; url: string; file_name: string }) => {
                            return {
                                uid: item.uid,
                                name: item.file_name,
                                status: 'done',
                                url: item.url,
                            };
                        })
                    );
                } else {
                    antdMessage.error(message);
                }
                setCardLoading(false);
            } else {
                setActionMode('ADD');
            }
        };

        fnSetActionMode().then();
    }, []);

    return (
        <Card title="공지사항 등록 & 수정" loading={cardLoading}>
            <Row justify="center">
                <Col span={12}>
                    {cardLoading === false && (
                        <NoticeForm
                            FormInitialData={formInitialData}
                            ImageList={imageList}
                            SaveNotice={(e: {
                                category: string;
                                title: string;
                                content: string;
                                active: string;
                                image: Array<number>;
                            }) => handleSaveNotice(e)}
                        />
                    )}
                </Col>
            </Row>
        </Card>
    );
}
