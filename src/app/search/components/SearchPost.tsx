import React from 'react';
import { Empty, List, Skeleton, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import HighlightText from '@/components/Other/HighlightText';
import { formatTime } from '@/utils/date';
import "./index.css";

type Props = {
    data: API.PostVO[];
    total: number;
    loadMoreData: () => void;
    keyword: string;
}

const IconText = ({ icon, text }: { icon: any; text: string }) => (
    <span>
        {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
        {text}
    </span>
);

/**
 * 搜索帖子
 * @returns 
 */
const SearchPost: React.FC<Props> = React.memo((props) => {
    console.log('render SearchPost')

    const { data, total, loadMoreData, keyword } = props;

    const postItemMetaView = (item: API.PostVO, index: number) => {
        return (
            <Typography.Text type="secondary" className="meta-row">
                <Space>
                    {item.user?.userName}
                    {formatTime(item.createTime!)}
                    {item.tagList?.map(tag => tag)}
                </Space>
            </Typography.Text>
        )
    }

    return (
        <div className="search-post">
            <InfiniteScrollComponent
                // data={data}
                dataLength={data.length}
                total={total}
                loadMoreData={loadMoreData}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            >
                <List
                    itemLayout="vertical"
                    dataSource={data}
                    locale={{ emptyText: total === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                    renderItem={(item, index) => (
                        <List.Item key={index} style={{ padding: 20 }}
                            actions={[
                                <IconText
                                    icon={StarOutlined}
                                    text="156"
                                    key="list-vertical-star-o"
                                />,
                                <IconText
                                    icon={LikeOutlined}
                                    text="156"
                                    key="list-vertical-like-o"
                                />,
                                <IconText
                                    icon={MessageOutlined}
                                    text="2"
                                    key="list-vertical-message"
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                title={postItemMetaView(item, index)}
                                className="meta-row"
                            />
                            <Space direction="vertical" size="small" className='flex'>
                                <Typography.Title level={4} className="title-row space-nowap">
                                    <HighlightText text={index + "-" + data.length + item.title} keyword={keyword} />
                                </Typography.Title>
                                <Typography.Text className="content-row">
                                    <HighlightText text={item.content} keyword={keyword} />
                                </Typography.Text>
                            </Space>
                        </List.Item>
                    )}
                />
            </InfiniteScrollComponent>
        </div>
    )
})

export default SearchPost;