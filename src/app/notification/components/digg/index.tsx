import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { Avatar, Card, Empty, message, Skeleton, Space } from 'antd';
import { ProList } from '@ant-design/pro-components';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import { listPostVoByPageUsingPost3 } from '@/api/postThumbController';
import { listPostVoByPageUsingPost2 } from '@/api/postFavourController';
import Link from 'next/link';
import moment from 'moment';
import './index.css';

type SearchParams = {
    current: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: string;
    createPostUserId?: number;
}

const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 5,
};

/**
 * 通知-赞和收藏
 * TODO 因数据是两个接口合并成一个list 所以需要增加判断逻辑 另一个是否需要分页
 */
const NotificationDigg: React.FC = memo(() => {
    console.log('NotificationDigg');
    const loginUser = useSelector((state: RootState) => state.loginUser);

    // 点赞的帖子列表
    const [postThumbList, setPostThumbList] = useState<API.PostThumbVO[]>([]);
    // 点赞的帖子列表总数
    const [postThumbTotal, setPostThumbTotal] = useState<number>(0);
    // 收藏的帖子列表
    const [postFavourList, setPostFavourList] = useState<API.PostFavourVO[]>([]);
    // 收藏的帖子列表总数
    const [postFavourTotal, setPostFavourTotal] = useState<number>(0);
    // 点赞喝收藏列表
    const [dataList, setDataList] = useState<API.PostThumbVO[] & API.PostFavourVO[]>([]);
    // 点赞喝收藏列表总数
    const [total, setTotal] = useState<number>(10);
    // 搜索参数
    const [searchParams, setSearchParams] = useState<SearchParams>(DEFAULT_PAGE_PARAMS);

    // 使用 useCallback 来避免不必要的重新渲染
    const loadDataPostThumbList = useCallback(async (params: SearchParams) => {
        try {
            const res = await listPostVoByPageUsingPost3({
                ...params,
                createPostUserId: loginUser.id as unknown as number,
                sortField: "create_time",
                sortOrder: "desc"
            });
            return {
                data: res.data?.records || [],
                total: res.data?.total || 0
            };
        } catch (error: any) {
            message.error('加载点赞帖子失败: ' + error.message);
            return { data: [], total: 0 };
        }
    }, [loginUser.id]);

    const loadDataPostFavourList = useCallback(async (params: SearchParams) => {
        try {
            const res = await listPostVoByPageUsingPost2({
                ...params,
                createPostUserId: loginUser.id as unknown as number,
                sortField: "create_time",
                sortOrder: "desc"
            });
            return {
                data: res.data?.records || [],
                total: res.data?.total || 0
            };
        } catch (error: any) {
            message.error('加载收藏帖子失败: ' + error.message);
            return { data: [], total: 0 };
        }
    }, [loginUser.id]);

    // 合并点赞和收藏请求
    const loadData = async (params: SearchParams) => {
        try {
            const [thumbRes, favourRes] = await Promise.all([
                loadDataPostThumbList(params),
                loadDataPostFavourList(params),
            ]);

            const mergedData = [...thumbRes.data, ...favourRes.data];
            setDataList((prevData) => [...prevData, ...mergedData]);
            setTotal(thumbRes.total + favourRes.total);
        } catch (error: any) {
            message.error('加载失败: ' + error.message);
        }
    };

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

    return (
        <div className='notification-digg'>
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
                    <ProList<API.PostFavourVO & API.PostThumbVO>
                        locale={{ emptyText: total === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                        itemLayout="vertical"
                        tableStyle={{ padding: 24 }}
                        rowKey="id"
                        dataSource={dataList}
                        showActions="hover"
                        metas={{
                            title: {
                                dataIndex: 'title',
                                render: (_, entity) => (
                                    <Link href={`/user/${entity.userId}`} target="_blank" className='name'>{entity.user.userName}</Link>
                                )
                            },
                            avatar: {
                                dataIndex: 'image',
                                editable: false,
                                render: (_, entity) => (
                                    <Link href={`/user/${entity.userId}`} target="_blank">
                                        <Avatar size={36} src={entity.user.userAvatar} />
                                    </Link>
                                )
                            },
                            content: {
                                render: (_, entity) => <div className='time'>{moment(entity.createTime).fromNow()}</div>
                            },
                            subTitle: {
                                render: (_, entity) => (
                                    <Space className='sub-title'>
                                        <div>{entity.type === "thumb" ? "点赞" : "收藏"}了你的文章</div>
                                        <Link href={`/post/${entity.postId}`} target="_blank">《{entity.post.title}》</Link>
                                    </Space>
                                )
                            },
                            extra: {
                                render: () => (
                                    <img
                                        width={110}
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                ),
                            },
                        }}
                    />
                </InfiniteScrollComponent>
            </Card>
        </div>
    )
})

export default NotificationDigg;