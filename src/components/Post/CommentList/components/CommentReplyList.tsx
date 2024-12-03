"use client";
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, message, Skeleton, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { listPostCommentReplyVoByPageUsingPost } from '@/api/postCommentReplyController';
import { DEFAULT_AVATAR } from '@/constants';
import UserInfoCardPopover from '@/components/User/Popover';
import AuthorTag from './AuthorTag';
import CommentActions from './CommentActions';

type Props = {
    // 帖子对象
    post: API.PostVO;
    // 评论对象
    comment: API.PostCommentVO;
}

type ReplySearchParams = {
    current: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: string;
    commentId?: string;
}

type LoadingPostCommentReplyVO = {
    loading?: boolean;
} & API.PostCommentReplyVO;

const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 3,
    sortField: "create_time",
    sortOrder: "ascend",
};

// 默认展示的回复数，大于这个数量则显示回复更多
const DEFAULT_SHOW_REPLY_NUM = 3;

/**
 * 帖子评论回复列表
 */
const CommentReplyList: React.FC<Props> = React.memo((props) => {
    const { post, comment } = props;

    const initCommentReplyList = comment.replyPage.records ? comment.replyPage.records.slice(0, 3) : [];

    // 回复列表加载中临时列表
    const [loadingReplyList, setLoadingReplyList] = useState([]);
    // 回复列表数据源
    const [replyList, setReplyList] = useState<LoadingPostCommentReplyVO[]>(initCommentReplyList);
    // 回复列表是否加载中
    const [replyListLoading, setReplyListLoading] = useState<boolean>(false);
    // 回复搜索参数
    const [replySearchParams, setReplySearchParams] = useState<ReplySearchParams>(DEFAULT_PAGE_PARAMS);
    // 是否显示更多回复
    const [showMoreReply, setShowMoreReply] = useState<boolean>(false);

    useEffect(() => {
        if (showMoreReply) {
            loadDataReplyList();
            setShowMoreReply(false);
        }
    }, [replySearchParams, showMoreReply]);

    /**
     * 加载更多数据 current + 1
     */
    const loadMoreData = () => {
        setShowMoreReply(true);
        setReplySearchParams(prev => {
            return {
                ...prev,
                current: prev.current + 1
            }
        });
    }

    /**
     * 加载数据
     */
    const loadDataReplyList = async () => {
        setReplyListLoading(true);
        const loadingItems = new Array(DEFAULT_SHOW_REPLY_NUM).fill({ loading: true, name: {}, picture: {} });
        setReplyList(
            replyList.length === DEFAULT_SHOW_REPLY_NUM
                ? [...replyList, ...loadingReplyList, ...loadingItems]
                : [...loadingReplyList, ...loadingItems]
        );
        try {
            const query = {
                ...replySearchParams,
                commentId: comment.id as unknown as number,
            };
            const res = await listPostCommentReplyVoByPageUsingPost(query);
            const newData = replyList.length === DEFAULT_SHOW_REPLY_NUM
                ? [...initCommentReplyList, ...loadingReplyList, ...res.data.records]
                : [...loadingReplyList, ...res.data.records];
            setLoadingReplyList(newData);
            setReplyList(newData);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
        setReplyListLoading(false);
    }

    /**
     * 加载更多视图
     */
    const loadMoreView = () => {
        // 剩余数量
        const replyRemainNum = Number(comment?.replyPage.total || 0) - Number(replyList.length || 0);

        if ((replyRemainNum > 0)) {
            return (
                <Button type="text" size="small" className="get-all-btn"
                    onClick={loadMoreData}>
                    <div className="flex-box"><span>查看全部{replyRemainNum}条回复</span><DownOutlined /></div>
                </Button>
            )
        }
        return null;
    }

    /**
     * 回复视图
     */
    const renderReplyView = (childItem: API.PostCommentReplyVO) => {
        if (childItem.replyId) {
            return (
                <>
                    <span className="rep">回复</span>
                    <UserInfoCardPopover userInfo={childItem.replyUser}>
                        <span>@{childItem.replyUser?.userName}</span>
                    </UserInfoCardPopover>
                    {childItem.replyUserId === post.userId && <AuthorTag />}
                </>
            )
        }
        return null;
    }

    return (
        <div className="reply-list">
            <List
                className="comment-list"
                itemLayout="vertical"
                size="large"
                locale={{ emptyText: <></> }}
                loadMore={loadMoreView()}
                loading={replyListLoading}
                dataSource={replyList}
                renderItem={(childItem, childIndex) => (
                    <div>
                        <List.Item key={childIndex}>
                            <Skeleton avatar title={false} loading={childItem.loading} active>
                                <div className="top-content">
                                    <div className="avatar">
                                        <UserInfoCardPopover userInfo={childItem.user}>
                                            <Avatar src={childItem.user?.userAvatar || DEFAULT_AVATAR} size={28} />
                                        </UserInfoCardPopover>
                                    </div>
                                    <div className="other">
                                        <Space size="small">
                                            <UserInfoCardPopover userInfo={childItem.user}>
                                                <span className="user-name" style={{ fontSize: 16 }}>{childItem.user?.userName}</span>
                                            </UserInfoCardPopover>
                                            {childItem.userId === post.userId && <AuthorTag />}
                                            {renderReplyView(childItem)}
                                        </Space>
                                        <span className="reply-content" dangerouslySetInnerHTML={{ __html: ": " + childItem.content }} />
                                        {/* <MdViewer value={childItem.content} /> */}
                                    </div>
                                </div>
                                <CommentActions comment={comment} reply={childItem} loadDataReplyList={loadDataReplyList} />
                            </Skeleton>
                        </List.Item>
                    </div>
                )}
            />
        </div>
    )
})

export default CommentReplyList;