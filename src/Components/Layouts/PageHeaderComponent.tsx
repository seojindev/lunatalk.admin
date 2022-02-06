import React from 'react';
import { Button, Col, Divider, Input, Popconfirm, Row } from 'antd';
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

export default function PageHeaderComponent({
    addNewPath,
    hasSelected,
    handleSearch,
    handleDelete,
}: {
    addNewPath: any;
    hasSelected: any;
    handleSearch?: any;
    handleDelete?: any;
}) {
    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate('/' + addNewPath);
    };

    return (
        <>
            <Row>
                <Col>
                    <Search
                        placeholder="Search"
                        onSearch={handleSearch}
                        allowClear
                        style={{ float: 'left', width: 350 }}
                    />
                </Col>
                <Col flex="auto">
                    <Button icon={<PlusOutlined />} type="primary" style={{ float: 'right' }} onClick={handleAddNew}>
                        등록
                    </Button>

                    <Button
                        icon={<DeleteOutlined />}
                        disabled={!hasSelected}
                        style={{ float: 'right', marginRight: 12 }}
                    >
                        <Popconfirm
                            title="삭제 하시겠습니까?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => {
                                // console.debug('onConfirm');
                                handleDelete();
                            }}
                        >
                            Delete
                        </Popconfirm>
                    </Button>
                </Col>
            </Row>
            <Divider />
        </>
    );
}
