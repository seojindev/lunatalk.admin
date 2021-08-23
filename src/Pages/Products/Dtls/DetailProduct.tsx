import React, { useState } from 'react';
import { Descriptions, Button, Image, Badge, Tag } from 'antd';

export default function DetailProduct() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            {/* <Card title="상품 등록" loading={false}> */}
            <Descriptions
                bordered
                title="Custom Size"
                size="middle"
                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
                colon={true}
                extra={<Button type="primary">Edit</Button>}
                labelStyle={{ width: '20%' }}
            >
                <Descriptions.Item label="카테고리" span={2}>
                    AEC
                </Descriptions.Item>
                <Descriptions.Item label="상품명" span={2}>
                    가죽 가방
                </Descriptions.Item>
                <Descriptions.Item label="옵션(색상)" span={2}>
                    <Tag color="magenta">베이지</Tag>
                    <Tag color="red">레드</Tag>
                    <Tag color="blue">blue</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="옵션(유무선)">없음</Descriptions.Item>
                <Descriptions.Item label="남은 수량">20</Descriptions.Item>
                <Descriptions.Item label="판매 상태">
                    <Badge status="processing" text="판매중" />
                </Descriptions.Item>
                <Descriptions.Item label="상품 상태">
                    <Badge status="processing" text="정상" />
                </Descriptions.Item>
                <Descriptions.Item label="상품 이미지" span={2}>
                    <>
                        <Image
                            preview={{ visible: false }}
                            width={200}
                            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                            onClick={() => setVisible(true)}
                        />
                        <div style={{ display: 'none' }}>
                            <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                                <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                                <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
                            </Image.PreviewGroup>
                        </div>
                    </>
                </Descriptions.Item>
                <Descriptions.Item label="상세 이미지" span={2}>
                    <>
                        <Image
                            preview={{ visible: false }}
                            width={200}
                            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                            onClick={() => setVisible(true)}
                        />
                        <div style={{ display: 'none' }}>
                            <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                                <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                                <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
                            </Image.PreviewGroup>
                        </div>
                    </>
                </Descriptions.Item>
                <Descriptions.Item label="메모">
                    메모 테스팅. <br /> 21일 입고 예정인데 그때 가봐야 알수 있을거 같음.
                </Descriptions.Item>
            </Descriptions>
            {/* </Card> */}
        </>
    );
}
