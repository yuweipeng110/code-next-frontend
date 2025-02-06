import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import Link from 'next/link';
import { Avatar, Button, Card, Empty, message, Skeleton } from 'antd';
import { ProList } from '@ant-design/pro-components';
import { doUserFollowUsingPost, listFollowUserByPageUsingPost } from '@/api/userFollowController';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import moment from 'moment';
import './index.css';

type SearchParams = {
    current: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
    userQueryDTO?: Object;
}

const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 10,
};

/**
 * 通知-新增粉丝
 */
const NotificationFollow: React.FC = memo(() => {
    console.log('NotificationFollow');
    const loginUser = useSelector((state: RootState) => state.loginUser);

    // 粉丝列表
    const [dataList, setDataList] = useState<API.UserVO[]>([]);
    // 粉丝列表总数
    const [total, setTotal] = useState<number>(10);
    // 搜索参数
    const [searchParams, setSearchParams] = useState<SearchParams>(DEFAULT_PAGE_PARAMS);
    // 当前正在执行的id
    const [currentExecuteId, setCurrentExecuteId] = useState<string>("");
    // 已关注列表
    const [followedDataIdList, setFollowedDataIdList] = useState<string[]>([]);

    /**
     * 加载数据
     * @param params 搜索参数
     * @returns 
     */
    const loadData = async (params: SearchParams) => {
        try {
            const res = await listFollowUserByPageUsingPost({
                ...params,
                userId: loginUser.id as unknown as number,
                userQueryDTO: {},
                sortField: "create_time",
                sortOrder: "desc"
            });
            const dataList = res.data?.records || [];
            const total = res.data?.total || 0;
            setDataList((prevData) => [...prevData, ...dataList]);
            setTotal(total);
        } catch (error: any) {
            message.error('加载失败: ' + error.message);
        }
    }

    // 监听搜索参数变化时加载数据
    useEffect(() => {
        if (loginUser.id) {
            loadData(searchParams);
        }
    }, [searchParams, loginUser.id]);

    // 加载更多数据
    const loadMoreData = () => {
        setSearchParams((prev) => ({
            ...prev,
            current: prev.current + 1
        }));
    };

    /**
     * 数据改变时 向关注数据ID列表添加 已关注的标签id
     */
    useEffect(() => {
        if (dataList) {
            setFollowedDataIdList(dataList.filter(item => item.isFollowUser).map(item => item.id || ""));
        }
    }, [dataList]);

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
        setCurrentExecuteId("");
    }

    /**
     * 是否关注
     */
    const isFollowed = (userId: string) => followedDataIdList.includes(userId);

    return (
        <div className='notification-follow'>
            <Card styles={{ body: { padding: 0 } }}>
                <InfiniteScrollComponent
                    dataLength={dataList.length}
                    total={total}
                    loadMoreData={loadMoreData}
                    loader={
                        [...Array(4)].map((_, index) => (
                            <Skeleton
                                key={index}
                                active
                                avatar
                                title
                                paragraph={{ rows: 2 }}
                                style={{ padding: 20, borderBlockEnd: '1px solid rgba(5, 5, 5, 0.06)' }}
                            />
                        ))
                    }
                >
                    <ProList<API.UserVO>
                        locale={{ emptyText: total === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                        itemLayout="vertical"
                        tableStyle={{ padding: 24 }}
                        rowKey="id"
                        dataSource={dataList}
                        showActions="hover"
                        metas={{
                            avatar: {
                                dataIndex: 'image',
                                editable: false,
                                render: (_, entity) => (
                                    <Link href={`/user/${entity.id}`} target="_blank">
                                        <Avatar size={36} src={entity.userAvatar} />
                                    </Link>
                                )
                            },
                            title: {
                                dataIndex: 'title',
                                render: (_, entity) => (
                                    <Link href={`/user/${entity.id}`} target="_blank" className='name'>{entity.userName}</Link>
                                )
                            },
                            subTitle: {
                                render: () => <div className='sub-title'>关注了你</div>
                            },
                            description: {
                                render: () => "TODO 职位"
                            },
                            content: {
                                render: (_, entity) => <div className='time'>{moment(entity.createTime).fromNow()}</div>
                            },
                            extra: {
                                render: (_, entity) => {
                                    return currentExecuteId === entity.id ? (
                                        <Button className={`follow-btn ${isFollowed(entity.id) ? 'active' : ''}`} loading />
                                    ) : (
                                        <Button
                                            className={`follow-btn ${isFollowed(entity.id) ? 'active' : ''}`}
                                            onClick={() => handleUserFollowed(entity.id)}
                                        >
                                            {isFollowed(entity.id) ? '已关注' : '关注'}
                                        </Button>
                                    )
                                }
                            },
                        }}
                    />
                </InfiniteScrollComponent>
            </Card>
        </div>
    )
})

export default NotificationFollow;