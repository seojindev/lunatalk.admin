import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message } from 'antd';
import UserForm from './UserForm';
import { useHistory, useParams } from 'react-router-dom';
import * as API from '@API';

export default function DetailUsers() {
    const history = useHistory();
    const params = useParams<{ uuid: string }>();
    const [cardLoading, setCardLoading] = useState<boolean>(true);
    const [formInitialData, setFormInitialData] = useState<{
        userLoginId: string;
        userLoginName: string;
        userEmail: string;
        userLoginPassword: string;
        userMemo: string;
        userPhoneNumber: string;
        userSelectEmail: boolean;
        userSelectMessage: boolean;
    }>({
        userLoginId: '',
        userLoginName: '',
        userEmail: '',
        userLoginPassword: '',
        userMemo: '',
        userPhoneNumber: '',
        userSelectEmail: false,
        userSelectMessage: false,
    });

    const handleUpdateUser = async (formData: {
        userLoginId: string;
        userLoginName: string;
        userEmail: string;
        userLoginPassword: string;
        userMemo: string;
        userPhoneNumber: string;
        userSelectEmail: boolean;
        userSelectMessage: boolean;
    }) => {
        const response = await API.updateUser({
            uuid: params.uuid,
            payload: {
                type: `0100020`,
                level: `1200900`,
                status: `1300100`,
                user_name: formData.userLoginName,
                user_email: formData.userEmail,
                user_memo: formData.userMemo,
                user_select_email: formData.userSelectEmail ? 'Y' : 'N',
                user_select_message: formData.userSelectMessage ? 'Y' : 'N',
            },
        });

        if (response.status) {
            message.success(`정상 처리 하였습니다.`);
            history.push({ pathname: `${process.env.PUBLIC_URL}/users/show-users` });
        } else {
            message.error(response.message);
        }
    };

    useEffect(() => {
        setCardLoading(true);

        const fnGetUserDetail = async () => {
            const response = await API.getUserDetail({ uuid: params.uuid });

            if (response.status) {
                setFormInitialData({
                    ...formInitialData,
                    userLoginId: response.payload.login_id,
                    userLoginName: response.payload.name,
                    userEmail: response.payload.email,
                    userLoginPassword: '',
                    userMemo: response.payload.memo,
                    userPhoneNumber: response.payload.phone_verifies.phone_number,
                    userSelectEmail: response.payload.user_select.email == 'Y' ? true : false,
                    userSelectMessage: response.payload.user_select.message == 'Y' ? true : false,
                });
            } else {
                message.error(response.message);
            }

            setCardLoading(false);
        };

        if (params.uuid) {
            fnGetUserDetail().then();
        }
    }, []);

    return (
        <>
            <Card title="사용자 상세" loading={cardLoading}>
                <Row justify="center">
                    <Col span={12}>
                        <UserForm HandleFormData={handleUpdateUser} FormInitialData={formInitialData} Mode={`detail`} />
                    </Col>
                </Row>
            </Card>
        </>
    );
}
