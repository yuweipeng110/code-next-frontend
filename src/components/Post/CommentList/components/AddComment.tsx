import React from 'react';
import { Avatar, Button, Form, Input, Row } from 'antd';

type Props = {
    // 帖子对象
    postCurrent: API.PostVO;
    // 评论总数
    commentTotal: number;
}

/**
 * 添加评论
 */
const AddComment: React.FC<Props> = (props) => {
    const { postCurrent, commentTotal } = props;

    const placeholder = commentTotal === 0 ? "抢首评，友善交流" : "平等表达，友善交流";

    return (
        <Form>
            <Form.Item name="content">
                <div className="editor-container">
                    <Avatar src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg" size={48} />
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
}

export default AddComment;