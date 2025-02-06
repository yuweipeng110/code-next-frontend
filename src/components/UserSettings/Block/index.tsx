import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { TabsProps } from 'antd';
import UserSettingBlockAuthor from './Author';
import UserSettingBlockTag from './Tag';
import "./index.css";

/**
 * 用户设置（屏蔽管理）
 */
const UserSettingBlock = () => {

    const items: TabsProps['items'] = [
        { key: 'blockAuthor', label: '屏蔽作者', children: <UserSettingBlockAuthor /> },
        { key: 'blockTag', label: '屏蔽标签', children: <UserSettingBlockTag /> },
    ];

    return (
        <div className="user-setting-block">
            <ProCard
                tabs={{
                    items: items,
                    size: "large"
                }}
            />
        </div>
    )
}

export default UserSettingBlock;