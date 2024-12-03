import React from 'react';
import { Avatar, Button, Form, Input, Row } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { DEFAULT_AVATAR } from '@/constants';

type Props = {
    // 帖子对象
    post: API.PostVO;
    // 评论总数
    commentTotal: number;
}

/**
 * 添加评论
 */
const AddComment: React.FC<Props> = React.memo((props) => {
    const { post, commentTotal } = props;

    const loginUser = useSelector((state: RootState) => state.loginUser);

    const placeholder = commentTotal === 0 ? "抢首评，友善交流" : "平等表达，友善交流";

    return (
        <Form>
            <Form.Item name="content">
                <div className="editor-container">
                    <Avatar src={loginUser.userAvatar || DEFAULT_AVATAR} size={48} />
                    <Input.TextArea
                        allowClear
                        showCount
                        maxLength={1000}
                        variant="filled"
                        //   onChange={onChange}
                        placeholder={placeholder}
                        style={{ height: 120, resize: 'none' }}
                    />
                </div>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 20 }}>
                <Row justify="end">
                    <Button type="primary" style={{ width: 130 }}>
                        发布回答
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    )
})

export default AddComment;