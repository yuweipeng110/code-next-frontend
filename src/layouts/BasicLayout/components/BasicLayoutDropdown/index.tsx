import React from 'react';
import { Dropdown, message } from 'antd';
import {
    BellOutlined,
    LogoutOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores';
import { userLogoutUsingGet } from '@/api/userController';
import { setLoginUser } from '@/stores/loginUser';
import { DEFAULT_USER } from '@/constants/user';
import { useRouter } from 'next/navigation';
import './index.css';
import { loginUserInfoStorage } from '@/utils/token';

type Props = {
    children: React.ReactNode;
};

const BasicLayoutDropdown: React.FC<Props> = ({ children }) => {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    /**
     * 用户注销
     */
    const userLogout = async () => {
        try {
            await userLogoutUsingGet();
            message.success("已退出登录");
            dispatch(setLoginUser(DEFAULT_USER));
            loginUserInfoStorage.removeUserInfo();
            router.push("/user/login");
        } catch (e: any) {
            message.error("操作失败，" + e.message);
        }
    };

    return (
        <Dropdown
            overlayClassName="basic-layout-dropdown"
            trigger={['click']}
            placement="bottomRight"
            menu={{
                items: [
                    {
                        key: 'userCenter',
                        icon: <UserOutlined />,
                        label: <Link href={'/user/center'} >个人中心</Link>,
                    },
                    {
                        key: 'addPost',
                        icon: <PlusOutlined />,
                        label: <Link href={'/post/new'} >创建帖子</Link>,
                    },
                    {
                        key: 'userMessage',
                        icon: <BellOutlined />,
                        label: <Link href={'/user/message'} >我的消息</Link>,
                    },
                    {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                    },
                ],
                onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                        userLogout();
                    } else if (key === "userCenter") {
                        router.push("/user/center");
                    }
                }
            }}
        >
            {children}
        </Dropdown>
    )
}

export default BasicLayoutDropdown;