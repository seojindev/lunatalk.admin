import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable, useLoading } from '@Hooks';
import * as constants from '@Src/Data/PagesMainSlides';
import { getMainSlides, deleteMainSlides } from '@API';
import { MainSlideItem } from 'CommonTypes';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface tableDataInserface {
    totalElements: number;
    content: Array<{ slide: { id: number; uuid: string }; key: string; id: number; name: string; status: string }>;
}

export default function ShowSlides() {
    const { loadingControl } = useLoading();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState<tableDataInserface>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, hasSelected, selectedRowKeys, selectedRow } = useDataTable({
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
                            slide: {
                                id: e.id,
                                uuid: e.uuid,
                            },
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
                            slide: {
                                id: e.id,
                                uuid: e.uuid,
                            },
                            id: e.id,
                            key: e.uuid,
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

    useEffect(() => {
        if (selectedRow) {
            const { key } = selectedRow;
            navigate({
                pathname: process.env.PUBLIC_URL + `/pages/${key}/detail-main-slide`,
            });
        }
    }, [selectedRow]);

    return (
        <>
            <PageHeader addNewPath="pages/add-main-slide" hasSelected={hasSelected} handleDelete={deleteMainSlide} />
            <DataTable />
        </>
    );
}
