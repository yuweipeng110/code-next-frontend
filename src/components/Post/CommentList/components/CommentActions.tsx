import React, { useCallback, useState } from 'react';
import { Dropdown, Flex, message, Modal, Space } from 'antd';
import { DeleteOutlined, EllipsisOutlined, ExclamationCircleOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import { formatTime } from '@/utils/date';
import AddReplyComment from './AddReplyComment';

const IconText = ({ icon, text, onClick, className }: { icon: React.FC; text: string, onClick?: (event: any) => void, className?: string }) => (
    <Space onClick={onClick} className={`hoverable-icon ${className}`}>
        {React.createElement(icon)}
        {text}
    </Space>
);

type Props = {
    // 评论对象
    comment: API.PostCommentVO;
    // 回复对象（可选）
    reply?: API.PostCommentReplyVO;
    // 加载评论数据
    loadDataCommentList?: () => void;
    // 加载评论回复数据
    loadDataReplyList?: () => void;
}

/**
 * 评论操作区
 */
const CommentActions: React.FC<Props> = React.memo((props) => {
    const { comment, reply, loadDataCommentList, loadDataReplyList } = props;

    const [showInput, setShowInput] = useState<boolean>(false);

    /**
     * 获取评论或回复的文本
     * @returns 评论或回复的文本
     */
    const getReplyText = () => {
        if (reply) {
            return "回复";
        }
        return comment.replyPage.total > 0 ? comment.replyPage.total.toString() : "评论";
    }

    /**
     * 评论回复功能视图
     */
    const commentReplyActionView = () => {
        const iconPropsInit = {
            onClick: () => {
                setShowInput(!showInput);
            },
        }

        const iconProps = showInput
            ? {
                icon: MessageFilled,
                text: "取消回复",
                className: "active",
                ...iconPropsInit,
            }
            : {
                icon: MessageOutlined,
                text: getReplyText(),
                ...iconPropsInit,
            };

        return <IconText key="list-vertical-message" {...iconProps} />;
    }

    /**
     * 评论回复点赞功能view
     */
    const commentReplyThumbView = () => {
        const thumbNum = reply ? reply.thumbNum : comment.thumbNum;
        const text = thumbNum === 0 ? "点赞" : thumbNum.toString();
        const hasThumb = reply ? reply.hasThumb : comment.hasThumb;

        const iconProps = {
            text,
            className: hasThumb ? "active" : undefined,
            icon: hasThumb ? LikeFilled : LikeOutlined,
        };

        return <IconText key="list-vertical-like" {...iconProps} />;
    }

    /**
     * 评论回复时间
     */
    const commentReplyTimeView = () => {
        return reply ? formatTime(reply.createTime) : formatTime(comment.createTime);
    }

    const handleShowInput = useCallback((isShow: boolean) => {
        setShowInput(isShow);
    }, [])

    return (
        <div>
            <Flex justify='space-between' className="comment-actions">
                <Flex>
                    <div className="comment-action-item">
                        {commentReplyTimeView()}
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
                    trigger={['click']}
                    menu={{
                        items: [
                            {
                                key: 'commentDelete',
                                icon: <DeleteOutlined />,
                                label: '删除',
                                danger: true,
                                onClick: () =>
                                    Modal.confirm({
                                        icon: <ExclamationCircleOutlined />,
                                        content: '是否确认删除？不可找回',
                                        onOk() {
                                            message.success("删除成功");
                                        },
                                    })
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
            {showInput && <AddReplyComment comment={comment} reply={reply} handleShowInput={handleShowInput} />}
        </div>
    )
})

export default CommentActions;