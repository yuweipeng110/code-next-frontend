import React from 'react';
import { Avatar, Button, Empty, List, Skeleton } from 'antd';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import HighlightText from '@/components/Other/HighlightText';
import "./index.css";

type Props = {
    data: API.TagVO[];
    total: number;
    loadMoreData: () => void;
    keyword: string;
}

/**
 * 搜索标签
 * @returns 
 */
const SearchTag: React.FC<Props> = React.memo((props) => {
    console.log('render SearchTag')

    const { data, total, loadMoreData, keyword } = props;

    const subscribeView = (item: API.TagVO, index: number) => {
        if (index === 2) {
            return <Button className="subscribe-btn subscribed">已关注</Button>;
        }
        return <Button className="subscribe-btn">关注</Button>
    }

    return (
        <div className="search-tag">
            <InfiniteScrollComponent
                // data={data}
                dataLength={data.length}
                total={total}
                loadMoreData={loadMoreData}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            >
                <List
                    dataSource={data}
                    locale={{ emptyText: total === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                    renderItem={(item, index) => (
                        <List.Item key={index} style={{ padding: 20 }}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture} size={45} />}
                                title={<HighlightText text={index + "-" + data.length + item.title} keyword={keyword} />}
                                description={item.description}
                            />
                            {subscribeView(item, index)}
                        </List.Item>
                    )}
                />
            </InfiniteScrollComponent>
        </div>
    )
})

export default SearchTag;