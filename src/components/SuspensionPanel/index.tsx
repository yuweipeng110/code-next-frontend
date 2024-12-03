import React from 'react';
import { Dropdown, FloatButton, MenuProps, Popover } from 'antd';
import { EditTwoTone, EllipsisOutlined, MessageTwoTone, SmileOutlined } from '@ant-design/icons';

/**
 * 悬浮按钮
 */
const SuspensionPanel = React.memo(() => {

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
    ];

    return (
        <FloatButton.Group shape="circle">
            <Popover placement="left" content="建议反馈">
                <FloatButton icon={<MessageTwoTone />} />
            </Popover>
            <Dropdown menu={{ items }} placement="topRight" arrow={{ pointAtCenter: true }}>
                <FloatButton icon={<EllipsisOutlined />} />
            </Dropdown>
            <FloatButton.BackTop visibilityHeight={200} tooltip="回到顶部" />
        </FloatButton.Group>
    )
})

export default SuspensionPanel;