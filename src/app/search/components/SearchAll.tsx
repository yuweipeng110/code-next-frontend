import React from 'react';
import { Skeleton } from 'antd';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';

type Props = {
    data: any[];
}

/**
 * 综合搜索全部
 * @returns 
 */
const SearchAll: React.FC<Props> = React.memo((props) => {

    return (
        <div className="search-all">
            SearchAll
            <InfiniteScrollComponent
                data={[]}
                total={10}
                loadMoreData={() => { }}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            >

                <div style={{ marginTop: '20px' }} >
                    <h3>内容区域</h3>
                    <p>这里是选项卡下方的额外内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                    <p>更多内容...</p>
                </div>

            </InfiniteScrollComponent>


            <div style={{ marginTop: '20px' }} >
                <h3>内容区域</h3>
                <p>这里是选项卡下方的额外内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
                <p>更多内容...</p>
            </div>
        </div>
    )
})

export default SearchAll;