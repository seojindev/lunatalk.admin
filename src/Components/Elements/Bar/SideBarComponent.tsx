import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    DashboardOutlined,
    FundProjectionScreenOutlined,
    PartitionOutlined,
    SlidersOutlined,
    TeamOutlined,
    PayCircleOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const { Sider } = Layout;

export default function SideBarComponent({ handleOnCollapse, collapsed }: { handleOnCollapse: any; collapsed: any }) {
    const theme = 'light';

    const history = useHistory();

    const handleSiderMenuClick = (action: any) => {
        console.log('menu:', action);
        switch (action.key) {
            case 'dashboard':
                history.push('/dashboard');
                break;
            case 'showProducts':
                history.push('/products/product-list');
                break;
            case 'addProduct':
                history.push('/products/product-add');
                break;
            case 'showCustomers':
                history.push('/customers');
                break;
            case 'addCustomer':
                history.push('/add-customer');
                break;
            default:
                history.push('/');
        }
    };

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="80"
            onCollapse={handleOnCollapse}
            collapsed={collapsed}
            width="256"
            theme={theme}
        >
            <a>
                <div className="menu-logo" />
            </a>
            <Menu mode="inline" theme={theme} onClick={handleSiderMenuClick}>
                <Menu.Item key="dashboard">
                    <DashboardOutlined />
                    <span className="nav-text">대시보드</span>
                </Menu.Item>
                <SubMenu
                    key="products"
                    title={
                        <span>
                            <PartitionOutlined />
                            <span>상품관리</span>
                        </span>
                    }
                >
                    <Menu.Item key="showProducts">
                        <span className="nav-text">상품 리스트</span>
                    </Menu.Item>
                    <Menu.Item key="addProduct">
                        <span className="nav-text">상품 추가</span>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="customers"
                    title={
                        <span>
                            <TeamOutlined />
                            <span>회원관리</span>
                        </span>
                    }
                >
                    <Menu.Item key="showCustomers">
                        <span className="nav-text">회원 리스트</span>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="manages"
                    title={
                        <span>
                            <SlidersOutlined />
                            <span>싸이트관리</span>
                        </span>
                    }
                >
                    <Menu.Item key="showNotice">
                        <span className="nav-text">공지사항</span>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="pages"
                    title={
                        <span>
                            <FundProjectionScreenOutlined />
                            <span>페이지관리</span>
                        </span>
                    }
                >
                    <Menu.Item key="showMainSlide">
                        <span className="nav-text">메인슬라이드</span>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="pays"
                    title={
                        <span>
                            <PayCircleOutlined />
                            <span>결제관리</span>
                        </span>
                    }
                >
                    <Menu.Item key="showPays">
                        <span className="nav-text">결제리스트</span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
}
