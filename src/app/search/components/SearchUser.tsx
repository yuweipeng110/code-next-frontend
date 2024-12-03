import React from 'react';
import { Avatar, Button, Empty, List, Skeleton } from 'antd';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import HighlightText from '@/components/Other/HighlightText';
import "./index.css";
import { DEFAULT_AVATAR } from '@/constants';

type Props = {
    data: API.UserVO[];
    total: number;
    loadMoreData: () => void;
    keyword: string;
}

/**
 * 搜索用户
 * @returns 
 */
const SearchUser: React.FC<Props> = React.memo((props) => {

    const { data, total, loadMoreData, keyword } = props;

    const subscribeView = (item: API.TagVO, index: number) => {
        if (index === 2) {
            return <Button className="subscribe-btn subscribed">已关注</Button>;
        }
        return <Button className="subscribe-btn">关注</Button>
    }

    return (
        <div className="search-user">
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
                                avatar={<Avatar src={item.userAvatar || DEFAULT_AVATAR} size={45} />}
                                title={<HighlightText text={index + "-" + data.length + item.userName} keyword={keyword} />}
                                description={item.userProfile}
                            />
                            {subscribeView(item, index)}
                        </List.Item>
                    )}
                />
            </InfiniteScrollComponent>
        </div>
    )
})

export default SearchUser;