'use client';
import { useState } from 'react';
import { Input, Popover, Space } from 'antd';
import { EditOutlined, SmileOutlined } from '@ant-design/icons';
import Picker from '@emoji-mart/react';

const EmojiTextArea = () => {
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
        <div style={{ padding: '20px' }}>
            <Input.TextArea
                value={textAreaValue}
                allowClear
                showCount
                maxLength={10000}
                variant="filled"
                placeholder="抢首评，友善交流"
                styles={{ textarea: { minHeight: textAreaMinHeight, maxHeight: 400, overflow: "auto" } }}
                onChange={(e) => setTextAreaValue(e.target.value)}
                onFocus={() => setTextAreaMinHeight(150)}
                onBlur={() => setTextAreaMinHeight(60)}
            />
            <div style={{ marginBottom: 16 }} />
            <div className='editor-footer'>
                <Space>
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
            </div>
        </div>
    );
};

export default EmojiTextArea;
