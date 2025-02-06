import React, { useState } from 'react';
import { Dropdown, Flex, List, message, Modal, Space, Tag } from 'antd';
import { DeleteFilled, EditFilled, EllipsisOutlined, ExclamationCircleOutlined, EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import IconText from '@/components/IconText';
import TagList from '@/components/TagList';
import { Skeleton } from 'antd/lib';
import "./index.css";

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
 * 用户中心-明细列表-文章
 */
const UserCenterDetailListPost = () => {
    console.log('UserCenterDetailListPost')
    const [selectedTab, setSelectedTab] = useState<string>(tagsData[0].key);

    const handleChange = (key: string, checked: boolean) => {
        const nextSelectedTags = checked ? key : "";
        setSelectedTab(nextSelectedTags);
    }

    return (
        <div className='user-center-detail-list-post'>
            {tagsData.map<React.ReactNode>((tagItem) => (
                <Tag.CheckableTag
                    key={tagItem.key}
                    className="custom-checkable-tag"
                    checked={selectedTab === tagItem.key}
                    onChange={(checked) => handleChange(tagItem.key, checked)}
                >
                    {tagItem.label}
                </Tag.CheckableTag>
            ))}
            <div style={{ marginBottom: 16 }} />

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
                                <>2月前</>,
                                <Flex justify='space-between'>
                                    <Space size="middle">
                                        <IconText icon={EyeOutlined} text="156" key="list-vertical-star-o" />
                                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />
                                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
                                        <Dropdown
                                            trigger={['click']}
                                            menu={{
                                                items: [
                                                    {
                                                        key: 'postEdit',
                                                        icon: <EditFilled />,
                                                        label: "编辑",
                                                    },
                                                    {
                                                        key: 'postDelete',
                                                        icon: <DeleteFilled />,
                                                        label: '删除',
                                                        danger: true,
                                                        onClick: () =>
                                                            Modal.confirm({
                                                                icon: <ExclamationCircleOutlined />,
                                                                content: '是否确认删除？不可找回',
                                                                onOk() {
                                                                    message.success("删除成功");
                                                                },
                                                            })
                                                    },
                                                ]
                                            }}
                                        >
                                            <EllipsisOutlined style={{ cursor: "pointer" }} />
                                        </Dropdown>
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

export default UserCenterDetailListPost;