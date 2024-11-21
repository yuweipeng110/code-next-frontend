import React from 'react';
import { Avatar, Card, Popover, Space } from 'antd';
import Link from 'next/link';
import "./index.css";
import { DEFAULT_USER } from '@/constants/user';

type Props = {
    userInfo: API.UserVO | null;
} & Readonly<{
    // 内容
    children: React.ReactNode;
}>;

/**
 * 用户气泡卡片 Popover 组件
 * @param props 
 * @returns 
 */
const UserPopoverSection: React.FC<Props> = (props) => {
    const { userInfo = DEFAULT_USER, children } = props;;
    return (
        <Popover overlayClassName="user-info-card-popover" content={(
            <Card>
                {/* <img src="http://www.mianshiya.com/assets/svg/user-info-card/userCard.png" className="card-background-image" /> */}
                <div className="card-content">
                    <div className="avatar-container">
                        <div className="user-info-avatar-container">
                            <div className="flex-center" style={{ position: "relative" }}>
                                <div className="avatar-background"></div>
                                <Link href="/user/1" target="_blank" >
                                    <Avatar src={userInfo.userAvatar} size={60} />
                                </Link>
                                <img alt="VIP标识" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" className="vip-icon mobile" src="/assets/vip.svg" style={{ color: "transparent" }} />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: 35 }} />
                    <div className="user-info-header">
                        <Space style={{ flexWrap: "wrap", gap: "16px 8px" }}>
                            <h5 className="ant-typography user-name css-m4timi">用户ID：{userInfo.id}</h5>
                            <img alt="等级图标" loading="lazy" width="38" height="16" decoding="async" data-nimg="1" src="http://www.mianshiya.com/_next/image?url=%2Fassets%2Flevel%2Flevel1.png&amp;w=96&amp;q=75" />
                        </Space>
                    </div>
                    <Space>
                        <div className="description-text">{userInfo.userProfile}</div>
                    </Space>
                    <div style={{ marginBottom: 25 }} />
                    <Space style={{ gap: "40px 20px" }}>
                        <Link href="/hot/user">
                            <Space>
                                <div className="rank-label">排名</div>
                                <div className="rank-value">未上榜</div>
                            </Space>
                        </Link>
                    </Space>
                </div>
            </Card>
        )}>
            {children}
        </Popover>
    )
}

export default UserPopoverSection;