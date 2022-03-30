import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable, useLoading } from '@Hooks';
import * as constants from '@Src/Data/ProductBadgeTable';
// import { ProductCategoryItem } from 'CommonTypes';
import { getProductBadgeList } from '@API';
// import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface tableDataItem {
    key: number;
    data: {
        id: number;
        name: string;
        image: {
            id: number;
            file_name: string;
            url: string;
        };
    };
}
interface tableDataInserface {
    totalElements: number;
    content: tableDataItem[];
}

export default function ShowProductBadge() {
    const navigate = useNavigate();
    const { loadingControl } = useLoading();
    const [tableData, setTableData] = useState<tableDataInserface>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, hasSelected, selectedRow } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'products/update-product-category',
    });

    useEffect(() => {
        if (selectedRow) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { data } = selectedRow;

            navigate({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                pathname: process.env.PUBLIC_URL + `/products/${data.id}/detail-product-badge`,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        const fnGetList = async () => {
            await loadingControl({
                type: 'fetch',
            });
            const response = await getProductBadgeList();
            if (response.status) {
                await loadingControl({
                    type: 'success',
                });
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
                // FIXME: 에러 날때?
                await loadingControl({
                    type: 'error',
                });
            }
        };

        fnGetList().then();
    }, []);

    return (
        <>
            <PageHeader
                addNewPath="products/add-product-badge"
                hasSelected={hasSelected}
                // handleDelete={deleteCategory}
            />
            <DataTable />
        </>
    );
}
