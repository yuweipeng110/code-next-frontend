import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Flex, message, Row } from 'antd';
import Link from 'next/link';
import { doUserFollowUsingPost } from '@/api/userFollowController';
import { DEFAULT_AVATAR } from '@/constants';
import { formatNumber } from '@/utils/tool';
import "./index.css";

type Props = {
    postObject: API.PostVO;
    userLoading: boolean;
}

/**
 * 用户卡片 Card
 * @returns 
 */
const UserCardSection: React.FC<Props> = React.memo((props) => {
    const { postObject, userLoading } = props;
    const { user } = postObject;
    // 当前正在执行的id
    const [currentExecuteId, setCurrentExecuteId] = useState<string>("");
    // 已关注列表
    const [followedDataIdList, setFollowedDataIdList] = useState<string[]>([]);

    /**
     * 用户关注/取消
     * 
     * @param params 搜索参数
     * @returns 
     */
    const handleUserFollowed = async (userId: string) => {
        if (!userId) return;
        setCurrentExecuteId(userId);
        try {
            const res = await doUserFollowUsingPost({ fansId: userId as unknown as number });
            if (res.data === 1) { // 关注
                setFollowedDataIdList(prev => [...prev, userId]);
            } else if (res.data === -1) { //取消关注
                setFollowedDataIdList(prev => prev.filter((item) => item !== userId));
            }
        } catch (error: any) {
            message.error('更新失败，' + error.message);
        }
        if (!isFollowed(userId)) {
            setTimeout(() => {
                setCurrentExecuteId("");
            }, 1000);
        } else {
            setCurrentExecuteId("");
        }
    }

    /**
     * 数据改变时 向关注数据ID列表添加 已关注的用户id
     */
    useEffect(() => {
        if (postObject) {
            setFollowedDataIdList([postObject.user.isFollowUser ? postObject.userId : ""]);
        }
    }, [postObject]);

    /**
     * 是否关注
     */
    const isFollowed = (userId: string) => followedDataIdList.includes(userId);

    /**
     * 关注按钮
     * @returns 
     */
    const followBtnRender = () => {
        if (isFollowed(user.id)) {
            return (
                <Button className='follow-btn followed' style={{ width: currentExecuteId === user.id ? 117 : 34, padding: 0 }} onClick={() => handleUserFollowed(user.id)}>
                    {
                        currentExecuteId === user.id ? (
                            <>
                                <i className="byte-icon byte-icon--check"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M393.6 679.04l467.2-467.84a21.12 21.12 0 0 1 30.08 0l30.08 30.08a21.12 21.12 0 0 1 0 30.08l-512 512a21.12 21.12 0 0 1-30.08 0L106.88 512a21.12 21.12 0 0 1 0-30.08l30.08-30.08a21.12 21.12 0 0 1 30.08 0z" ></path></svg></i>
                                已关注
                            </>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle data-v-6d89a1e6="" cx="9" cy="4.78906" r="3.375" stroke="#8A919F"></circle><path data-v-6d89a1e6="" d="M8.92722 16.3011L3.42093 16.3001C2.92955 16.3 2.53125 15.9016 2.53125 15.4102V15.4102C2.53125 12.7814 4.6623 10.6504 7.29107 10.6504H7.39119H8.92722" stroke="#8A919F" ></path><path data-v-6d89a1e6="" d="M15.1266 11.9352C15.254 12.0547 15.2605 12.2549 15.141 12.3824L11.9769 15.7574C11.9183 15.8199 11.8369 15.856 11.7512 15.8574C11.6655 15.8588 11.5829 15.8253 11.5224 15.7648L9.62392 13.8663C9.50036 13.7427 9.50036 13.5424 9.62392 13.4188C9.74749 13.2953 9.94782 13.2953 10.0714 13.4188L11.7388 15.0862L14.6793 11.9496C14.7988 11.8221 14.9991 11.8157 15.1266 11.9352Z" fill="#8A919F" stroke="#8A919F" ></path></svg>
                        )
                    }
                </Button>
            )
        } else {
            return (
                <Button className='follow-btn' style={{ width: 117 }} onClick={() => handleUserFollowed(user.id)}>关注</Button>
            )
        }
    }

    return (
        <Card className="user-card-section" loading={userLoading}>
            <Card.Meta
                avatar={<Avatar src={user.userAvatar || DEFAULT_AVATAR} size={48} />}
                title={user.userName}
                description={user.userProfile}
                style={{ paddingBottom: 8 }}
                className="flex item-center"
            />
            <Flex justify="space-around" className="stat">
                <Link href={`/user/${user.id}`} target='_blank'>
                    <Flex vertical justify="center" align="center">
                        <div className="count">{formatNumber(user.postCount)}</div>
                        <div>文章</div>
                    </Flex>
                </Link>
                <Link href={`/user/${user.id}`} target='_blank'>
                    <Flex vertical justify="center" align="center">
                        <div className="count">{formatNumber(postObject.viewNum)}</div>
                        <div>阅读</div>
                    </Flex>
                </Link>
                <Link href={`/user/${user.id}`} target='_blank'>
                    <Flex vertical justify="center" align="center">
                        <div className="count">{formatNumber(user.fansCount)}</div>
                        <div>粉丝</div>
                    </Flex>
                </Link>
            </Flex>
            <div style={{ marginBottom: 16 }} />
            <div className='operate-btn'>
                {followBtnRender()}
                <Button block className="im-btn">私信</Button>
            </div>
        </Card>
    )
})

export default UserCardSection;