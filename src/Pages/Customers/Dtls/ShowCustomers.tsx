import React from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/CustomersTable';

export default function ShowCustomers() {
    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: constants.data,
        updateEntityPath: 'update-customer',
    });

    return (
        <>
            <PageHeader addNewPath="customers/add-customers" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
