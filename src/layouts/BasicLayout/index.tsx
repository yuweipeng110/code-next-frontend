"use client";
import { ProLayout } from '@ant-design/pro-components';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import Link from 'next/link';
import Image from 'next/image';
import { menus } from '../../../config/menu';
import SearchInput from './components/SearchInput';
import GlobalFooter from '@/components/GlobalFooter/page';
import BasicLayoutDropdown from './components/BasicLayoutDropdown';
import VipEntry from './components/VipEntry';
import Notification from './components/Notification';
import "./index.css";
import SuspensionPanel from '@/components/SuspensionPanel';
import { DEFAULT_AVATAR, DEFAULT_USER_NAME } from '@/constants';

type Props = {
    children: React.ReactNode;
};

/**
 * 全局通用布局
 * 
 * @param children 
 * @returns 
 */
const BasicLayout: React.FC<Props> = ({ children }) => {
    const pathname = usePathname();
    // 当前登录用户
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const router = useRouter();

    return (
        <div id="basic-layout">
            <ProLayout
                layout="top"
                fixSiderbar
                splitMenus
                fixedHeader
                token={{
                    header: {
                        colorTextMenuSelected: '#1E80FF',
                    },
                }}
                theme="dark"
                title="code-next-frontend"
                // layout="top"
                logo={
                    <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
                }
                location={{
                    pathname,
                }}
                // headerRender={false} // 隐藏头部 沉浸阅读时需开启
                menu={{
                    type: 'sub',
                }}
                avatarProps={{
                    src: loginUser.userAvatar || DEFAULT_AVATAR,
                    size: "large",
                    title: loginUser.userName || DEFAULT_USER_NAME,
                    // src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    // size: 'large',
                    // title: '七妮妮',
                    render: (props, dom) => {
                        if (!loginUser.id) {
                            return (
                                <div
                                    onClick={() => {
                                        router.push("/user/login");
                                    }}
                                >
                                    {dom}
                                </div>
                            );
                        }
                        return <BasicLayoutDropdown children={dom} />;
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <SearchInput />,
                        <VipEntry />,
                        loginUser.id && <Notification />,
                    ];
                }}
                headerTitleRender={(logo, title) => {
                    return (
                        <Link href={"/"}>
                            {logo}
                            {title}
                        </Link>
                    );
                }}
                menuDataRender={() => {
                    return menus;
                }}
                menuItemRender={(item, dom) => (
                    <Link href={item.path || "/"} target={item.target}>
                        {dom}
                    </Link>
                )}
                // 渲染底部栏
                footerRender={() => {
                    return <GlobalFooter />;
                }}
            // style={{ padding: "14px 20px 30px !important" }}
            >
                {children}
            </ProLayout>
            <SuspensionPanel />
        </div>
    );
};

export default BasicLayout;