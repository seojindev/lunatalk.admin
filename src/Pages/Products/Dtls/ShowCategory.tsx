import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable, useLoading } from '@Hooks';
import * as constants from '@Src/Data/ProductCategoryTable';
import { ProductCategoryItem } from 'CommonTypes';
import { deleteProductCategory, getProductCategory } from '@API';
import { message } from 'antd';

interface tableDataItem {
    key: string;
    id: number;
    name: string;
    products: number;
}
interface tableDataInserface {
    totalElements: number;
    content: tableDataItem[];
}

export default function ShowCategory() {
    const { loadingControl } = useLoading();
    const [tableData, setTableData] = useState<tableDataInserface>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, hasSelected, selectedRowKeys } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'products/update-product-category',
    });

    useEffect(() => {
        const fnGetCategoryList = async () => {
            await loadingControl({
                type: 'fetch',
            });
            const response = await getProductCategory();
            if (response.status) {
                await loadingControl({
                    type: 'success',
                });
                setTableData({
                    totalElements: response.payload.length,
                    content: response.payload.map((e: ProductCategoryItem) => {
                        return {
                            key: e.uuid,
                            id: e.id,
                            name: e.name,
                            products: e.products_count,
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

        fnGetCategoryList().then();
    }, []);

    const deleteCategory = async () => {
        await loadingControl({
            type: 'fetch',
        });
        const response = await deleteProductCategory(selectedRowKeys);
        if (response.status) {
            await loadingControl({
                type: 'success',
            });
            message.success('삭제 되었습니다.').then();
            const listResponse = await getProductCategory();
            if (listResponse.status) {
                setTableData({
                    totalElements: listResponse.payload.length,
                    content: listResponse.payload.map((e: ProductCategoryItem) => {
                        return {
                            key: e.uuid,
                            id: e.id,
                            name: e.name,
                            products: e.products_count,
                        };
                    }),
                });
            } else {
                // FIXME: 에러 날때?
                await loadingControl({
                    type: 'error',
                });
                message.error('에러가 발생하였습니다.').then();
            }
        } else {
            // FIXME: 에러 날때?
            await loadingControl({
                type: 'error',
            });
            message.error('에러가 발생하였습니다.').then();
        }
    };

    return (
        <>
            <PageHeader
                addNewPath="products/add-product-category"
                hasSelected={hasSelected}
                handleDelete={deleteCategory}
            />
            <DataTable />
        </>
    );
}
