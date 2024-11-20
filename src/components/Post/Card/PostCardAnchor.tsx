import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Anchor, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import './postCardAnchor.css';

type Props = {
    anchorItems: AnchorLinkItemProps[];
}

/**
 * 帖子内容目录 markdown 锚点
 * @param props 
 * @returns 
 */
const AnchorSection: React.FC<Props> = (props) => {
    const { anchorItems } = props;

    // 控制目录card折叠
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <ProCard
            title="目录"
            extra={
                <Space
                    size="small"
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ cursor: "pointer" }}
                >
                    <>{!collapsed ? "收起" : "展开"}</>
                    <DownOutlined rotate={!collapsed ? 180 : undefined} />
                </Space>
            }
            headerBordered
            collapsed={collapsed}
            className="card-anchor"
        >
            <Anchor targetOffset={60} affix={false} replace items={anchorItems} />
        </ProCard>
    )
}

export default AnchorSection;