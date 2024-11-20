import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Card, Empty, List, message, Skeleton, Space } from 'antd';
import Link from 'next/link';
import UserPopoverSection from '@/components/User/Popover';
import MdViewer from '@/components/MdViewer';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import CommentActions from './components/CommentActions';
import CommentReplyList from './components/CommentReplyList';
import AddReplyComment from './components/AddReplyComment';
import { LoadPostCommentVO } from './type';
import { listPostCommentReplyVoByPageUsingPost } from '@/api/postCommentReplyController';
import AuthorTag from './components/AuthorTag';
import AddComment from './components/AddComment';
import "./index.css";

// TODO 滚动加载， reply-list 点击加载

type Props = {
    // 帖子评论列表
    commentDataList: API.PostCommentVO[];
    // 帖子评论列表总数
    commentTotal: number;
    // 加载更多帖子评论列表数据
    loadMoreDataCommentList: () => void;
    // 帖子对象
    postCurrent: API.PostVO;
}

type ParamsType = {
    current: number;
    pageSize: number;
    sortField: string;
    sortOrder: string;
    commentId?: string;
    queriedAnswerObjList?: {
        commentId: string;
        current: number;
    }[];
}

/**
 * 帖子评论发布、评论列表、评论回复列表、添加回复评论、组件
 */
