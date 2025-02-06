import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import Link from 'next/link';
import { Avatar, Card, Empty, message, Skeleton } from 'antd';
import { ProList } from '@ant-design/pro-components';
import { listPostVoByPageUsingPost } from '@/api/postCommentController';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import moment from 'moment';
import './index.css';

type SearchParams = {
    current: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: string;
    createPostUserId?: number;
    notUserId?: number;
}

const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 10,
};

/**
 * 通知-评论
 */
const NotificationComment: React.FC = memo(() => {
    console.log('NotificationComment');
    const loginUser = useSelector((state: RootState) => state.loginUser);

    // 粉丝列表
    const [dataList, setDataList] = useState<API.PostCommentVO[]>([]);
    // 粉丝列表总数
    const [total, setTotal] = useState<number>(10);
    // 搜索参数
    const [searchParams, setSearchParams] = useState<SearchParams>(DEFAULT_PAGE_PARAMS);

    /**
     * 加载数据
     * @param params 搜索参数
     * @returns 
     */
    const loadData = async (params: SearchParams) => {
        try {
            const res = await listPostVoByPageUsingPost({
                ...params,
                createPostUserId: loginUser.id as unknown as number,
                notUserId: loginUser.id as unknown as number,
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

    return (
        <div className='notification-comment'>
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
                    <ProList<API.PostCommentVO>
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
                                        <Avatar size={36} src={entity.user.userAvatar} />
                                    </Link>
                                )
                            },
                            title: {
                                dataIndex: 'title',
                                render: (_, entity) => (
                                    <Link href={`/user/${entity.userId}`} target="_blank" className='name'>{entity.user.userName}</Link>
                                )
                            },
                            subTitle: {
                                render: () => <div className='sub-title'>评论了你的「文章」</div>
                            },
                            description: {
                                render: (_, entity) => (
                                    <>
                                        <div className='comment'>
                                            {entity.content}
                                        </div>
                                        <div className='reference'>
                                            <Link href={`/post/${entity.postId}`} target="_blank" className='post-title'>{entity.post.title}</Link>
                                        </div>
                                    </>
                                )
                            },
                            content: {
                                render: (_, entity) => <div className='time'>{moment(entity.createTime).fromNow()}</div>
                            },
                        }}
                    />
                </InfiniteScrollComponent>
            </Card>
        </div>
    )
})

export default NotificationComment;