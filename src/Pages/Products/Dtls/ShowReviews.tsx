import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/ProductReviewTable';
import { message } from 'antd';
import * as _API_ from '@API';

export default function ShowReviews() {
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                id: number;
                user: {
                    id: number;
                    name: string;
                    email: string;
                };
                product: {
                    id: number;
                    uuid: string;
                    name: string;
                };
                title: string;
                created_at: string;
            };
        }>;
    }>({
        totalElements: 0,
        content: [],
    });

    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'update-product',
    });

    const getList = async () => {
        const response = await _API_.getProductReviews();
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    return {
                        key: item.id,
                        data: item,
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <PageHeader
                addNewPath="products/add-product"
                hasSelected={hasSelected}
                handleDelete={() => message.warn('상품은 삭제 할수 없습니다. 상태 를 변경해 주세요.')}
            />
            <DataTable />
        </>
    );
}
