import React, { useState } from 'react';
import UserForm from './UserForm';
import { userCreate } from '@API';
import { Card, Col, message, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function AddUsers() {
    const navigate = useNavigate();
    const [cardLoading] = useState<boolean>(false);
    const [formInitialData] = useState<{
        userLoginId: string;
        userLoginName: string;
        userEmail: string;
        userLoginPassword: string;
        userMemo: string;
        userPhoneNumber: string;
        userSelectEmail: boolean;
        userSelectMessage: boolean;
        userLevel: string;
        userStatus: string;
        userType: string;
    }>({
        userLoginId: '',
        userLoginName: '',
        userEmail: '',
        userLoginPassword: '',
        userMemo: '',
        userPhoneNumber: '',
        userLevel: '',
        userStatus: '',
        userType: '',
        userSelectEmail: false,
        userSelectMessage: false,
    });
    const handleCreateUser = async (formData: {
        userLoginId: string;
        userLoginName: string;
        userEmail: string;
        userLoginPassword: string;
        userMemo: string;
        userPhoneNumber: string;
        userSelectEmail: boolean;
        userSelectMessage: boolean;
        userLevel: string;
        userStatus: string;
        userType: string;
    }) => {
        const response = await userCreate({
            type: formData.userType,
            level: formData.userLevel,
            status: formData.userStatus,
            user_id: formData.userLoginId,
            user_password: formData.userLoginPassword,
            user_phone_number: formData.userPhoneNumber,
            user_name: formData.userLoginName,
            user_email: formData.userEmail,
            user_memo: formData.userMemo,
            user_select_email: formData.userSelectEmail ? 'Y' : 'N',
            user_select_message: formData.userSelectMessage ? 'Y' : 'N',
        });

        if (response.status) {
            message.success('정상 등록 하였습니다.').then();
            navigate({ pathname: `${process.env.PUBLIC_URL}/users/show-users` });
        }
    };

    return (
        <Card title="사용자 상세" loading={cardLoading}>
            <Row justify="center">
                <Col span={12}>
                    <UserForm HandleFormData={handleCreateUser} FormInitialData={formInitialData} Mode={`create`} />
                </Col>
            </Row>
        </Card>
    );
}
