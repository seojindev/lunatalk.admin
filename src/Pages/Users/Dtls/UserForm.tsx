import React, { useEffect } from 'react';
import { Button, Divider, Form, Input, Row, Switch, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';

export default function UserForm({
    HandleFormData,
    FormInitialData,
    Mode,
}: {
    HandleFormData: (element: {
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
    }) => void;
    FormInitialData: {
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
    };
    Mode: 'create' | 'detail';
}) {
    const { storeCodeGroup } = useSelector((store: RootState) => ({
        storeCodeGroup: store.app.common.codes.code_group,
    }));

    const [form] = Form.useForm();

    const handleSave = async (formData: {
        userLevel: string;
        userStatus: string;
        userType: string;
        userLoginId: string;
        userLoginName: string;
        userEmail: string;
        userLoginPassword: string;
        userMemo: string;
        userPhoneNumber: string;
        userSelectEmail: boolean;
        userSelectMessage: boolean;
    }) => {
        HandleFormData(formData);
    };

    useEffect(() => {
        console.debug(storeCodeGroup['010']);
    }, [storeCodeGroup]);

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="user-form"
            onFinish={handleSave}
            initialValues={FormInitialData}
        >
            <Form.Item
                label="아이디"
                name="userLoginId"
                rules={[{ required: true, message: '사용자 아이디를 입력해 주세요.', type: 'string' }]}
            >
                <Input disabled={Mode === `detail`} />
            </Form.Item>
            <Form.Item
                label="타입"
                name="userType"
                rules={[{ required: true, message: '타입을 선택해 주세요.', type: 'string' }]}
            >
                <Select>
                    {storeCodeGroup['010'].map(item => {
                        return (
                            <Select.Option value={item.code_id} key={item.code_id}>
                                {item.code_name}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                label="레벨"
                name="userLevel"
                rules={[{ required: true, message: '레벨을 선택해 주세요.', type: 'string' }]}
            >
                <Select>
                    {storeCodeGroup['120'].map(item => {
                        return (
                            <Select.Option value={item.code_id} key={item.code_id}>
                                {item.code_name}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item
                label="상태"
                name="userStatus"
                rules={[{ required: true, message: '상태를 선택해 주세요.', type: 'string' }]}
            >
                <Select>
                    {storeCodeGroup['130'].map(item => {
                        return (
                            <Select.Option value={item.code_id} key={item.code_id}>
                                {item.code_name}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            {Mode === `create` && (
                <Form.Item
                    label="비밀번호"
                    name="userLoginPassword"
                    rules={[{ required: true, message: '비밀 번호를 입력해 주세요.', type: 'string' }]}
                >
                    <Input />
                </Form.Item>
            )}

            <Form.Item
                label="이름"
                name="userLoginName"
                rules={[{ required: true, message: '이름을 입력해 주세요.', type: 'string' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="이메일"
                name="userEmail"
                rules={[{ required: true, message: '이름을 입력해 주세요.', type: 'string' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="휴대폰 번호"
                name="userPhoneNumber"
                rules={[{ required: true, message: '전화 번호를 입력해 주세요.', type: 'string' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="메일 수신 동의" name="userSelectEmail" valuePropName="checked">
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item label="문자 수신 동의" name="userSelectMessage" valuePropName="checked">
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item label="메모" name="userMemo">
                <Input.TextArea rows={7} />
            </Form.Item>

            <Divider />
            <Row justify="center">
                <Button type="primary" htmlType="submit">
                    저장
                </Button>
            </Row>
        </Form>
    );
}
