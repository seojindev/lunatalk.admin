import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/ProductCategoryTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import { ProductCategoryItem } from 'CommonTypes';
import { productCateogoryResetAction, showCategoryAction } from '@Store/Products';

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
    const dispatch = useDispatch();

    const { storeState, storeResult } = useSelector((store: RootState) => ({
        storeState: store.products.category.show.state,
        storeResult: store.products.category.show.result,
    }));

    const [tableData, setTableData] = useState<tableDataInserface>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'products/update-product-category',
    });

    useEffect(() => {
        const funcSetTableData = () => {
            setTableData({
                totalElements: storeResult.length,
                content: storeResult.map((e: ProductCategoryItem) => {
                    return {
                        key: e.uuid,
                        id: e.id,
                        name: e.name,
                        products: e.products_count,
                    };
                }),
            });
        };

        if (storeState === 'success') {
            funcSetTableData();
        }
    }, [storeState]);

    useEffect(() => {
        const funcGetTableData = () => {
            dispatch(showCategoryAction());
        };

        funcGetTableData();

        return () => {
            dispatch(productCateogoryResetAction());
        };
    }, []);

    return (
        <>
            <PageHeader addNewPath="products/add-product-category" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
