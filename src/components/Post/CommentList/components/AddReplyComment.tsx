import React, { ForwardedRef, useContext, useDeferredValue, useState, useTransition } from 'react';
import { Button, Form, Input, Row, Space } from 'antd';
import { LoadPostCommentReplyVO, LoadPostCommentVO } from '../type';
import { AddCommentReplyProvider, CommentReplyEditProvider } from '../CommentContext';

type Props = {
    // 加工评论对象
    loadCommentCurrent: LoadPostCommentVO;
    // 加工评论回复对象（可选）
    loadReplyCurrent?: LoadPostCommentReplyVO;
}

/**
 * 添加回复评论
 */
const AddReplyComment = React.memo(React.forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { loadCommentCurrent, loadReplyCurrent } = props;
    const commentCurrent = loadCommentCurrent.comment;
    const { toggleCurrentCommentReplyVisibility } = useContext(CommentReplyEditProvider);
    const { handleAddReplyCommentChange } = useContext(AddCommentReplyProvider);

    const [isPending, startTransition] = useTransition();

    /**
     * 根据评论ID和回复ID查找当前评论或回复
     */
    const getCommentReplyUser = () => {
        if (loadReplyCurrent) {
            return loadReplyCurrent.user;
        }
        return loadCommentCurrent.comment.user;
    }

    /**
     * 处理输入框内容变化的回调函数
     * 使用防抖处理，防止频繁更新状态
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        // 在不阻塞 UI 的情况下更新状态
        startTransition(() => {
            if (loadReplyCurrent) {
                handleAddReplyCommentChange(commentCurrent.id, loadReplyCurrent.id, inputValue);
            } else {
                handleAddReplyCommentChange(commentCurrent.id, undefined, inputValue);
            }
        });
    }

    /**
     * 处理取消按钮点击事件
     * 隐藏当前的回复输入框
     */
    const handleCancel = () => {
        if (loadReplyCurrent) {
            toggleCurrentCommentReplyVisibility(commentCurrent.id, loadReplyCurrent.id);
        } else {
            toggleCurrentCommentReplyVisibility(commentCurrent.id);
        }
    };

    return (
        <div ref={ref} className="comment-reply" data-comment-id={commentCurrent.id}>
            <Form>
                <Form.Item name="content" wrapperCol={{ offset: 2, span: 22 }}>
                    <Input.TextArea
                        allowClear
                        showCount
                        maxLength={1000}
                        placeholder={`回复 @${getCommentReplyUser().userName}`}
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