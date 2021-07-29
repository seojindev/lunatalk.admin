import { Row, Col } from 'antd';
import LoginForm from './LoginForm';

export default function Login() {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '90vh' }}>
            <Col xs={18} lg={12} xl={4}>
                <LoginForm />
            </Col>
        </Row>
    );
}
