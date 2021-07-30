import { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { useHistory } from 'react-router-dom';
import { isEmpty, cookieManager } from '@Helper';

export default function LoginForm() {
    // const history = useHistory();
    const [checkState, setCheckState] = useState<boolean>(false);
    const [checkRemember, setCheckRemember] = useState<{ state: boolean; id: string }>({ state: true, id: '' });

    const onFinish = ({
        login_id,
        // login_password,
        remember,
    }: {
        login_id: string;
        // login_password: string;
        remember: boolean;
    }) => {
        // history.push({
        //     pathname: process.env.PUBLIC_URL + `/main/dashboard`,
        // });

        if (remember === true) {
            cookieManager.set('remember', login_id, 24 * 31);
        }
    };

    useEffect(() => {
        const checkCookieRemember = () => {
            const remember = cookieManager.get('remember');

            if (!isEmpty(remember)) {
                setCheckRemember({
                    state: true,
                    id: remember,
                });
            }
        };

        checkCookieRemember();
        setCheckState(true);
    }, []);

    useEffect(() => {
        console.debug(checkRemember);
    }, [checkRemember]);

    return (
        <>
            {checkState === true && (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: checkRemember.state,
                    }}
                    onFinish={onFinish}
                    fields={[
                        {
                            name: ['login_id'],
                            value: checkRemember.id,
                        },
                    ]}
                >
                    <Form.Item
                        name="login_id"
                        rules={[
                            {
                                required: true,
                                message: '로그인 아이디를 입력해 주세요!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="로그인 아이디" />
                    </Form.Item>
                    <Form.Item
                        name="login_password"
                        rules={[
                            {
                                required: true,
                                message: '비밀번호를 입력해 주세요!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="비밀번호"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
}
