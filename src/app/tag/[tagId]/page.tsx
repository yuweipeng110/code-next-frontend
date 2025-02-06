"use client";
import React, { useState } from 'react';
import { Button, Flex, Image, List, Skeleton, Space } from 'antd';
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import IconText from '@/components/IconText';
import './index.css';
import TagList from '@/components/TagList';

const data = Array.from({ length: 23 }).map((_, i) => ({
    id: i,
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://picsum.photos/200/300?${i}`,
    description:
        'Ant Design, a design language for background applications is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure),',
}));

const tagsData = [
    {
        key: 'new',
        label: '最新',
    },
    {
        key: 'hot',
        label: '热门',
    },
];

/**
 * 标签页
 */
const TagPage: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState<string>(tagsData[0].key);

    return (
        <div id="tag-page">
            <div className="tag-info-box">
                <div className="tag-info">
                    <h1 className="title">前端</h1>
                    <div className="tag-meta">700410 关注，539597 文章</div>
                </div>
            </div>
            <div className="max-width-content-2">
                <Flex justify='space-between' className='list-header'>
                    <Flex align='center'>
                        <Image src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/bac28828a49181c34110.png~tplv-t2oaga2asx-image.image" width={24} height={24} />
                        <Button className={`subscribe-btn`} style={{ marginLeft: 20 }}>
                            关注
                        </Button>
                    </Flex>
                    <ul className='nav-list'>
                        {tagsData.map(tabItem => {
                            return (
                                <li key={tabItem.key} className={`nav-item ${selectedTab === tabItem.key ? "active" : ""}`} onClick={() => setSelectedTab(tabItem.key)}>{tabItem.label}</li>
                            )
                        })}
                    </ul>
                </Flex>

                <List
                    rowKey="id"
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
                                        <TagList tagList={["GitHub", "JavaScript", "编程语言"]} size="small" />
                                    </Flex>
                                ]}
                                extra={
                                    item.id === 1 &&
                                    <img
                                        width={110}
                                        height={74}
                                        alt="logo"
                                        src="https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5d8564772fd54901a8b8e4c11eeaebcd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5riF6aOO5aSc5Y2K:q75.awebp?rk3s=f64ab15b&x-expires=1735206673&x-signature=kapAwKAhOAc%2BxP%2FUjGk0Q59T5LE%3D"
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
        </div>
    )
}

export default TagPage;