import React from 'react';
import { Descriptions, Radio, Button } from 'antd';
import { PageHeader } from '@Layouts';

export default function DetailProduct() {
    return (
        <>
            <Descriptions bordered title="Custom Size" size="default" extra={<Button type="primary">Edit</Button>}>
                <Descriptions.Item label="상품명">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="카테고리">Prepaid</Descriptions.Item>
                <Descriptions.Item label="옵션(색상)">18:00:00</Descriptions.Item>
                <Descriptions.Item label="옵션(유무선)">$80.00</Descriptions.Item>
                <Descriptions.Item label="수량">$20.00</Descriptions.Item>
                <Descriptions.Item label="판매 상태">$60.00</Descriptions.Item>
                <Descriptions.Item label="상품상태">$60.00</Descriptions.Item>
                <Descriptions.Item label="메모">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1<br />
                </Descriptions.Item>
                <Descriptions.Item label="대표 이미지">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1<br />
                </Descriptions.Item>
                <Descriptions.Item label="상세 이미지">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1<br />
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}
