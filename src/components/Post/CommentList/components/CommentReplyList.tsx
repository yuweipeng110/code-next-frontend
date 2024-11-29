"use client";
import React, { useContext } from 'react';
import UserPopoverSection from '@/components/User/Popover';
import { Avatar, Button, List, Skeleton, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CommentActions from './CommentActions';
import AddReplyComment from './AddReplyComment';
import AuthorTag from './AuthorTag';
import { LoadPostCommentReplyVO, LoadPostCommentVO } from '../type';
import { AddCommentReplyProvider, CommentReplyEditProvider } from '../CommentContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

type Props = {
    loadCommentCurrent: LoadPostCommentVO;
    loadMoreDataReplyMore: (commentId: string) => void;
    loadingMoreId: string;
}

/**
 * 帖子评论回复列表
 */
const CommentReplyList: React.FC<Props> = React.memo((props) => {
    const { loadCommentCurrent, loadMoreDataReplyMore, loadingMoreId } = props;
    // 获取登录用户信息
    const loginUser = useSelector((state: RootState) => state.loginUser);

    // 使用memo了同时父组件使用了createContext 要接着向子组件传递 需要声明useContext，虽然没使用 但是需要声明，否则数据将不具有相应渲染（数据驱动渲染），
    // 也就是数据改变了，但是子组件没有重新渲染
    const { toggleCurrentCommentReplyVisibility } = useContext(CommentReplyEditProvider);
    const { handleAddReplyCommentChange } = useContext(AddCommentReplyProvider);

    /**
     * 加载更多视图
     */
    const loadMoreView = () => {
        // 剩余数量
        const replyRemainNum = Number(loadCommentCurrent?.replyTotal || 0) - Number(loadCommentCurrent?.replyList?.length || 0);

        if ((replyRemainNum > 0 && loadCommentCurrent.comment.id !== loadingMoreId)) {
            return (
                <Button type="text" size="small" className="get-all-btn"
                    onClick={() => {
                        loadMoreDataReplyMore(loadCommentCurrent.comment.id)
                    }}>
                    <div className="flex-box"><span>查看全部{replyRemainNum}条回复</span><DownOutlined /></div>
                </Button>
            )
        }
        return null;
    }

    /**
     * 回复视图
     */
    const renderReplyView = (childItem: LoadPostCommentReplyVO) => {
        if (childItem.replyId) {
            return (
                <>
                    <span className="rep">回复</span>
                    <Link href={`/user/${childItem.replyUserId}`} target="_blank" >
                        <span>@{childItem.replyUser?.userName}</span>
                    </Link>
                    {childItem.replyUserId === loginUser.id && <AuthorTag />}
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
                // loading={loadCommentCurrent.comment.id === loadingMoreId}
                locale={{ emptyText: <></> }}
                loadMore={loadMoreView()}
                dataSource={loadCommentCurrent?.replyList}
                renderItem={(childItem, childIndex) => (
                    <div>
                        <List.Item key={childIndex}>
                            <Skeleton avatar title={false} loading={childItem.loading} active>
                                <div className="top-content">
                                    <div className="avatar">
                                        <Link href={`/user/${childItem.userId}`} target="_blank" style={{ display: 'inline-block' }}>
                                            <UserPopoverSection userInfo={childItem.user || null}>
                                                <Avatar src={childItem.user?.userAvatar} size={28} />
                                            </UserPopoverSection>
                                        </Link>
                                    </div>
                                    <div className="other">
                                        <Space size="small">
                                            <Link href={`/user/${childItem.userId}`} target="_blank" >
                                                <span className="user-name" style={{ fontSize: 16 }}>{childItem.user?.userName}</span>
                                            </Link>
                                            {childItem.userId === loginUser.id && <AuthorTag />}
                                            {renderReplyView(childItem)}
                                        </Space>
                                        <span className="reply-content" dangerouslySetInnerHTML={{ __html: ": " + childItem.content }} />
                                        {/* <MdViewer value={childItem.content} /> */}
                                    </div>
                                </div>
                                <CommentActions loadCommentCurrent={loadCommentCurrent} loadReplyCurrent={childItem} />
                            </Skeleton>
                        </List.Item>
                        {/* 因添加骨架loading 点击加载更多时 临时额外加了一个loading的对象，导致无论函数中判断什么都没效果， 所以使用时需加个判断，当前行(对象)中是否包含loading属性来控制显示 */}
                        {/* {!childItem.loading && replyCommentView(childItem.id)} */}
                        {
                            (!childItem.loading && childItem.isCurrentAddCommentShow) && (
                                <AddReplyComment loadCommentCurrent={loadCommentCurrent} loadReplyCurrent={childItem} />
                            )
                        }
                    </div>
                )}
            />
        </div>
    )
})

export default CommentReplyList;