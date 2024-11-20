"use client";
import { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { BellFilled, BellOutlined, CommentOutlined, LikeOutlined, MessageOutlined, SoundOutlined, UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';
import './index.css';

/**
 * 通知组件
 * @returns 
 */
const Notification = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

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
            label: <Link href={'/notification/system'}>系统通知</Link>,
        },
    ];

    return (
        <div className="notification" aria-hidden >
            <Link href={"/notification/comment"} className="flex" style={{ padding: "14px 6px" }}>
                <Dropdown
                    overlayClassName="basic-layout-dropdown"
                    menu={{ items }}
                    placement="bottomRight"
                    onOpenChange={(open) => {
                        setIsOpen(open);
                    }}
                >
                    {!isOpen ? <BellOutlined className="bell-icon" /> : <BellFilled className="bell-icon" />}
                </Dropdown>
            </Link>
        </div>
    )
}

export default Notification;