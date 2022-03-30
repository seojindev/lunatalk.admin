import React, { useEffect, useState } from 'react';
import { Button, Image, message as antdMessage } from 'antd';
import { Descriptions, Badge } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as API from '@API';
import * as CommonTypes from 'CommonTypes';

export default function DetailSiteNotices() {
    const params = useParams<{ uuid: string }>();
    const navigate = useNavigate();
    const [noticeData, setNoticeData] = useState<CommonTypes.NoticetItem>();

    useEffect(() => {
        const fnGetNoticeDetail = async () => {
            const { status, payload, message } = await API.getSiteNoticeDetail({
                uuid: params.uuid ? params.uuid : '',
            });
            if (status) {
                setNoticeData(payload);
            } else {
                antdMessage.error(message);
            }
        };

        if (params.uuid) {
            fnGetNoticeDetail().then();
        }
    }, []);

    return (
        <>
            {noticeData && (
                <Descriptions
                    title="공지 사항 상세"
                    bordered
                    size="middle"
                    column={{ xl: 2, lg: 2, sm: 2 }}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => {
                                navigate({
                                    pathname: `${process.env.PUBLIC_URL}/sites/${params.uuid}/update-site-notice`,
                                });
                            }}
                        >
                            Edit
                        </Button>
                    }
                >
                    <Descriptions.Item label="제목" span={2}>
                        {noticeData?.title}
                    </Descriptions.Item>
                    <Descriptions.Item label="카테고리" span={2}>
                        {noticeData?.category.code_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="상태" span={2}>
                        <Badge status="processing" text="정상" />
                    </Descriptions.Item>
                    <Descriptions.Item label="등록일" span={2}>
                        {noticeData?.created_at}
                    </Descriptions.Item>
                    <Descriptions.Item label="수정일" span={2}>
                        {noticeData?.updated_at}
                    </Descriptions.Item>
                    <Descriptions.Item label="내용" span={2}>
                        <pre>{noticeData?.content.default}</pre>
                    </Descriptions.Item>
                    <Descriptions.Item label="사진" span={2}>
                        {noticeData?.images.map((item: { uid: string; url: string; file_name: string }) => {
                            return (
                                <Image
                                    key={item.uid}
                                    preview={{ visible: false }}
                                    width={200}
                                    src={item.url}
                                    onClick={() => console.debug(true)}
                                />
                            );
                        })}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </>
    );
}
