import React from 'react';
import { Button, List } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import "./index.css";

type Props = {
    handleChildActiveKey: (key: string) => void;
}

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
    strong: <span className="strong">强</span>,
    medium: <span className="medium">中</span>,
    weak: <span className="weak">弱 Weak</span>,
};

/**
 * 用户设置（安全设置）
 */
const UserSettingSecurity: React.FC<Props> = (props) => {
    const { handleChildActiveKey } = props;

    const listData = [
        {
            title: '账户密码',
            description: (
                <>
                    当前密码强度：
                    {passwordStrength.strong}
                </>
            ),
            actions: [<a key="updatePassword" onClick={() => handleChildActiveKey("security/updatePassword")}>修改密码</a>],
        },
        {
            title: '密保手机',
            description: `已绑定手机：138****8293`,
            actions: [<a key="updateCellphone" onClick={() => handleChildActiveKey("security/updateCellphone")}>修改手机</a>],
        },
        // {
        //     title: '密保问题',
        //     description: '未设置密保问题，密保问题可有效保护账户安全',
        //     actions: [<a key="Set">设置</a>],
        // },
        {
            title: '备用邮箱',
            description: `已绑定邮箱：ant***sign.com`,
            actions: [<a key="updateEmail" onClick={() => handleChildActiveKey("security/updateEmail")}>修改邮箱</a>],
        },
        {
            title: '账号注销',
            description: '注销账户将清空会员所有数据',
            actions: [<a key="logout">注销</a>],
        },
    ];

    return (
        <div className="user-setting-security">
            <ProCard
                title={<h3>安全设置</h3>}
                headerBordered
            >
                <List<Unpacked<typeof listData>>
                    itemLayout="horizontal"
                    dataSource={listData}
                    renderItem={(item) => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta title={item.title} description={item.description} />
                        </List.Item>
                    )}
                />
            </ProCard>
        </div>
    )
}

export default UserSettingSecurity;