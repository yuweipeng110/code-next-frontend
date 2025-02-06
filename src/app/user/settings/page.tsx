"use client";
import { useCallback, useEffect, useState } from 'react';
import { Card, Flex, Layout, Menu, MenuProps } from 'antd';
import { BellFilled, LeftOutlined, LinkOutlined, MessageFilled, SafetyCertificateFilled, ScheduleFilled, SettingFilled, StopFilled } from '@ant-design/icons';
import UserSettingProfile from '@/components/UserSettings/Profile';
import UserSettingAccount from '@/components/UserSettings/Account';
import UserSettingCommon from '@/components/UserSettings/Common';
import UserSettingMessage from '@/components/UserSettings/Message';
import UserSettingBlock from '@/components/UserSettings/Block';
import UserSettingSecurity from '@/components/UserSettings/Security';
import UserSettingBinding from '@/components/UserSettings/Binding';
import "./index.css";
import UserSettingSecurityPassword from '@/components/UserSettings/Security/UpdatePassword';
import UserSettingSecurityCellphone from '@/components/UserSettings/Security/UpdateCellphone';
import UserSettingSecurityEmail from '@/components/UserSettings/Security/UpdateEmail';
import { ProCard } from '@ant-design/pro-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

type MenuItem = Required<MenuProps>['items'][number];

const UserSettingsPage: React.FC = () => {

    const loginUser = useSelector((state: RootState) => state.loginUser);

    const menuList: MenuItem[] = [
        {
            key: "profile",
            label: "个人资料",
            icon: <ScheduleFilled />,
        },
        // {
        //     key: "account",
        //     label: "账号设置",
        //     icon: <UserOutlined />,
        // },
        {
            key: "security",
            label: "安全设置",
            icon: <SafetyCertificateFilled />,
        },
        {
            key: "binding",
            label: "账号绑定",
            icon: <LinkOutlined />,
        },
        {
            key: "common",
            label: "通用设置",
            icon: <SettingFilled />,
        },
        {
            key: "message",
            label: "消息设置",
            icon: <BellFilled />,
        },
        {
            key: "block",
            label: "屏蔽管理",
            icon: <StopFilled />,
        },
    ]

    const [activeKey, setActiveKey] = useState<string>(menuList[0].key.toString());

    const [childActiveKey, setChildActiveKey] = useState<string>("");

    const handleChildActiveKey = useCallback((key: string) => {
        setChildActiveKey(key);
    }, [])

    const renderChildren = () => {
        const childComponents = {
            'security/updatePassword': <UserSettingSecurityPassword />,
            'security/updateCellphone': <UserSettingSecurityCellphone />,
            'security/updateEmail': <UserSettingSecurityEmail />,
        };

        const activeComponents = {
            'profile': <UserSettingProfile />,
            'account': <UserSettingAccount />,
            'security': <UserSettingSecurity handleChildActiveKey={handleChildActiveKey} />,
            'binding': <UserSettingBinding />,
            'common': <UserSettingCommon />,
            'message': <UserSettingMessage />,
            'block': <UserSettingBlock />,
        };

        return childComponents[childActiveKey] || activeComponents[activeKey] || null;
    };

    return (
        <div id="user-settings-page" className="max-width-content">
            <Layout.Header className="user-settings-layout-header" >
                <Link href={`/user/${loginUser.id}`}><LeftOutlined />返回个人主页</Link>
            </Layout.Header>
            <div style={{ marginBottom: 16 }} />
            <Flex gap={24}>
                <Layout.Sider className="user-settings-layout-sider" trigger={null} collapsedWidth={20} width={230}>
                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        onClick={({ key }) => {
                            setActiveKey(key);
                            setChildActiveKey("");
                        }}
                        items={menuList}
                        style={{ border: 'none' }}
                    />
                </Layout.Sider>
                <Layout.Content>
                    <div className="sub-view-box">
                        {renderChildren()}
                    </div>
                </Layout.Content>
            </Flex>
        </div>
    )
}

export default UserSettingsPage;