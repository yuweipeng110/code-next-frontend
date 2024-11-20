import React from 'react';
import { Dropdown, Flex, Space } from 'antd';
import { DeleteOutlined, EllipsisOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import { LoadPostCommentVO } from '../type';
import { formatTime } from '@/utils/date';

const IconText = ({ icon, text, onClick, className }: { icon: React.FC; text: string, onClick?: (event: any) => void, className?: string }) => (
    <Space onClick={onClick} className={`hoverable-icon ${className}`}>
        {React.createElement(icon)}
        {text}
    </Space>
);

type Props = {
    // 评论对象
    commentCurrent: API.PostCommentVO;
    replyMoreDataList: LoadPostCommentVO[];
    setReplyMoreDataList: (list: LoadPostCommentVO[]) => void;
    // 评论回复对象（可选）
    replyCurrent?: API.PostCommentReplyVO;
}

/**
 * 评论操作区
 */
const CommentActions: React.FC<Props> = React.memo((props) => {
    const { commentCurrent, replyMoreDataList, setReplyMoreDataList, replyCurrent } = props;

    /**
     * 切换评论或回复的可见状态
     * @param commentId 评论ID
     * @param replyId 回复ID（可选）
     */
    const toggleReplyVisibility = (commentId: string, replyId?: string) => {
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
    };

    /**
     * 获取评论或回复的文本
     * @param comment 评论对象
     * @returns 评论或回复的文本
     */
    const getReplyText = (comment: API.PostCommentVO) => {
        if ("replyPage" in comment) {
            return comment.replyPage.total > 0 ? comment.replyPage.total.toString() : "评论";
        }
        return "回复";
    };

    /**
     * 评论回复功能视图
     */
    const commentReplyActionView = () => {
        /**
         * 检查评论或回复是否可见
         * @param commentId 评论ID
         * @param replyId 回复ID（可选）
         * @returns 是否可见
         */
        const isReplyVisible = (commentId: string, replyId?: string) => {
            if (replyId) {
                // 检查回复列表中指定回复是否可见
                return replyMoreDataList.find(commentItem => commentItem.id === commentId)?.replyList.find(replyItem => replyItem.id === replyId && replyItem.isCurrentAddCommentShow);
            }
            // 检查评论是否可见
            return replyMoreDataList.find(commentItem => commentItem.id === commentId && commentItem.isCurrentAddCommentShow);
        };

        const commentId = commentCurrent.id;
        const replyId = replyCurrent?.id;
        const isVisible = isReplyVisible(commentId, replyId);

        const iconPropsInit = {
            onClick: () => toggleReplyVisibility(commentId, replyId),
        }

        const iconProps = isVisible
            ? {
                icon: MessageFilled,
                text: "取消回复",
                className: "active",
                ...iconPropsInit,
            }
            : {
                icon: MessageOutlined,
                text: getReplyText(commentCurrent),
                ...iconPropsInit,
            };

        return <IconText key="list-vertical-message" {...iconProps} />;
    };

    /**
     * 评论回复点赞功能view
     */
    const commentReplyThumbView = () => {
        const thumbNum = replyCurrent ? replyCurrent.thumbNum : commentCurrent.thumbNum;
        const text = thumbNum === 0 ? "点赞" : thumbNum.toString();
        const hasThumb = replyCurrent ? replyCurrent.hasThumb : commentCurrent.hasThumb;

        const iconProps = {
            text,
            className: hasThumb ? "active" : undefined,
            icon: hasThumb ? LikeFilled : LikeOutlined,
        };

        return <IconText key="list-vertical-like" {...iconProps} />;
    }

    return (
        <Flex justify='space-between' className="comment-actions">
            <Flex>
                <div className="comment-action-item">
                    {formatTime(commentCurrent.createTime)}
                    <em className="ant-list-item-action-split" />
                </div>
                <div className="comment-action-item">
                    {commentReplyThumbView()}
                    <em className="ant-list-item-action-split" />
                </div>
                <div className="comment-action-item" >
                    {commentReplyActionView()}
                </div>
            </Flex>
            <Dropdown
                placement="bottomRight"
                menu={{
                    items: [
                        {
                            key: 'commentDelete',
                            icon: <DeleteOutlined />,
                            label: '删除',
                            danger: true,
                        },
                        {
                            key: 'commentReport',
                            icon: <WarningOutlined />,
                            label: "举报",
                        },
                    ]
                }}
            >
                <EllipsisOutlined style={{ cursor: "pointer" }} />
            </Dropdown>
        </Flex>
    )
})

export default CommentActions;