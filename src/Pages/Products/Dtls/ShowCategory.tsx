import React from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/ProductCategoryTable';

export default function ShowCategory() {
    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: constants.data,
        updateEntityPath: 'update-product',
    });

    return (
        <>
            <PageHeader addNewPath="products/add-product-category" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
