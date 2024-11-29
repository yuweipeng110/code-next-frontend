"use client";
import { lazy, useCallback, useEffect, useState } from 'react';
import { message, Tabs, TabsProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import StickyBox from 'react-sticky-box';
// import SearchAll from './components/SearchAll';
// import SearchPost from './components/SearchPost';
// import SearchTag from './components/SearchTag';
// import SearchPicture from './components/SearchPicture';
// import SearchUser from './components/SearchUser';
import { searchAllUsingPost } from '@/api/searchController';
import './index.css';

const SearchAll = lazy(() => import('./components/SearchAll'));
const SearchPost = lazy(() => import('./components/SearchPost'));
const SearchTag = lazy(() => import('./components/SearchTag'));
const SearchPicture = lazy(() => import('./components/SearchPicture'));
const SearchUser = lazy(() => import('./components/SearchUser'));

type SearchParamsType = {
    type: string;
    text: string;
    current: number;
    pageSize: number;
}

/**
 * 搜索页面
 * @returns 
 */
const SearchPage = () => {
    const router = useRouter();
    const routeSearchParams = useSearchParams();
    const searchParamsObj = {
        query: routeSearchParams.get("query") || "",
        type: routeSearchParams.get("type") || "all",
    }

    const [activeKey, setActiveKey] = useState<string>(searchParamsObj.type);

    const [allList, setAllList] = useState<any[]>([]);
    const [postList, setPostList] = useState<API.PostVO[]>([]);
    const [tagList, setTagList] = useState<API.TagVO[]>([]);
    const [pictureList, setPictureList] = useState<API.Picture[]>([]);
    const [userList, setUserList] = useState<API.UserVO[]>([]);
    const [total, setTotal] = useState<number>(10);

    /**
     * 重置列表数据
     */
    const resetList = () => {
        setAllList([]);
        setPostList([]);
        setTagList([]);
        setPictureList([]);
        setUserList([]);
        setTotal(10);
    }

    const initSearchParams: SearchParamsType = {
        type: activeKey,
        text: "",
        current: 1,
        pageSize: 10,
    };

    const [searchParams, setSearchParams] = useState<SearchParamsType>(initSearchParams);

    /**
     * 监听路由变化时改变搜索参数SearchParams
     * 1. 重置列表数据
     * 2. 改变搜索参数
     */
    useEffect(() => {
        resetList();
        setSearchParams({
            ...initSearchParams,
            pageSize: searchParamsObj.type === "picture" ? 8 : initSearchParams.pageSize,
            type: searchParamsObj.type,
            text: searchParamsObj.query,
        })
    }, [routeSearchParams]);

    /**
     * 监听搜索参数变化时加载数据
     */
    useEffect(() => {
        if (searchParams.text !== "") {
            loadData(searchParams);
        }
    }, [searchParams]);

    /**
     * 加载更多数据 current + 1
     */
    const loadMoreData = useCallback(() => {
        setSearchParams(prev => {
            return {
                ...prev,
                current: prev.current + 1
            }
        })
    }, []);

    const childrenProps = {
        total,
        loadMoreData,
        keyword: searchParams.text,
    }

    const tabsList: TabsProps['items'] = [
        {
            key: 'all',
            label: '综合',
            children: activeKey === "all" ? <SearchAll data={allList} /> : <></>,
        },
        {
            key: 'post',
            label: '帖子',
            children: activeKey === "post" ? <SearchPost {...childrenProps} data={postList} /> : <></>,
        },
        {
            key: 'tag',
            label: '标签',
            children: activeKey === "tag" ? <SearchTag {...childrenProps} data={tagList} /> : <></>,
        },
        {
            key: 'picture',
            label: '图片',
            children: activeKey === "picture" ? <SearchPicture {...childrenProps} data={pictureList} /> : <></>,
        },
        {
            key: 'user',
            label: '用户',
            children: activeKey === "user" ? <SearchUser {...childrenProps} data={userList} /> : <></>,
        },
    ];

    /**
     * 加载搜索数据
     * @param params 搜索参数
     * @returns 
     */
    const loadData = async (params: SearchParamsType) => {
        const { type, text } = params;
        if (!type) {
            message.error("类别为空");
            return;
        }

        try {
            const query = {
                ...params,
                searchText: text,
                type: type
            }
            const res = await searchAllUsingPost(query);
            const dataList = res.data?.dataList || [];
            const resTotal = res.data?.total || 0;
            if (type === "all") {
                setAllList((prevData) => [...prevData, ...dataList]);
                setTotal(30);
            } else if (type === "tag") {
                setTagList((prevData) => [...prevData, ...dataList]);
                setTotal(resTotal);
            } else if (type === "post") {
                setPostList((prevData) => [...prevData, ...dataList]);
                setTotal(resTotal);
            } else if (type === "user") {
                setUserList((prevData) => [...prevData, ...dataList]);
                setTotal(resTotal);
            } else if (type === "picture") {
                setPictureList((prevData) => [...prevData, ...dataList]);
                setTotal(res.data?.total || 40);
            }

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
    }

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={60} style={{ zIndex: 1 }}>
            <DefaultTabBar {...props} style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(8px)" }} />
        </StickyBox>
    );

    const onChnage = (currentKey: string) => {
        window.scrollTo(0, 0); // 重置滚动位置到顶部
        setActiveKey(currentKey);
        resetList();
        router.push(`/search?query=${searchParamsObj.query}&type=${currentKey}`);
    }

    return (
        <div id="search-page" className="max-width-content">
            <Tabs
                renderTabBar={(props, DefaultTabBar) => {
                    return (
                        <div className='sticky-box'>
                            <DefaultTabBar {...props} />
                        </div>
                    )
                }}
                // renderTabBar={(props, DefaultTabBar) => {
                //     return (
                //         <Affix offsetTop={56}>
                //             <div className="affix-container">
                //                 <DefaultTabBar {...props} style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(8px)" }} />
                //             </div>
                //         </Affix>
                //     )
                // }}
                // renderTabBar={(props, DefaultTabBar) => {
                //     return (
                //         <DefaultTabBar {...props} style={{ background: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(8px)" }} />
                //     )
                // }}
                // renderTabBar={renderTabBar}
                activeKey={activeKey}
                items={tabsList}
                onChange={onChnage}
            />
        </div>
    )
}

export default SearchPage;