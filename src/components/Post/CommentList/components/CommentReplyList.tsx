import React, { useEffect } from 'react';
import UserPopoverSection from '@/components/User/Popover';
import { Avatar, Button, List, Skeleton, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CommentActions from './CommentActions';
import AddReplyComment from './AddReplyComment';
import { LoadPostCommentVO } from '../type';
import AuthorTag from './AuthorTag';

type Props = {
    // 当前行
    loadCommentCurrent: LoadPostCommentVO;
    replyMoreDataList: LoadPostCommentVO[];
    setReplyMoreDataList: (list: LoadPostCommentVO[]) => void;
    loadMoreDataReplyMore: (commentId: string) => void;
    loadingMoreId: string;
}

/**
 * 帖子评论回复列表
 */
const CommentReplyList: React.FC<Props> = (props) => {
    const { loadCommentCurrent, replyMoreDataList, setReplyMoreDataList, loadMoreDataReplyMore, loadingMoreId } = props;

    useEffect(() => {
        console.log('useEffect CommentReplyList');
    }, [])

    /**
     * 剩余数量
     */
    const replyRemainNum = Number(loadCommentCurrent?.replyTotal || 0) - Number(loadCommentCurrent?.replyList?.length || 0);

    /**
     * 加载更多视图
     */
    const loadMoreView = () => {
        if ((replyRemainNum > 0 && loadCommentCurrent.comment.id !== loadingMoreId)) {
            return (<Button type="text" size="small" className="get-all-btn" onClick={() => {
                loadMoreDataReplyMore(loadCommentCurrent.comment.id)
            }}>
                <div className="flex-box"><span>查看全部{replyRemainNum}条回复</span><DownOutlined /></div>
            </Button>
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
                loading={loadCommentCurrent.comment.id === loadingMoreId}
                locale={{ emptyText: <></> }}
                loadMore={loadMoreView()}
                dataSource={loadCommentCurrent?.replyList}
                renderItem={(childItem, childIndex) => (
                    <>
                        <List.Item key={childIndex}>
                            <Skeleton avatar title={false} loading={childItem.loading} active>
                                {childItem.id}
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
                                            <AuthorTag userId={childItem.userId} />
                                            {
                                                childItem.replyId && (
                                                    <>
                                                        <span className="rep">回复</span>
                                                        <Link href={`/user/${childItem.replyUserId}`} target="_blank" >
                                                            <span>@{childItem.replyUser?.userName}</span>
                                                        </Link>
                                                        <AuthorTag userId={childItem.replyUserId} />
                                                    </>
                                                )
                                            }
                                        </Space>
                                        <span className="reply-content" dangerouslySetInnerHTML={{ __html: ": " + childItem.content }} />
                                        {/* <MdViewer value={childItem.content} /> */}
                                    </div>
                                </div>
                                <CommentActions
                                    commentCurrent={loadCommentCurrent.comment}
                                    replyMoreDataList={replyMoreDataList}
                                    setReplyMoreDataList={setReplyMoreDataList}
                                    replyCurrent={childItem}
                                />
                            </Skeleton>
                        </List.Item>
                        {/* 因添加骨架loading 点击加载更多时 临时额外加了一个loading的对象，导致无论函数中判断什么都没效果， 所以使用时需加个判断，当前行(对象)中是否包含loading属性来控制显示 */}
                        {/* {!childItem.loading && replyCommentView(childItem.id)} */}
                        {
                            (!childItem.loading && childItem.isCurrentAddCommentShow) && (
                                <>
                                    AddReplyComment组件
                                    <AddReplyComment
                                        commentId={loadCommentCurrent.comment.id}
                                        replyMoreDataList={replyMoreDataList}
                                        setReplyMoreDataList={setReplyMoreDataList}
                                        replyId={childItem.id}
                                    />
                                </>
                            )
                        }
                    </>
                )}
            />
        </div>
    )
}

export default CommentReplyList;