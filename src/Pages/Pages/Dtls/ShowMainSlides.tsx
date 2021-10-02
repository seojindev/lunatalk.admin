import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable, useLoading } from '@Hooks';
import * as constants from '@Src/Data/PagesMainSlides';
import { getMainSlides, deleteMainSlides } from '@API';
import { MainSlideItem } from 'CommonTypes';
import { message } from 'antd';

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
    const { DataTable, hasSelected, selectedRowKeys } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'pages/update-main-slide',
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

    const deleteMainSlide = async () => {
        await loadingControl({
            type: 'fetch',
        });
        const response = await deleteMainSlides(selectedRowKeys);
        if (response.status) {
            await loadingControl({
                type: 'success',
            });
            message.success('삭제 되었습니다.').then();
            const listResponse = await getMainSlides();
            if (listResponse.status) {
                setTableData({
                    totalElements: listResponse.payload.length,
                    content: listResponse.payload.map((e: MainSlideItem) => {
                        return {
                            key: e.uuid,
                            id: e.id,
                            name: e.name,
                            status: e.active,
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
            <PageHeader addNewPath="pages/add-main-slide" hasSelected={hasSelected} handleDelete={deleteMainSlide} />
            <DataTable />
        </>
    );
}
