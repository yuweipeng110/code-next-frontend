"use client";
import { Badge, Dropdown, MenuProps } from 'antd';
import { BellFilled, CommentOutlined, LikeOutlined, MessageOutlined, SoundOutlined, UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';
import './index.css';

/**
 * 通知组件
 * @returns 
 */
const Notification = () => {

    const items: MenuProps['items'] = [
        {
            key: 'comment',
            icon: <CommentOutlined />,
            label: <Link href={'/notification/comment'}>评论</Link>,
        },
        {
            key: 'digg',
            icon: <LikeOutlined />,
            label: <Link href={'/notification/digg'}>赞和收藏</Link>,
        },
        {
            key: 'follow',
            icon: <UserAddOutlined />,
            label: <Link href={'/notification/follow'}>新增粉丝</Link>,
        },
        {
            key: 'im',
            icon: <MessageOutlined />,
            label: <Link href={'/notification/im'}>私信</Link>,
        },
        {
            key: 'system',
            icon: <SoundOutlined />,
            label: <Link href={'/notification/system'}><Badge count={5} offset={[30, 8]}>系统通知</Badge></Link>,
        },
    ];

    return (
        <div className="notification" aria-hidden>
            <Link href={"/notification/comment"} className="flex" style={{ padding: "14px 6px" }}>
                <Dropdown
                    overlayClassName="notification-dropdown"
                    menu={{ items }}
                    placement="bottomRight"
                >
                    <Badge size="small" count={5} offset={[2, 0]}>
                        <BellFilled className="bell-icon" />
                    </Badge>
                </Dropdown>
            </Link>
        </div>
    )
}

export default Notification;