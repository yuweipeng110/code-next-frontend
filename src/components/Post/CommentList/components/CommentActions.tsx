import React, { useContext } from 'react';
import { Dropdown, Flex, Space } from 'antd';
import { DeleteOutlined, EllipsisOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import { LoadPostCommentReplyVO, LoadPostCommentVO } from '../type';
import { formatTime } from '@/utils/date';
import { CommentReplyEditProvider } from '../CommentContext';

const IconText = ({ icon, text, onClick, className }: { icon: React.FC; text: string, onClick?: (event: any) => void, className?: string }) => (
    <Space onClick={onClick} className={`hoverable-icon ${className}`}>
        {React.createElement(icon)}
        {text}
    </Space>
);

type Props = {
    // 加工评论对象
    loadCommentCurrent: LoadPostCommentVO;
    // 加工评论回复对象（可选）
    loadReplyCurrent?: LoadPostCommentReplyVO;
}

/**
 * 评论操作区
 */
const CommentActions: React.FC<Props> = React.memo((props) => {
    // const { commentCurrent, replyMoreDataList, setReplyMoreDataList, replyCurrent } = props;
    const { loadCommentCurrent, loadReplyCurrent } = props;
    const commentCurrent = loadCommentCurrent.comment;
    const { toggleCurrentCommentReplyVisibility } = useContext(CommentReplyEditProvider);

    /**
     * 获取评论或回复的文本
     * @param comment 评论对象
     * @returns 评论或回复的文本
     */
    const getReplyText = (comment: API.PostCommentVO) => {
        if (!loadReplyCurrent) {
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
        const isReplyVisible = () => {
            if (loadReplyCurrent) {
                // 检查回复列表中指定回复是否可见
                return loadReplyCurrent.isCurrentAddCommentShow;
                // return replyMoreDataList.find(commentItem => commentItem.id === commentId)?.replyList.find(replyItem => replyItem.id === replyId && replyItem.isCurrentAddCommentShow);
            }
            // 检查评论是否可见
            return loadCommentCurrent.isCurrentAddCommentShow;
            // return replyMoreDataList.find(commentItem => commentItem.id === commentId && commentItem.isCurrentAddCommentShow);
        };

        const isVisible = isReplyVisible();

        const iconPropsInit = {
            onClick: () => {
                const commentId = commentCurrent.id;
                const replyId = loadReplyCurrent?.id;
                toggleCurrentCommentReplyVisibility(commentId, replyId)
            },
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
        const thumbNum = loadReplyCurrent ? loadReplyCurrent.thumbNum : commentCurrent.thumbNum;
        const text = thumbNum === 0 ? "点赞" : thumbNum.toString();
        const hasThumb = loadReplyCurrent ? loadReplyCurrent.hasThumb : commentCurrent.hasThumb;

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