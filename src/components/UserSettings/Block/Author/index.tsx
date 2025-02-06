import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Card, List, Typography } from 'antd';
import "./index.css";

const listGrid = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 5,
};

const data = Array.from({ length: 13 }).map((_, i) => ({
    id: i,
    name: `大帅老猿 ${i}`,
    avatar: `https://picsum.photos/200/300?${i}`,
}));

/**
 * 用户设置（屏蔽管理-屏蔽作者）
 */
const UserSettingBlockAuthor = () => {

    return (
        <div className='user-setting-block-author'>
            <List
                rowKey="id"
                grid={listGrid}
                // locale={{ emptyText: total === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <ProCard bordered>
                            <Card.Meta
                                style={{
                                    textAlign: 'center',
                                }}
                                avatar={
                                    <Avatar src={item.avatar} size={48} />
                                }
                                title={
                                    <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ paddingTop: 10 }}>
                                        {/* 只想躺平不想努力 */} {item.name}
                                    </Typography.Paragraph>
                                }
                                description={
                                    <div>
                                        <Typography.Paragraph type="secondary" ellipsis={{ rows: 1 }} style={{ fontSize: 12 }}>
                                            屏蔽时间:2024-12-18
                                        </Typography.Paragraph>
                                        <Button>取消屏蔽</Button>
                                    </div>
                                }
                            />
                        </ProCard>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default UserSettingBlockAuthor;