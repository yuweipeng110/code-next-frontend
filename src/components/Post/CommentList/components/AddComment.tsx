import React, { useState } from 'react';
import { Avatar, Button, Card, Flex, Input, Popover, Space } from 'antd';
import { EditOutlined, SmileOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { DEFAULT_AVATAR } from '@/constants';
import Picker from '@emoji-mart/react';

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

    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const [textAreaMinHeight, setTextAreaMinHeight] = useState<number>(60);
    const [emojiVisible, setEmojiVisible] = useState<boolean>(false);

    /**
     * 在选择 emoji 时添加到 TextArea
     */
    const addEmoji = (emoji: any) => {
        setTextAreaValue((prevText) => prevText + emoji.native);  // 在现有文本后插入选中的 emoji
    };

    /**
     * 切换 emoji 选择器的可见性
     */
    const toggleEmojiPicker = () => {
        setEmojiVisible(!emojiVisible);
    };

    return (
        <div className="editor-container">
            <Avatar src={loginUser.userAvatar || DEFAULT_AVATAR} size={48} />
            <Card style={{ width: "90%" }}>
                <Input.TextArea
                    value={textAreaValue}
                    allowClear
                    showCount
                    maxLength={10000}
                    variant="filled"
                    placeholder={placeholder}
                    styles={{ textarea: { minHeight: textAreaMinHeight, maxHeight: 400, overflow: "auto" } }}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    onFocus={() => setTextAreaMinHeight(150)}
                    onBlur={() => setTextAreaMinHeight(60)}
                />
                <div style={{ marginBottom: 26 }} />
                <Flex justify='space-between' align='center'>
                    <Space size="large">
                        <Popover
                            content={<Picker locale='zh' searchPosition='none' previewPosition='none' onEmojiSelect={addEmoji} />}
                            trigger="click"
                            open={emojiVisible}
                            onOpenChange={toggleEmojiPicker}
                        >
                            <Space className='cursor-pointer'>
                                <SmileOutlined /> 表情
                            </Space>
                        </Popover>
                        <Space className='cursor-pointer'>
                            <EditOutlined /> 切换
                        </Space>
                    </Space>
                    <Button type="primary" style={{ width: 130 }}>
                        发布回答
                    </Button>
                </Flex>
            </Card>
        </div>
    )
})

export default AddComment;