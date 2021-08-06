import React from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/PaysShowTable';

export default function ShowSlides() {
    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: constants.data,
        updateEntityPath: 'update-pays',
    });

    return (
        <>
            <PageHeader addNewPath="pages/add-customers" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