const PostCommentList: React.FC<Props> = React.memo((props) => {
    const { commentDataList, commentTotal, loadMoreDataCommentList, postCurrent } = props;

    const divRef = useRef<HTMLDivElement>(null);

    const initParams: ParamsType = {
        current: 1,
        pageSize: 3,
        sortField: "create_time",
        sortOrder: "ascend",
    };

    // 回复列表数据源
    const [replyMoreDataList, setReplyMoreDataList] = useState<LoadPostCommentVO[]>([]);
    // 回复列表参数
    const [searchParams, setSearchParams] = useState<ParamsType>(initParams);
    // 回复列表加载中ID
    const [loadingMoreId, setLoadingMoreId] = useState<string>("");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            console.log('handleClickOutside');
            const target = event.target as HTMLElement;

            let clickedCommentId: string | undefined;

            if (target instanceof HTMLElement) { // 确保 target 是 HTMLElement
                const closestElement = target.closest('.comment-reply');

                if (closestElement instanceof HTMLElement) { // 确保 closest 返回的是 HTMLElement
                    clickedCommentId = closestElement.dataset.commentId;
                }
            }

            // 点击comment-reply外部的内容
            // 进一步判断，类似回复的按钮筛选掉
            if (!clickedCommentId && !target.classList.contains('ant-space-item')) {
                setReplyMoreDataList(
                    replyMoreDataList.map(commentItem => ({
                        ...commentItem, // 保留原有属性
                        isCurrentAddCommentShow: commentItem.contentIsHasValue,
                        replyList: commentItem.replyList.map(replyItem => ({
                            ...replyItem,
                            isCurrentAddCommentShow: replyItem.contentIsHasValue,
                        }))
                    }))
                );
            }
            // if (clickedCommentId) {
            //     console.error('点击了表单内部');
            // } else {
            //     if (!(target.classList.contains('ant-space-item'))) {
            //         setAddCommentReplyList(addCommentReplyList.filter(item => item.contentIsHasValue))
            //         console.log('点击了表单外部');
            //     } else {
            //         console.log('点击了类似回复的按钮')
            //     }
            // }
        };

        // 提前判断是否需要设置事件监听器
        const hasActiveComment = replyMoreDataList.some(commentItem => commentItem.isCurrentAddCommentShow);
        const hasActiveReply = replyMoreDataList.some(commentItem =>
            commentItem.replyList.some(replyItem => replyItem.isCurrentAddCommentShow)
        );

        // 如果有任何需要展示评论或回复的项，添加事件监听器
        if (hasActiveComment || hasActiveReply) {
            // 添加全局点击事件监听器
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // 如果没有，确保事件监听器被移除
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // 清理事件监听器
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [replyMoreDataList]);

    /**
     * 监听搜索参数变化时加载数据
     */
    useEffect(() => {
        if (searchParams.commentId) {
            loadDataReplyMore(searchParams);
            console.log('useEffect searchParams', searchParams);
        }
    }, [searchParams]);

    /**
     * 加载更多数据 current + 1
     */
    const loadMoreDataReplyMore = (commentId: string) => {
        const newParams = { ...searchParams, commentId };

        // 确保 queriedAnswerObjList 已经存在，如果不存在则初始化
        newParams.queriedAnswerObjList = newParams.queriedAnswerObjList || [];

        // 查找是否已有该 commentId 的记录
        const existingItem = newParams.queriedAnswerObjList.find(item => item.commentId === commentId);

        // 根据是否存在记录进行更新
        const current = existingItem ? (existingItem.current += 1) : 2;
        newParams.current = current;

        if (!existingItem) {
            newParams.queriedAnswerObjList.push({ commentId, current });
        }

        setSearchParams(newParams);
    }

    useEffect(() => {
        if (commentDataList.length > 0) {
            let updatedList = [...replyMoreDataList];

            commentDataList.forEach(commentItem => {
                if (commentItem.replyPage) {
                    let obj = updatedList.find(listItem => listItem.id === commentItem.id);

                    if (obj && obj.id === commentItem.id) {
                        obj.replyList = [...obj.replyList, ...commentItem.replyPage.records || []];
                    } else {
                        updatedList.push({
                            id: commentItem.id || "",
                            comment: commentItem,
                            replyList: commentItem.replyPage.records.map(item => {
                                return { ...item, isCurrentAddCommentShow: false, contentIsHasValue: false };
                            }) || [],
                            replyTotal: commentItem.replyPage.total || 0,
                            isCurrentAddCommentShow: false,
                            contentIsHasValue: false,
                        });
                    }
                }
            });

            setReplyMoreDataList(updatedList);
        }
    }, [commentDataList]);

    useEffect(() => {
        console.log('replyMoreDataList', replyMoreDataList);
    }, [replyMoreDataList]);

    /**
     * 加载数据
     * @param params 搜索参数
     * @returns 
     */
    const loadDataReplyMore = useCallback(async (params: ParamsType) => {
        setLoadingMoreId(params.commentId || "");

        // 向replyList中添加一个临时的loading 骨架需要
        const newReplyMoreDataList = replyMoreDataList.map(commentItem => {
            if (commentItem.id === params.commentId) {
                return {
                    ...commentItem,
                    replyList: [...commentItem.replyList, { loading: true, name: {}, picture: {} }]
                };
            }
            return commentItem;
        });
        setReplyMoreDataList(newReplyMoreDataList);
        try {
            const query = {
                commentId: params.commentId as unknown as number,
                current: params.current,
                pageSize: params.pageSize,
                sortField: params.sortField,
                sortOrder: params.sortOrder
            };
            const res = await listPostCommentReplyVoByPageUsingPost(query);
            const replyDataList = res.data?.records || [];
            const replyTotal = res.data?.total || 0;

            let updatedList = [...replyMoreDataList];
            let obj = updatedList.find(item => item.id === params.commentId);

            if (obj && obj.id === params.commentId) {
                obj.replyList = [...obj.replyList.filter(replyItem => !replyItem.loading), ...replyDataList];
            } else {
                updatedList.push({
                    id: params.commentId || "",
                    comment: obj.comment,
                    replyList: replyDataList,
                    replyTotal: replyTotal,
                    isCurrentAddCommentShow: false,
                    contentIsHasValue: false,
                });
            }

            setReplyMoreDataList(updatedList);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
        setLoadingMoreId("");
    }, [replyMoreDataList]);

    return (
        <Card
            tabList={[{
                key: 'comment',
                tab: `评论 ${commentTotal}`,
            }]}
            className="comment-card"
        >
            <AddComment postCurrent={postCurrent} commentTotal={commentTotal} />
            <div style={{ marginBottom: 16 }} />
            <InfiniteScrollComponent
                data={commentDataList}
                total={commentTotal}
                loadMoreData={loadMoreDataCommentList}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            >
                <List
                    className="comment-list"
                    itemLayout="vertical"
                    size="large"
                    dataSource={replyMoreDataList}
                    locale={{ emptyText: commentTotal === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                    renderItem={(item, index) => (
                        <>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Link href={`/user/${item.comment.userId}`} target="_blank">
                                            <UserPopoverSection userInfo={item.comment.user || null}>
                                                <Avatar src={item.comment.user?.userAvatar} size={40} > U </Avatar>
                                            </UserPopoverSection>
                                        </Link>
                                    }
                                    title={
                                        <Space>
                                            <Link href={`/user/${item.comment.userId}`} target="_blank">
                                                <UserPopoverSection userInfo={item.comment.user || null}>
                                                    {item.comment.user?.userName}
                                                </UserPopoverSection>
                                            </Link>
                                            <AuthorTag userId={item.comment.userId} />
                                        </Space>
                                    }
                                // description={item.description}
                                />
                                <MdViewer value={item.comment.content} isClamp />
                                <CommentActions
                                    commentCurrent={item.comment}
                                    replyMoreDataList={replyMoreDataList}
                                    setReplyMoreDataList={setReplyMoreDataList}
                                />
                            </List.Item>
                            index: {index} , comment.id: {item.comment.id}
                            {
                                item.isCurrentAddCommentShow && (
                                    <AddReplyComment
                                        commentId={item.comment.id}
                                        replyMoreDataList={replyMoreDataList}
                                        setReplyMoreDataList={setReplyMoreDataList}
                                        ref={divRef}
                                    />
                                )
                            }
                            {
                                item.replyTotal > 0 && (
                                    <CommentReplyList
                                        loadCommentCurrent={item}
                                        replyMoreDataList={replyMoreDataList}
                                        setReplyMoreDataList={setReplyMoreDataList}
                                        loadMoreDataReplyMore={loadMoreDataReplyMore}
                                        loadingMoreId={loadingMoreId}
                                    />
                                )
                            }
                        </>
                    )}
                />
            </InfiniteScrollComponent>
        </Card>
    )
});

export default PostCommentList;