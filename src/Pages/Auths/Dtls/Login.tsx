import { useEffect } from 'react';
import { Row, Col } from 'antd';
import { RootState } from 'StoreTypes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm';

export default function Login() {
    const navigate = useNavigate();
    const { appLoginState } = useSelector((store: RootState) => ({
        appLoginState: store.app.loginState,
    }));

    useEffect(() => {
        if (appLoginState) {
            navigate({
                pathname: process.env.PUBLIC_URL + `/dashboard`,
            });
        }
    }, [appLoginState]);

    return (
        <Row justify="center" align="middle" style={{ minHeight: '90vh' }}>
            <Col xs={18} lg={12} xl={4}>
                <LoginForm />
            </Col>
        </Row>
    );
}
