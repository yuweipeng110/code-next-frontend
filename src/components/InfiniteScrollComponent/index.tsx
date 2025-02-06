import React from 'react';
import { Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
    // 数据源长度
    dataLength?: number;
    // 数据总数
    total: number;
    // 到达底部后必须调用的函数，例如，初始数据=[1,2,3]，然后下一次数据加载应为[1,2,3,4,5,6]
    loadMoreData: () => void;
    // 等待下一次数据加载时发送一个加载程序组件进行显示
    loader: React.ReactNode;
} & Readonly<{
    // 内容
    children: React.ReactNode;
}>;

/**
 * 无限滚动加载组件
 * 
 * @param props 
 * @returns 
 */
const InfiniteScrollComponent: React.FC<Props> = React.memo((props) => {
    const { children, dataLength, total, loadMoreData, loader } = props;

    return (
        <InfiniteScroll
            dataLength={dataLength}
            next={() => {
                // if (data.length > 0 && total > 0) {
                if (dataLength < total) {
                    console.log("next");
                    loadMoreData();
                }
            }}
            hasMore={dataLength < total}
            // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            loader={loader}
            endMessage={total > 0 ? <Divider plain>It is all, nothing more 🤐</Divider> : <></>}
            // scrollableTarget="scrollableDiv"
            children={children}
        />
    )
})

export default InfiniteScrollComponent;