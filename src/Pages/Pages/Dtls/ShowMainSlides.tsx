import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable, useLoading } from '@Hooks';
import * as constants from '@Src/Data/PagesMainSlides';
import { getMainSlides } from '@API';
import { MainSlideItem } from 'CommonTypes';

interface tableDataItem {
    key: string;
    id: number;
    name: string;
    status: string;
}

interface tableDataInserface {
    totalElements: number;
    content: tableDataItem[];
}

export default function ShowSlides() {
    const { loadingControl } = useLoading();
    const [tableData, setTableData] = useState<tableDataInserface>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'update-main-slide',
    });

    useEffect(() => {
        const fnGetMainSlideList = async () => {
            await loadingControl({
                type: 'fetch',
            });
            const response = await getMainSlides();
            if (response.status) {
                await loadingControl({
                    type: 'success',
                });
                setTableData({
                    totalElements: response.payload.length,
                    content: response.payload.map((e: MainSlideItem) => {
                        return {
                            key: e.uuid,
                            id: e.id,
                            name: e.name,
                            status: e.active,
                        };
                    }),
                });
            } else {
                await loadingControl({
                    type: 'error',
                });
            }
        };
        fnGetMainSlideList().then();
    }, []);

    return (
        <>
            <PageHeader addNewPath="pages/add-customers" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
