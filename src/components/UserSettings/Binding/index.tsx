import { ProCard } from '@ant-design/pro-components';
import { List } from 'antd';
import { AlipaySquareFilled, DingtalkCircleFilled, GithubFilled, TaobaoSquareFilled, WechatFilled, WeiboCircleFilled } from '@ant-design/icons';
import "./index.css";

type Unpacked<T> = T extends (infer U)[] ? U : T;

/**
 * 用户设置（账号绑定）
 */
const UserSettingBinding = () => {

    const listData = [
        {
            title: '微信',
            description: '未绑定',
            actions: [<a key="Bind">绑定</a>],
            avatar: <WechatFilled />,
        },
        {
            title: '新浪微博',
            description: '未绑定',
            actions: [<a key="Bind">绑定</a>],
            avatar: <WeiboCircleFilled />,
        },
        {
            title: 'GitHub',
            description: '未绑定',
            actions: [<a key="Bind">绑定</a>],
            avatar: <GithubFilled />,
        },
        {
            title: '绑定淘宝',
            description: '未绑定',
            actions: [<a key="Bind">绑定</a>],
            avatar: <TaobaoSquareFilled />,
        },
        {
            title: '绑定支付宝',
            description: '未绑定',
            actions: [<a key="Bind">绑定</a>],
            avatar: <AlipaySquareFilled />,
        },
        {
            title: '绑定钉钉',
            description: '未绑定',
            actions: [<a key="Bind">绑定</a>],
            avatar: <DingtalkCircleFilled />,
        },
    ];

    return (
        <div className="user-setting-binding">
            <ProCard
                title={<h3>账号绑定</h3>}
                headerBordered
            >
                <List<Unpacked<typeof listData>>
                    itemLayout="horizontal"
                    dataSource={listData}
                    renderItem={(item) => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta
                                avatar={item.avatar}
                                title={item.title}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </ProCard>
        </div>
    )
}

export default UserSettingBinding;