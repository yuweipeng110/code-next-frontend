'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import Link from 'next/link';
import { Card, Empty, Flex, Input, List, message, Modal, Skeleton, Space, Tag } from 'antd';
import { DeleteFilled, SearchOutlined } from '@ant-design/icons';
import { deletePostViewUsingPost, listPostVoByPageUsingPost4 } from '@/api/postViewController';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import { formatNumber } from '@/utils/tool';
import HighlightText from '@/components/Other/HighlightText';
import moment from 'moment';
import './index.css';

type SearchParams = {
    current: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
    searchPostTitle?: string;
}

const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 10,
};

/**
 * 浏览记录
 * @returns 
 */
const FootmarkPage = () => {
    const loginUser = useSelector((state: RootState) => state.loginUser);

    // 搜索框输入值
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    // 是否搜索完成
    const [isSearchEnter, setIsSearchEnter] = useState<boolean>(false);
    // 浏览记录列表
    const [dataList, setDataList] = useState<API.PostViewVO[]>([]);
    // 浏览记录列表总数
    const [total, setTotal] = useState<number>(10);
    // 搜索参数
    const [searchParams, setSearchParams] = useState<SearchParams>(DEFAULT_PAGE_PARAMS);

    /**
     * 加载数据
     * @param params 搜索参数
     * @returns 
     */
    const loadData = async (params: SearchParams) => {
        try {
            const res = await listPostVoByPageUsingPost4({
                ...params,
                userId: loginUser.id as unknown as number,
                sortField: "create_time",
                sortOrder: "desc"
            });
            const dataList = res.data?.records || [];
            const total = res.data?.total || 0;
            setDataList((prevData) => [...prevData, ...dataList]);
            setTotal(total);
        } catch (error: any) {
            message.error('加载失败: ' + error.message);
        }
    }

    // 监听搜索参数变化时加载数据
    useEffect(() => {
        if (loginUser.id) {
            loadData(searchParams);
        }
    }, [searchParams, loginUser.id]);

    // 加载更多数据
    const loadMoreData = () => {
        setSearchParams((prev) => ({
            ...prev,
            current: prev.current + 1
        }));
    };

    /**
     * 重新加载数据
     */
    const reloadData = () => {
        // 重置浏览记录数据列表
        setDataList([]);
        // 重新加载列表
        loadData({
            ...DEFAULT_PAGE_PARAMS,
            userId: loginUser.id as unknown as number,
            searchPostTitle: searchInputValue,
        })
    }

    /**
     * 搜索框回车事件
     */
    const handleSearchInputEnter = () => {
        // if (dataList.length <= 0 && total === 0) {
        //     return;
        // }
        reloadData();
        setIsSearchEnter(searchInputValue.length > 0);
    }

    /**
     * 删除浏览记录
     */
    const deletePostViewRequest = async () => {
        try {
            const res = await deletePostViewUsingPost({
                userId: loginUser.id as unknown as number,
            });
            if (res.data === 1) {
                message.error('清空成功');
                // 重新加载数据
                reloadData();
            }
        } catch (error: any) {
            message.error('加载失败: ' + error.message);
        }
    }

    /**
     * 删除按钮点击事件
     */
    const showDeleteConfirm = () => {
        if (dataList.length <= 0) {
            message.warning('当前暂无可清除的阅读记录');
            return;
        }
        Modal.confirm({
            title: '确定清空浏览记录吗？',
            content: '浏览记录清除后无法恢复',
            okText: '确定清空',
            onOk() {
                deletePostViewRequest();
            },
        });
    };

    let previousCreateTime = null; // 用于存储上一项的 createTime

    return (
        <div id="footmark-page">
            <Card
                styles={{ title: { fontSize: 20 }, header: { border: 'none' }, body: { padding: "12px 24px" } }}
                title="浏览记录"
                extra={
                    <Flex style={{ margin: "10px 0" }}>
                        <Space size="large">
                            <Input
                                placeholder='搜索标题关键词'
                                variant="filled"
                                suffix={
                                    <SearchOutlined
                                        className='search-icon'
                                        style={{ marginRight: 0 }}
                                        onClick={handleSearchInputEnter} />
                                }
                                onPressEnter={handleSearchInputEnter}
                                onChange={(e) => setSearchInputValue(e.target.value)}
                            />
                            <Space className='clear-btn' onClick={showDeleteConfirm}>
                                <DeleteFilled className='delete-icon' /> 清空记录
                            </Space>
                        </Space>
                    </Flex>
                }
            >
                {
                    isSearchEnter && (
                        <div className='show-search-count'>匹配到 <span className='count'>{total}</span> 条浏览记录</div>
                    )
                }
                <InfiniteScrollComponent
                    dataLength={dataList.length}
                    total={total}
                    loadMoreData={loadMoreData}
                    loader={
                        [...Array(4)].map((_, index) => (
                            <Skeleton
                                key={index}
                                active
                                title
                                paragraph={{ rows: 2 }}
                                style={{ padding: "20px 0", borderBlockEnd: '1px solid rgba(5, 5, 5, 0.06)' }}
                            />
                        ))
                    }
                >
                    <List<API.PostViewVO>
                        itemLayout="vertical"
                        dataSource={dataList}
                        locale={{
                            emptyText: total === 0 ?
                                <Empty style={{ padding: 20 }} description={isSearchEnter && total === 0 ? '请使用内容标题中包含的关键词进行查找' : '你当前还没有浏览记录，快去阅读文章吧～'} />
                                : <></>
                        }}
                        rootClassName='descrip-list'
                        renderItem={(item, index) => {
                            const isSameDay = previousCreateTime && moment(item.createTime).isSame(previousCreateTime, 'day');
                            previousCreateTime = item.createTime; // 更新上一项的 createTime
                            return (
                                <List.Item key={index}>
                                    <List.Item.Meta
                                        title={
                                            !isSameDay && (
                                                <Space className='time-show'>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 0.5C9.03757 0.5 11.5 2.96243 11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5ZM6.25003 3.50006C6.3881 3.50006 6.50003 3.61199 6.50003 3.75006V5.50006H8.25003C8.3881 5.50006 8.50003 5.61199 8.50003 5.75006V6.25006C8.50003 6.38813 8.3881 6.50006 8.25003 6.50006H5.75003C5.61196 6.50006 5.50003 6.38813 5.50003 6.25006V3.75006C5.50003 3.61199 5.61196 3.50006 5.75003 3.50006H6.25003Z" fill="#1E80FF" />
                                                    </svg>
                                                    <span className='date'>{moment(item.createTime).format('YYYY-MM-DD')}</span>
                                                </Space>
                                            )
                                        }
                                    />
                                    <Flex className='normal' justify='space-between'>
                                        <div className='left'>
                                            <Flex align='center'>
                                                <Tag color='blue' bordered={false}>文章</Tag>
                                                <h2 className='title-art'>
                                                    <HighlightText text={item.post.title} keyword={searchInputValue} />
                                                </h2>
                                            </Flex>
                                            <div className="abstract">
                                                {item.post.content}
                                            </div>
                                            <Flex className='user-info' align='center'>
                                                <Link href={`/user/${item.post.userId}`} className='username'>{item.post.user.userName}</Link>
                                                <div className="separator"></div>
                                                <div className='active-info'>
                                                    <span>{formatNumber(item.post.viewNum)}阅读</span>
                                                    <span>{formatNumber(item.post.thumbNum)}赞</span>
                                                    <span>{formatNumber(item.post.commentNum)}评论</span>
                                                </div>
                                            </Flex>
                                        </div>
                                        {
                                            index !== 0 && (
                                                <div className='right'>
                                                    <img src="https://p9-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/365c4c447964423fa6c7be92c25d3caa~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oiR5LiN5ZCD6aW85bmy:q75.awebp?rk3s=f64ab15b&amp;x-expires=1739320674&amp;x-signature=yoBbu7AnEzug93YKq8Q2KcMcGtM%3D" alt="" className="cover" />
                                                </div>
                                            )
                                        }
                                    </Flex>
                                </List.Item>
                            )
                        }}
                    />
                </InfiniteScrollComponent>
            </Card>
        </div>
    )
}

export default FootmarkPage;