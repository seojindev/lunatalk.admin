import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable, useLoading } from '@Hooks';
import * as constants from '@Src/Data/ShowOrderTable';
import { getProductOrder } from '@API';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ShowOrders() {
    const { loadingControl } = useLoading();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: string;
            uuid: string;
            id: number;
            orderName: string;
            user_id: string;
            user_email: string;
            user_name: string;
            user_phone_number: string;
            order_price: string;
            order_active: string;
            order_state: string;
            order_delivery: string;
            order_created_at: string;
            // order_payments_at: string;
        }>;
    }>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, hasSelected, selectedRow } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'update-orders',
    });

    useEffect(() => {
        const fnGetProductOrder = async () => {
            await loadingControl({
                type: 'fetch',
            });
            const response = await getProductOrder();
            if (response.status) {
                await loadingControl({
                    type: 'success',
                });
                setTableData({
                    totalElements: response.payload.length,
                    content: response.payload.map(e => {
                        return {
                            key: e.uuid,
                            uuid: e.uuid,
                            id: e.id,
                            orderName: e.order_name,
                            user_id: e.user.login_id,
                            user_email: e.user.email,
                            user_name: e.user.name,
                            user_phone_number: e.user.phone_number.type2,
                            order_price: e.order_price.string,
                            order_active: e.active === 'Y' ? '정상' : '시도',
                            order_state: e.state.code_name,
                            order_delivery: e.delivery.code_name,
                            order_created_at: dayjs(e.created_at.type3).format('YYYY-MM-DD HH:mm'),
                            // order_payments_at:
                        };
                    }),
                });
            } else {
                // 가져오기 실패 했을때는??
                await loadingControl({
                    type: 'error',
                });
            }
        };

        fnGetProductOrder().then();
    }, []);

    useEffect(() => {
        if (selectedRow) {
            const { uuid } = selectedRow;
            navigate({
                pathname: process.env.PUBLIC_URL + `/orders/show-orders/${uuid}/detail`,
            });
        }
    }, [selectedRow]);
    return (
        <>
            <PageHeader addNewPath="customers/add-customers" hasSelected={hasSelected} />
            <DataTable />
        </>
    );
}
