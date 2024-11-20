import React, { ForwardedRef, useMemo } from 'react';
import { Button, Form, Input, Row, Space } from 'antd';
import { LoadPostCommentVO } from '../type';
import { debounce } from '@/utils/tool';

type Props = {
    // 评论对象ID
    commentId: string;
    replyMoreDataList: LoadPostCommentVO[];
    setReplyMoreDataList: (list: LoadPostCommentVO[]) => void;
    // 回复对象ID（可选）
    replyId?: string;
}

/**
 * 添加回复评论
 */
const AddReplyComment = React.memo(React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { commentId, replyMoreDataList, setReplyMoreDataList, replyId } = props;

    /**
     * 根据评论ID和回复ID查找当前评论或回复
     */
    const commentReply = useMemo(() => {
        const comment = replyMoreDataList.find(commentItem => commentItem.id === commentId);
        if (comment) {
            return replyId ? comment.replyList.find(replyItem => replyItem.id === replyId) : comment.comment;
        }
        return null;
    }, [replyMoreDataList, commentId, replyId]);

    /**
     * 处理输入框内容变化的回调函数
     * 使用防抖处理，防止频繁更新状态
     */
    const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        const newReplyMoreDataList = replyMoreDataList.map(commentItem => {
            if (commentItem.id === commentId) {
                if (replyId) {
                    return {
                        ...commentItem,
                        replyList: commentItem.replyList.map(replyItem => {
                            if (replyItem.id === replyId) {
                                return { ...replyItem, contentIsHasValue: value.length > 0 };
                            }
                            return replyItem;
                        }),
                    };
                }
                return { ...commentItem, contentIsHasValue: value.length > 0 };
            }
            return commentItem;
        });
        setReplyMoreDataList(newReplyMoreDataList);
    }, 200)

    /**
     * 处理取消按钮点击事件
     * 隐藏当前的回复输入框
     */
    const handleCancel = () => {
        const newReplyMoreDataList = replyMoreDataList.map(commentItem => {
            if (commentItem.id === commentId) {
                if (replyId) {
                    return {
                        ...commentItem,
                        replyList: commentItem.replyList.map(replyItem => {
                            if (replyItem.id === replyId) {
                                return { ...replyItem, isCurrentAddCommentShow: false };
                            }
                            return replyItem;
                        }),
                    };
                }
                return { ...commentItem, isCurrentAddCommentShow: false };
            }
            return commentItem;
        });
        setReplyMoreDataList(newReplyMoreDataList);
    };

    return (
        <div ref={ref} className="comment-reply" data-comment-id={commentId}>
            <Form>
                <Form.Item name="content" wrapperCol={{ offset: 2, span: 22 }}>
                    <Input.TextArea
                        allowClear
                        showCount
                        maxLength={1000}
                        placeholder={`回复 @${commentReply?.user?.userName}`}
                        style={{ height: 120, resize: 'none' }}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Row justify="end">
                        <Space>
                            <Button style={{ width: 100 }} onClick={handleCancel}>
                                取消
                            </Button>
                            <Button type="primary" style={{ width: 100 }}>
                                回复
                            </Button>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    );
}));

export default AddReplyComment;