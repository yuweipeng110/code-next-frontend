import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { Avatar, Card, Empty, List, message, Skeleton, Space } from 'antd';
import Link from 'next/link';
import { LoadPostCommentVO } from './type';
import { listPostCommentReplyVoByPageUsingPost } from '@/api/postCommentReplyController';
import { listPostVoByPageUsingPost } from '@/api/postCommentController';
import UserPopoverSection from '@/components/User/Popover';
import MdViewer from '@/components/MdViewer';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import CommentActions from './components/CommentActions';
import CommentReplyList from './components/CommentReplyList';
import AddReplyComment from './components/AddReplyComment';
import AuthorTag from './components/AuthorTag';
import AddComment from './components/AddComment';
import { AddCommentReplyProvider, CommentReplyEditProvider } from './CommentContext';
import "./index.css";
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

type Props = {
    // 帖子ID
    postId: string;
    // // 帖子对象
    // postCurrent: API.PostVO;
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

// 评论初始化参数
const commentInitParams: ParamsType = {
    current: 1,
    pageSize: 8,
    sortField: "create_time",
    sortOrder: "ascend",
};

// 评论回复初始化参数
const replyInitParams: ParamsType = {
    current: 1,
    pageSize: 3,
    sortField: "create_time",
    sortOrder: "ascend",
};

/**
 * 帖子评论发布、评论列表、评论回复列表、添加回复评论、组件
 */
const PostCommentList: React.FC<Props> = React.memo((props) => {
    const { postId = "" } = props;
    // 获取登录用户信息
    const loginUser = useSelector((state: RootState) => state.loginUser);

    // 评论列表总数
    const [commentTotal, setCommentTotal] = useState<number>(0);
    // 评论列表加载中
    const [commentLoading, setCommentLoading] = useState<boolean>(true);
    // 评论列表当前页码
    const [commentCurrent, setCommentCurrent] = useState<number>(1);

    useEffect(() => {
        loadDataPostCommentList();
    }, [postId]);

    /**
     * 加载评论数据
     * @param params 搜索参数
     * @returns 
     */
    const loadDataPostCommentList = useCallback(async (params?: ParamsType) => {
        if (!postId) {
            message.error('参数错误postId：' + postId);
        }
        if (commentCurrent === 1) {
            setCommentLoading(true);
        }
        try {
            const query = {
                // ...params,
                ...commentInitParams,
                current: commentCurrent,
                postId: postId as unknown as number,
            };
            const res = await listPostVoByPageUsingPost(query);
            const dataList = res.data?.records || [];
            const total = res.data?.total || 0;

            let updatedList = [...replyMoreDataList];

            dataList.forEach(commentItem => {
                if (commentItem.replyPage) {
                    let obj = updatedList.find(listItem => listItem.id === commentItem.id);

                    if (obj && obj.id === commentItem.id) {
                        // 如果找到了对应的评论，合并新的回复数据
                        obj.replyList = [...obj.replyList, ...commentItem.replyPage.records || []];
                    } else {
                        // 如果没有找到对应的评论，创建新的评论对象并添加到 updatedList 中
                        updatedList = [
                            ...updatedList,  // 保持现有的列表内容
                            {
                                id: commentItem.id || "",
                                comment: commentItem,
                                replyList: (commentItem.replyPage.records || []).map(item => ({
                                    ...item,
                                    isCurrentAddCommentShow: false,
                                    contentIsHasValue: false,
                                })),
                                replyTotal: commentItem.replyPage.total || 0,
                                isCurrentAddCommentShow: false,
                                contentIsHasValue: false,
                            }
                        ];
                    }
                }
            });

            setReplyMoreDataList(updatedList);
            setCommentTotal(total);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        } finally {
            setCommentCurrent(commentCurrent + 1);
            setCommentLoading(false);
        }
    }, [postId, commentCurrent])

    const divRef = useRef<HTMLDivElement>(null);

    // 回复列表数据源
    const [replyMoreDataList, setReplyMoreDataList] = useState<LoadPostCommentVO[]>([]);
    // 回复列表参数
    const [replySearchParams, setReplySearchParams] = useState<ParamsType>(replyInitParams);
    // 回复列表加载中ID
    const [loadingMoreId, setLoadingMoreId] = useState<string>("");

    const handleClickOutside = useCallback((event: MouseEvent) => {
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

            // setReplyMoreDataList(
            //     replyMoreDataList.map(commentItem => ({
            //         ...commentItem, // 保留原有属性
            //         isCurrentAddCommentShow: commentItem.contentIsHasValue,
            //         replyList: commentItem.replyList.map(replyItem => ({
            //             ...replyItem,
            //             isCurrentAddCommentShow: replyItem.contentIsHasValue,
            //         }))
            //     }))
            // );
            const updateCommentItem = (commentItem) => {
                // 使用 find() 查找第一个符合条件的 replyItem
                const firstMatchingReplyItem = commentItem.replyList.find(replyItem => replyItem.contentIsHasValue);
                return {
                    ...commentItem,
                    isCurrentAddCommentShow: commentItem.contentIsHasValue,
                    replyList: commentItem.replyList.map(replyItem => ({
                        ...replyItem,
                        isCurrentAddCommentShow: replyItem.contentIsHasValue,
                    })),
                    // 如果找到了符合条件的 replyItem
                    firstMatchingReplyItem, // 你可以保存这一项，进一步减少操作
                };
            };

            setReplyMoreDataList(replyMoreDataList.map(updateCommentItem));
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
    }, [replyMoreDataList]);

    useEffect(() => {

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
    }, [handleClickOutside, replyMoreDataList]);

    /**
     * 监听搜索参数变化时加载数据
     */
    useEffect(() => {
        if (replySearchParams.commentId) {
            loadDataReplyMore(replySearchParams);
        }
    }, [replySearchParams]);

    /**
     * 加载更多数据 current + 1
     */
    const loadMoreDataReplyMore = useCallback((commentId: string) => {
        setLoadingMoreId(commentId);
        const newParams = { ...replySearchParams, commentId };

        // 确保 queriedAnswerObjList 已经存在，如果不存在则初始化
        newParams.queriedAnswerObjList = newParams.queriedAnswerObjList || [];

        // 查找是否已有该 commentId 的记录
        const existingItem = newParams.queriedAnswerObjList.find(item => item.commentId === commentId);

        // 根据是否存在记录进行更新
        const current = existingItem ? (existingItem.current += 1) : 2;
        newParams.current = current;

        if (!existingItem) {
            // 用扩展运算符替代 push，生成一个新的数组
            newParams.queriedAnswerObjList = [
                ...newParams.queriedAnswerObjList, // 保留现有的数组元素
                { commentId, current }  // 添加新的评论项
            ];
        }

        setReplySearchParams(newParams);
    }, [replySearchParams]);

    /**
     * 加载数据
     * @param params 搜索参数
     * @returns 
     */
    const loadDataReplyMore = async (params: ParamsType) => {

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
                updatedList = [
                    ...updatedList,
                    {
                        id: params.commentId || "",
                        comment: obj.comment,  // 确保 obj 存在再访问其属性
                        replyList: replyDataList,
                        replyTotal: replyTotal,
                        isCurrentAddCommentShow: false,
                        contentIsHasValue: false,
                    }
                ];
            }

            setReplyMoreDataList(updatedList);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
        setLoadingMoreId("");
    }

    /**
     * 切换评论或回复的可见状态
     * @param commentId 评论ID
     * @param replyId 回复ID（可选）
     */
    const toggleCurrentCommentReplyVisibility = (commentId: string, replyId?: string) => {
        const newReplyMoreDataList = replyMoreDataList.map(commentItem => {
            if (commentItem.id === commentId) {
                if (replyId) {
                    // 更新回复列表中指定回复的可见状态
                    commentItem.replyList = commentItem.replyList.map(replyItem => {
                        if (replyItem.id === replyId) {
                            return {
                                ...replyItem,
                                isCurrentAddCommentShow: !replyItem.isCurrentAddCommentShow,
                            };
                        }
                        return replyItem;
                    });
                } else {
                    // 更新评论的可见状态
                    return { ...commentItem, isCurrentAddCommentShow: !commentItem.isCurrentAddCommentShow };
                }
            }
            return commentItem;
        });
        setReplyMoreDataList(newReplyMoreDataList);
    }

    const handleAddReplyCommentChange = (commentId: string, replyId?: string, inputValue?: string) => {
        const contentIsHasValue = inputValue ? inputValue.length > 0 : false;
        const newReplyMoreDataList = replyMoreDataList.map(commentItem => {
            if (commentItem.id === commentId) {
                if (replyId) {
                    return {
                        ...commentItem,
                        replyList: commentItem.replyList.map(replyItem => {
                            if (replyItem.id === replyId) {
                                return { ...replyItem, contentIsHasValue };
                            }
                            return replyItem;
                        }),
                    };
                }
                return { ...commentItem, contentIsHasValue };
            }
            return commentItem;
        });
        setReplyMoreDataList(newReplyMoreDataList);
    }

    return (
        <Card
            tabList={[{
                key: 'comment',
                tab: `评论 ${commentTotal}`,
            }]}
            className="comment-card"
            loading={commentLoading}
        >
            <AddComment commentTotal={commentTotal} postId={postId} />
            <div style={{ marginBottom: 16 }} />
            <InfiniteScrollComponent
                // data={replyMoreDataList}
                dataLength={replyMoreDataList.length}
                total={commentTotal}
                // loadMoreData={loadMoreDataCommentList}
                loadMoreData={loadDataPostCommentList}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            >
                <List
                    className="comment-list"
                    itemLayout="vertical"
                    size="large"
                    loading={commentLoading}
                    dataSource={replyMoreDataList}
                    locale={{ emptyText: commentTotal === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                    renderItem={(item, index) => (
                        <div>
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
                                            {item.comment.userId === loginUser.id && <AuthorTag />}
                                        </Space>
                                    }
                                // description={item.description}
                                />
                                <MdViewer value={item.comment.content} isClamp />
                                <CommentReplyEditProvider.Provider value={{ toggleCurrentCommentReplyVisibility }}>
                                    <CommentActions loadCommentCurrent={item} />
                                </CommentReplyEditProvider.Provider>
                            </List.Item>
                            {
                                item.isCurrentAddCommentShow && (
                                    <CommentReplyEditProvider.Provider value={{ toggleCurrentCommentReplyVisibility }}>
                                        <AddCommentReplyProvider.Provider value={{ handleAddReplyCommentChange }}>
                                            <AddReplyComment loadCommentCurrent={item} ref={divRef} />
                                        </AddCommentReplyProvider.Provider>
                                    </CommentReplyEditProvider.Provider>
                                )
                            }
                            {
                                item.replyTotal > 0 && (
                                    <CommentReplyEditProvider.Provider value={{ toggleCurrentCommentReplyVisibility }}>
                                        <AddCommentReplyProvider.Provider value={{ handleAddReplyCommentChange }}>
                                            <CommentReplyList loadCommentCurrent={item} loadMoreDataReplyMore={loadMoreDataReplyMore} loadingMoreId={loadingMoreId} />
                                        </AddCommentReplyProvider.Provider>
                                    </CommentReplyEditProvider.Provider>
                                )
                            }
                        </div>
                    )}
                />
            </InfiniteScrollComponent>
        </Card>
    )
});


export default PostCommentList;