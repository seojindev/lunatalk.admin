import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/ProductTable';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import { productListItem } from 'CommonTypes';
import { message } from 'antd';

interface tableDataItem {
    key: string;
    product: {
        uuid: string;
        name: string;
    };
    category: string;
    color: string[];
    wireless: string[];
    description: string;
    qty: string;
    price: string;
}

interface tableDataInserface {
    totalElements: number;
    content: tableDataItem[];
}

export default function ShowProducts() {
    const { storeProductsList } = useSelector((store: RootState) => ({
        storeProductsList: store.app.common.products.list,
    }));

    const [tableData, setTableData] = useState<tableDataInserface>({
        totalElements: 0,
        content: [],
    });

    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'update-product',
    });

    useEffect(() => {
        const fnSetTableData = () => {
            setTableData({
                totalElements: storeProductsList.length,
                content: storeProductsList.map((item: productListItem) => {
                    return {
                        key: String(item.id),
                        product: {
                            uuid: item.uuid,
                            name: item.name,
                        },
                        category: item.category.name,
                        description: '',
                        color: item.color.map(e => e.name),
                        wireless: item.wireless.map(e => e.wireless),
                        qty: item.stock.string,
                        price: item.price.string,
                    };
                }),
            });
        };

        fnSetTableData();
    }, [storeProductsList]);

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
