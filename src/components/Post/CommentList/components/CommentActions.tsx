import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { Dropdown, Flex, message, Modal, Space } from 'antd';
import { DeleteOutlined, EllipsisOutlined, ExclamationCircleOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import AddReplyComment from './AddReplyComment';
import moment from 'moment';

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
    const loginUser = useSelector((state: RootState) => state.loginUser);

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
    const commentReplyTimeView = () => reply ? moment(reply.createTime).fromNow() : moment(comment.createTime).fromNow();

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
                    trigger={['click', 'hover']}
                    menu={{
                        items: [
                            (loginUser.id !== (reply ? reply.userId : comment.userId)) ? null : {
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
                                key: 'commentBlock',
                                icon: <svg data-v-624473bc="" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="menu-icon"><path data-v-624473bc="" fill-rule="evenodd" clip-rule="evenodd" d="M8.21356 7.13688C9.49486 7.13688 10.5336 6.09818 10.5336 4.81688C10.5336 3.53557 9.49486 2.49688 8.21356 2.49688C6.93225 2.49688 5.89356 3.53557 5.89356 4.81688C5.89356 6.09818 6.93225 7.13688 8.21356 7.13688ZM8.21356 8.33688C10.1576 8.33688 11.7336 6.76092 11.7336 4.81688C11.7336 2.87283 10.1576 1.29688 8.21356 1.29688C6.26951 1.29688 4.69355 2.87283 4.69355 4.81688C4.69355 6.76092 6.26951 8.33688 8.21356 8.33688ZM5.91749 10.5125C4.30178 10.5125 2.99199 11.8223 2.99199 13.438C2.99199 13.4706 3.01845 13.4971 3.05108 13.4971H7.53515C7.86652 13.4971 8.13515 13.7657 8.13515 14.0971C8.13515 14.4285 7.86652 14.6971 7.53515 14.6971H3.05108C2.35571 14.6971 1.79199 14.1334 1.79199 13.438C1.79199 11.1595 3.63904 9.3125 5.91749 9.3125H7.53515C7.86652 9.3125 8.13515 9.58113 8.13515 9.9125C8.13515 10.2439 7.86652 10.5125 7.53515 10.5125H5.91749ZM9.78025 10.1265C10.0146 9.8922 10.3945 9.8922 10.6288 10.1265L11.908 11.4057L13.1833 10.1304C13.4176 9.89611 13.7975 9.89611 14.0318 10.1304C14.2661 10.3647 14.2661 10.7446 14.0318 10.979L12.7565 12.2542L14.0229 13.5206C14.2572 13.7549 14.2572 14.1348 14.0229 14.3692C13.7886 14.6035 13.4087 14.6035 13.1744 14.3692L11.908 13.1028L10.6377 14.3731C10.4034 14.6074 10.0235 14.6074 9.78914 14.3731C9.55483 14.1388 9.55483 13.7589 9.78914 13.5245L11.0594 12.2542L9.78025 10.975C9.54594 10.7407 9.54594 10.3608 9.78025 10.1265Z"></path></svg>,
                                label: `屏蔽作者：${reply ? reply.user.userName : comment.user.userName}`
                            },
                            {
                                key: 'commentReport',
                                icon: <WarningOutlined />,
                                label: "举报",
                            },
                        ]
                    }}
                >
                    <EllipsisOutlined style={{ cursor: "pointer", fontSize: 20 }} />
                </Dropdown>
            </Flex>
            {showInput && <AddReplyComment comment={comment} reply={reply} handleShowInput={handleShowInput} />}
        </div>
    )
})

export default CommentActions;