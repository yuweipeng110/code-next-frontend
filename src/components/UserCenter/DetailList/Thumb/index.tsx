import { Flex, List, Space } from 'antd';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import IconText from '@/components/IconText';
import TagList from '@/components/TagList';
import { Skeleton } from 'antd/lib';
import Link from 'next/link';
import "./index.css";

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://picsum.photos/200/300?${i}`,
    description:
        'Ant Design, a design language for background applications is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure),',
}));

/**
 * 用户中心-明细列表-赞
 */
const UserCenterDetailListThumb = () => {
    return (
        <div className='user-center-detail-list-thumb'>
            <Flex className='sub-header'>
                <div className='sub-header-title'>赞</div>
                <div className='sub-type-box'>
                    文章( 161 )
                </div>
            </Flex>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={data}
                // loading
                renderItem={(item) => (
                    <Skeleton key={item.title} paragraph={{ rows: 7 }} loading={false} active style={{ padding: "20px 0" }}>
                        <List.Item
                            key={item.title}
                            actions={[
                                <>程序员小鱼</>,
                                <>2月前</>,
                                <Flex justify='space-between'>
                                    <Space size="middle">
                                        <IconText icon={EyeOutlined} text="156" key="list-vertical-star-o" />
                                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />
                                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
                                    </Space>
                                    <TagList tagList={["GitHub", "前端", "编程语言"]} size="small" />
                                </Flex>
                            ]}
                            extra={
                                <img
                                    width={110}
                                    height={74}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    </Skeleton>
                )}
            />
        </div>
    )
}

export default UserCenterDetailListThumb;