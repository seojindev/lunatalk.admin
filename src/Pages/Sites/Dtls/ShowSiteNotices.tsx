import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/SitesSiteNoticeTable';
import * as _API_ from '@API';
import { message as antMessage } from 'antd';

interface tableDataItem {
    key: string;
    title: {
        uuid: string;
        title: string;
    };
    category: {
        code_id: string;
        code_name: string;
    };
    content: {
        default: string;
    };
    active: string;
    image: string[];
    created_at: string;
}

interface tableDataInserface {
    totalElements: number;
    content: tableDataItem[];
}

export default function ShowSiteNotices() {
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
        const fnGetList = async () => {
            const { payload, status, message } = await _API_.getSiteNoticeList();
            if (status) {
                setTableData({
                    totalElements: payload.length,
                    content: payload.map(element => {
                        return {
                            key: String(element.id),
                            title: {
                                uuid: element.uuid,
                                title: element.title,
                            },
                            category: {
                                code_id: element.category.code_id,
                                code_name: element.category.code_name,
                            },
                            content: {
                                default: element.content.default,
                            },
                            active: element.active,
                            image: element.images,
                            created_at: element.created_at,
                        };
                    }),
                });
            } else {
                antMessage.error(message);
            }
        };

        fnGetList().then();
    }, []);

    return (
        <>
            <PageHeader addNewPath="sites/add-site-notice" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
