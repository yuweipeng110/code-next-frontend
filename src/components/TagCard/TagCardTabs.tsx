"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { message, TabsProps } from 'antd';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';
import { listMyFollowTagByPageUsingPost } from '@/api/tagFollowController';
import { listTagVoByPageUsingPost1 } from '@/api/tagController';
import TagCard from '.';

type Type = "all" | "subscribed";

type ChildrenType = "newest" | "hottest";

type ParamsType = {
    type: Type;
    current: number;
    pageSize: number;
    sortField: string,
    sortOrder: string,
    searchUserId?: number,
}


const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 10,
};

/**
 * 标签卡片Tabs
 * @returns 
 */
const TagCardTabs = React.memo(() => {

    const loginUser = useSelector((state: RootState) => state.loginUser);

    const initParams: ParamsType = {
        type: "all",
        current: 1,
        pageSize: 16,
        sortField: "create_time",
        sortOrder: "descend",
    };

    const childrenInitParams: ChildrenType = "newest";

    const [activeKey, setActiveKey] = useState<Type>(initParams.type);
    const [childrenActiveKey, setChildrenActiveKey] = useState<ChildrenType>(childrenInitParams);

    const [dataList, setDataList] = useState<API.TagVO[]>([]);
    const [total, setTotal] = useState<number>(10);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useState<ParamsType>(initParams);

    /**
     * 重置列表数据
     */
    const resetList = () => {
        setDataList([]);
        setTotal(10);
    }

    /**
     * 监听搜索参数变化时加载数据
     */
    useEffect(() => {
        let params = searchParams;
        if (loginUser.id) {
            params = {
                ...params,
                searchUserId: loginUser.id as unknown as number
            }
        }
        loadData(params);
    }, [searchParams, loginUser]);

    /**
     * 加载更多数据 current + 1
     */
    const loadMoreData = () => {
        setSearchParams(prev => {
            return {
                ...prev,
                current: prev.current + 1
            }
        })
    };

    /**
     * 加载数据
     * @param params 搜索参数
     * @returns 
     */
    const loadData = async (params: ParamsType) => {
        try {
            if (params.type === "subscribed") {
                loadDataSubscribe(params);
                return;
            }
            const query = params;
            const res = await listTagVoByPageUsingPost1(query);
            const dataList = res.data?.records || [];
            const total = res.data?.total || 0;
            // setDataList(dataList);
            setDataList((prevData) => [...prevData, ...dataList]);
            setTotal(total);
            setIsSubscribed(false);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
    }

    /**
     * 加载数据(已关注的)
     * @param params 
     */
    const loadDataSubscribe = async (params: ParamsType) => {
        try {
            const query = params;
            const res = await listMyFollowTagByPageUsingPost(query);
            const dataList = res.data?.records || [];
            const total = res.data?.total || 0;
            // setDataList(dataList);
            setDataList((prevData) => [...prevData, ...dataList]);
            setTotal(total);
            setIsSubscribed(true);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
    }

    /**
     * 重新加载数据
     * @param type 
     * @param sort 
     */
    const reloadData = (type: Type, sort: ChildrenType = childrenInitParams) => {
        resetList();
        setSearchParams({
            ...initParams,
            searchUserId: loginUser.id as unknown as number,
            current: 1,
            type,
            sortField: sort === "newest" ? "create_time" : "view_num",
        })
    }

    const cardTabsView = (cardList: TabsProps['items'], isChildren: boolean = false) => {
        return (
            <ProCard
                headerBordered
                tabs={{
                    activeKey: isChildren ? childrenActiveKey : activeKey,
                    type: "line",
                    items: cardList?.map(({ key, label, children }) => {
                        return {
                            key,
                            label,
                            children
                        }
                    }),
                    onTabClick: (activeKey) => {
                        if (isChildren) {
                            setChildrenActiveKey(activeKey as ChildrenType);
                            reloadData("subscribed", activeKey as ChildrenType);
                        } else {
                            setActiveKey(activeKey as Type);
                            reloadData(activeKey as Type);
                        }
                    }
                }}
            />
        );
    };

    const childrenProps = {
        data: dataList,
        total,
        loadMoreData,
        isSubscribed
    }

    const tagCardTypeList: TabsProps['items'] = [
        {
            key: 'all',
            label: '全部标签',
            children: activeKey === "all" ? <TagCard {...childrenProps} /> : <></>,
        },
    ];

    // sort=key
    const tagCardTabList: TabsProps['items'] = [
        {
            key: 'newest',
            label: '最新',
            children: activeKey === "subscribed" ? <TagCard {...childrenProps} /> : <></>,
        },
        {
            key: 'hottest',
            label: '最热',
            children: activeKey === "subscribed" ? <TagCard {...childrenProps} /> : <></>,
        },
    ];

    /**
     * 如果用户登录了，
     */
    if (loginUser.id) {
        // 则添加一个已关注标签
        tagCardTypeList.push({
            key: 'subscribed',
            label: '已关注标签',
            children: activeKey === "subscribed" ? cardTabsView(tagCardTabList, true) : <></>,
        })
    }

    return (
        <div className="tag-card-tabs">
            {cardTabsView(tagCardTypeList)}
        </div>
    )
})

export default TagCardTabs;