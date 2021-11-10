import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/UsersTable';
import { getUserList } from '@API';
import { message } from 'antd';
import * as CommonTypes from 'CommonTypes';

export default function ShowUsers() {
    const [users, setUsers] = useState<
        Array<{
            key: string;
            type: string;
            level: string;
            status: string;
            login_id: {
                uuid: string;
                login_id: string;
            };
            name: string;
            email: string;
            phone_number: string;
            created_at: string;
        }>
    >();

    const { DataTable, hasSelected } = useDataTable({
        columns: constants.columns,
        dataSource: {
            totalElements: users?.length,
            content: users,
        },
        updateEntityPath: 'update-users',
    });

    useEffect(() => {
        const fnGetUserList = async () => {
            const response = await getUserList();
            if (response.status) {
                setUsers(
                    response.payload.map((item: CommonTypes.userListResponseItem) => {
                        return {
                            key: String(item.id),
                            type: item.type.code_name,
                            level: item.level.code_name,
                            status: item.status.code_name,
                            login_id: {
                                uuid: item.uuid,
                                login_id: item.login_id,
                            },
                            name: item.name,
                            email: item.email,
                            phone_number: item.phone_number,
                            created_at: item.created_at,
                        };
                    })
                );
            } else {
                message.error(response.message);
            }
        };

        fnGetUserList().then();
    }, []);

    return (
        <>
            <PageHeader addNewPath="users/add-users" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
