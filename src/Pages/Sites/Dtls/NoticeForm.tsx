import React, { useEffect, useState } from 'react';
import { Switch, Form, Input, Row, Divider, Button, Upload, Select } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import * as _API from '@API';

export default function NoticeForm({
    FormInitialData,
    ImageList,
    SaveNotice,
}: {
    FormInitialData: {
        category: string;
        title: string;
        content: string;
        active: boolean;
    };
    ImageList: Array<{
        uid: string;
        name: string;
        status: string;
        url: string;
    }>;
    SaveNotice: ({
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
    }) => void;
}) {
    const [form] = Form.useForm();

    const { storeCommonCodesGroup } = useSelector((store: RootState) => ({
        storeCommonCodesGroup: store.app.common.codes.code_group,
    }));

    // 업로드 상태.
    const [imageUploadState, setTmageUploadState] = useState<boolean>(false);
    // 이미지 리스트 ( 업데이트시 사용 )
    const [imagefileList, setImagefileList] = useState<any>([]);

    // 저장 버튼 클릭.
    const handleSave = (values: { category: string; title: string; content: string; active: boolean }) => {
        SaveNotice({
            category: values.category,
            title: values.title,
            content: values.content,
            active: values.active === true ? 'Y' : 'N',
            image: imagefileList.map((image: { uid: number }) => {
                return image.uid;
            }),
        });
    };

    // 이미지 업로드 처리.
    const handleUploadImage = (options: any) => {
        const { file } = options;

        const fetchData = async () => {
            setTmageUploadState(true);
            const formData = new FormData();
            formData.append('media_file', file);
            const response = await _API.uploadSitesNoticeImage(formData);
            if (response.status) {
                const fileObj = {
                    uid: response.payload.media_id,
                    name: response.payload.file_name,
                    status: 'done',
                    url: response.payload.media_full_url,
                };
                setImagefileList((imagefileList: any) => [...imagefileList, fileObj]);
            } else {
                // TODO: error 처리.
            }
            setTmageUploadState(false);
        };
        fetchData().then();
    };

    // 이미지 삭제 처리.
    const handleImageDelete = (e: any) => {
        if (e.file.status === 'removed') {
            setImagefileList(e.fileList);
        }
    };

    // 업데이트시 이미지 스테이트 바뀌면 업데이트 처리.
    useEffect(() => {
        const fnSetImageList = () => {
            setImagefileList(
                ImageList.map(item => {
                    return item;
                })
            );
        };

        if (ImageList.length > 0) {
            fnSetImageList();
        }
    }, [ImageList]);

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="notice-form"
            onFinish={handleSave}
            initialValues={FormInitialData}
        >
            <Form.Item
                label="카테고리"
                name="category"
                rules={[{ required: true, message: '카테고리를 선택해 주세요.', type: 'string' }]}
            >
                <Select>
                    {storeCommonCodesGroup['220'].map(item => (
                        <Select.Option key={item.code_id} value={item.code_id}>
                            {item.code_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="제목"
                name="title"
                rules={[{ required: true, message: '공지사항 제목을 입력해 주세요.', type: 'string' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="내용" name="content">
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="상태" name="active" valuePropName="checked">
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item label="이미지">
                <ImgCrop rotate>
                    <Upload
                        listType="picture-card"
                        fileList={imagefileList}
                        customRequest={handleUploadImage}
                        onChange={handleImageDelete}
                    >
                        {imageUploadState ? '업로드중...' : '+ 등록'}
                    </Upload>
                </ImgCrop>
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
