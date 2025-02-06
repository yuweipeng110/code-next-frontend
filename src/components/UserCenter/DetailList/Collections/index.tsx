import { Button, List } from 'antd';
import { Skeleton } from 'antd/lib';
import "./index.css";

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `大帅老猿 ${i}`,
    avatar: `https://picsum.photos/200/300?${i}`,
    description:
        'Ant Design, a design language for background applications',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

/**
 * 用户中心-明细列表-收藏集
 */
const UserCenterDetailListCollections = () => {
    console.log('UserCenterDetailListCollections')
    return (
        <div className='user-center-detail-list-collections'>
            <List
                itemLayout="horizontal"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <Skeleton key={item.title} paragraph={{ rows: 4 }} loading={false} active style={{ padding: "20px 0" }}>
                        <List.Item
                            key={item.title}
                            actions={[<Button className="subscribe-btn">关注</Button>]}
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={
                                    <div className='infos'>
                                        <span>文章数 13</span>
                                        <span>订阅人数 380</span>
                                        <span>小满zs</span>
                                    </div>
                                }
                            />
                        </List.Item>
                    </Skeleton>
                )}
            />
        </div>
    )
}

export default UserCenterDetailListCollections;