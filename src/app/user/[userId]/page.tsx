"use client";
import { useEffect, useState } from 'react';
import { Affix, Flex, Layout, message } from 'antd';
import { useParams } from 'next/navigation';
import UserCenterFollow from '@/components/UserCenter/Follow';
import UserCenterInfo from '@/components/UserCenter/Info';
import UserCenterDetailList from '@/components/UserCenter/DetailList';
import UsersRecommend from '@/components/UserCenter/Recommend';
import UserCenterMore from '@/components/UserCenter/More';
import UserCenterAchievement from '@/components/UserCenter/Achievement';
import { getUserVoUsingGet } from '@/api/userController';
import "./index.css";

/**
 * 用户中心页面
 */
const UserPage: React.FC = () => {

    const { userId } = useParams();

    const [userInfo, setUserInfo] = useState<API.UserVO>(Object.create(null));

    const loadUserData = async () => {
        try {
            const query = {
                id: userId as unknown as number,
            };
            const res = await getUserVoUsingGet(query);
            console.log('res', res);
            setUserInfo(res.data);
        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <div id="user-page" className="max-width-content-2">
            <div style={{ marginBottom: 16 }} />
            <Flex gap={24}>
                <Layout.Content>
                    <UserCenterInfo userInfo={userInfo} />
                    <div style={{ marginBottom: 16 }} />
                    <UsersRecommend />
                    <div style={{ marginBottom: 16 }} />
                    <UserCenterDetailList />
                </Layout.Content>
                <Layout.Sider className="user-layout-sider" trigger={null} collapsedWidth={20} width={240}>
                    <Affix offsetTop={70}>
                        <UserCenterAchievement />
                        <div style={{ marginBottom: 16 }} />
                        <UserCenterFollow userInfo={userInfo} />
                        <div style={{ marginBottom: 16 }} />
                        <UserCenterMore userInfo={userInfo} />
                        {/* <PostCardList data={[]} title="精选内容" loading={false} /> */}
                    </Affix>
                </Layout.Sider>
            </Flex>
        </div>
    )
}

export default UserPage;