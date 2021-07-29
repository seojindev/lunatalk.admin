import React from 'react';
import { Header } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/Constants';

export default function ShowProducts() {
    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: constants.data,
        updateEntityPath: 'update-product',
    });

    return (
        <>
            <Header addNewPath="product-add" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
