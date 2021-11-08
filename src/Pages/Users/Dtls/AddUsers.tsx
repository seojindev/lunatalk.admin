import React, { useState } from 'react';
import UserForm from './UserForm';
import { userCreate } from '@API';
import { Card, Col, message, Row } from 'antd';
import { useHistory } from 'react-router-dom';

export default function AddUsers() {
    const history = useHistory();
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
    const handleCreateUser = async (formData: {
        userLoginId: string;
        userLoginName: string;
        userEmail: string;
        userLoginPassword: string;
        userMemo: string;
        userPhoneNumber: string;
        userSelectEmail: boolean;
        userSelectMessage: boolean;
    }) => {
        const response = await userCreate({
            type: '0100010',
            level: '1200000',
            status: '1300100',
            user_id: formData.userLoginId,
            user_password: formData.userLoginPassword,
            user_phone_number: formData.userPhoneNumber,
            user_name: formData.userLoginName,
            user_email: formData.userEmail,
            user_select_email: formData.userSelectEmail == true ? 'Y' : 'N',
            user_select_message: formData.userSelectMessage == true ? 'Y' : 'N',
        });

        if (response.status) {
            message.success('정상 등록 하였습니다.').then();
            history.push({ pathname: `${process.env.PUBLIC_URL}/users/show-users` });
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
