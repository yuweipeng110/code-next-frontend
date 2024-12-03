import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Row, Space } from 'antd';

type Props = {
    // 评论对象
    comment: API.PostCommentVO;
    // 回复对象（可选）
    reply?: API.PostCommentReplyVO;
    // 控制是否显示 添加回复评论组件
    handleShowInput: (isShow: boolean) => void;
}

/**
 * 添加回复评论
 */
const AddReplyComment: React.FC<Props> = React.memo((props) => {
    const { comment, reply, handleShowInput } = props;

    const commentReplyRef = useRef<HTMLDivElement>(null);

    // 评论内容
    const [inputValue, setInputValue] = useState<string>("");

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        let clickedCommentId: string | undefined;

        if (target instanceof HTMLElement) { // 确保 target 是 HTMLElement
            const closestElement = target.closest('.comment-reply');

            if (closestElement instanceof HTMLElement) { // 确保 closest 返回的是 HTMLElement
                clickedCommentId = closestElement.dataset.commentId;
            }
        }

        if (!clickedCommentId && !target.classList.contains('ant-space-item')) {
            if (inputValue.length === 0) {
                handleCancel();
            }
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
    };

    useEffect(() => {
        // 添加全局点击事件监听器
        document.addEventListener('mousedown', handleClickOutside);

        // 清理事件监听器
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    /**
     * 根据评论ID和回复ID查找当前评论或回复
     */
    const getCommentReplyUser = () => {
        if (reply) {
            return reply.user;
        }
        return comment.user;
    }

    /**
     * 处理取消按钮点击事件
     * 隐藏当前的回复输入框
     */
    const handleCancel = () => {
        handleShowInput(false);
    };

    return (
        <div ref={commentReplyRef} className="comment-reply" data-comment-id={comment.id}>
            <Form>
                <Form.Item name="content" wrapperCol={{ offset: 2, span: 22 }}>
                    <Input.TextArea
                        allowClear
                        showCount
                        maxLength={1000}
                        placeholder={`回复 @${getCommentReplyUser().userName}`}
                        style={{ height: 120, resize: 'none' }}
                        onChange={(e) => setInputValue(e.target.value)}
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
})

export default AddReplyComment;