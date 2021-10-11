import React, { useEffect, useState } from 'react';
import * as _API from '@API';
import { Switch, Form, Input, Row, Divider, Button, Upload, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

interface imagesInterface {
    uid: number;
    name: string;
    status: 'done' | 'loading';
    url: string;
    active: boolean;
}

interface SlideFormProps {
    SlideUUid: string;
    FormMode: 'add' | 'update';
    FormInitialData: {
        slideName: string;
        slideActive: boolean;
        slideLink: string;
    };
    ImageInitialData: imagesInterface[];
}

export default function SlideForm({ SlideUUid, FormMode, FormInitialData, ImageInitialData }: SlideFormProps) {
    const [form] = Form.useForm();
    const history = useHistory();
    const [imgData, setImgData] = useState<any>([]);
    //이미지 로딩 처리.
    const [loadingImg, setLoadingImg] = useState<boolean>(false);

    const handleSave = async ({
        slideName,
        slideActive,
        slideLink,
    }: {
        slideName: string;
        slideActive: boolean;
        slideLink: string;
    }) => {
        if (imgData.length === 0) {
            message.error('이미지를 업로드해주세요.');
        }

        //form 데이터 처리.
        const payload = {
            name: slideName,
            active: slideActive ? 'Y' : 'N',
            main_slide: imgData.map((e: any) => {
                return {
                    id: e.uid,
                    link: slideLink,
                };
            }),
        };

        if (FormMode === 'add') {
            const addResponse = await _API.addMainSlide(payload);
            if (addResponse.status) {
                message.success('정상처리 하였습니다.');
                history.push({ pathname: `${process.env.PUBLIC_URL}/pages/show-main-slide` });
            } else {
                message.error(addResponse.message);
            }
        } else if (FormMode === 'update') {
            const updateResponse = await _API.updateMainSlide({
                uuid: SlideUUid,
                payload: payload,
            });
            if (updateResponse.status) {
                message.success('정상처리 하였습니다.');
                history.push({ pathname: `${process.env.PUBLIC_URL}/pages/show-main-slide` });
            } else {
                message.error(updateResponse.message);
            }
        }
    };

    const mainSlideImageOnChange = (option: any) => {
        const { file } = option;
        const fetchData = async () => {
            setLoadingImg(true);
            const formData = new FormData();
            formData.append('media_file', file);
            const response = await _API.uploadMainSlideImage(formData);
            if (response.status) {
                const fileObj = {
                    uid: response.payload.media_id,
                    name: response.payload.file_name,
                    status: 'done',
                    url: response.payload.media_full_url,
                };
                // TODO: 일단 하나만 처리
                setImgData([fileObj]);
            } else {
                // TODO: error 처리.
            }
            setLoadingImg(false);
        };
        fetchData().then();
    };

    // 이미지 업로드 완료시 스테이트 및 form 에 등록처리
    useEffect(() => {
        const fnSetSlideImage = () => {
            setImgData(
                ImageInitialData.map(item => {
                    return {
                        uid: item.uid,
                        name: item.name,
                        status: 'done',
                        url: item.url,
                        active: item.active,
                    };
                })
            );
        };
        if (ImageInitialData) {
            fnSetSlideImage();
        }
    }, [ImageInitialData]);

    // 슬라이드 이미지 삭제 버튼 처리.
    const handleSlideImageOnChange = (e: any) => {
        if (e.file.status === 'removed') {
            setImgData([]);
        }
    };
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="slide-form"
            onFinish={handleSave}
            initialValues={FormInitialData}
        >
            <Form.Item
                label="슬라이드 명"
                name="slideName"
                rules={[{ required: true, message: '슬라이드 명을 입력해주세요.', type: 'string' }]}
            >
                <Input placeholder="슬라이드 명을 입력해주세요." />
            </Form.Item>
            <Form.Item label="슬라이드 상태" name="slideActive" valuePropName="checked">
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
            </Form.Item>
            <Form.Item label="슬라이드 사진">
                <Upload
                    name="avatar"
                    fileList={imgData}
                    listType="picture-card"
                    customRequest={mainSlideImageOnChange}
                    onChange={handleSlideImageOnChange}
                >
                    {loadingImg ? '업로드중...' : '+ 등록'}
                </Upload>
            </Form.Item>
            <Form.Item
                label="링크"
                name="slideLink"
                rules={[
                    {
                        required: true,
                        message: '이미지를 클릭하였을때 이동할 링크를 입력해주세요.',
                        type: 'string',
                    },
                ]}
            >
                <Input placeholder="이미지를 클릭하였을때 이동할 링크를 입력해주세요." />
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
