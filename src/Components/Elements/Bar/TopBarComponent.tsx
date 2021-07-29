import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Badge } from 'antd';
import { TopAvatar } from '@Element/Avatar';

const { Header } = Layout;
const { SubMenu } = Menu;

// FIXME: 타입 정의.
export default function TopBarComponent({ collapsed, handleOnCollapse }: { collapsed: any; handleOnCollapse: any }) {
    const getCollapseIcon = () => {
        if (collapsed) {
            return <MenuUnfoldOutlined onClick={handleOnCollapse} className="trigger" />;
        }
        return <MenuFoldOutlined onClick={handleOnCollapse} className="trigger" />;
    };

    // const handleLanguageMenuClick = () => {
    //     console.debug('handleLanguageMenuClick');
    // };

    const handleSettingMenuClick = () => {
        console.debug('handleSettingMenuClick');
    };
    const handleLogout = () => {
        console.debug('handleLogout');
    };

    return (
        <Header className="header" style={{ background: '#fff', padding: 0 }}>
            <div
                style={{
                    float: 'left',
                    width: '100%',
                    alignSelf: 'center',
                    display: 'flex',
                }}
            >
                {window.innerWidth > 992 && getCollapseIcon()}
            </div>
            <Menu
                key="notice"
                // onClick={this.handleLanguageMenuClick}
                mode="horizontal"
                className="menu"
            >
                <SubMenu
                    key="showNotice:1"
                    title={
                        <Badge dot>
                            <BellOutlined />
                        </Badge>
                    }
                />
            </Menu>
            <Menu key="avatar" onClick={handleSettingMenuClick} mode="horizontal" className="menu">
                <SubMenu title={TopAvatar('Cemal')} key="setting">
                    <Menu.Item key="setting-1">
                        <span>
                            <UserOutlined />
                            Profile
                        </span>
                    </Menu.Item>
                    <Menu.Item key="setting-2">
                        <span>
                            <LogoutOutlined onClick={handleLogout} />
                            Logout
                        </span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Header>
    );
}
