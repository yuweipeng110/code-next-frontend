import { useState } from 'react';
import { ProCard, ProCardTabsProps } from '@ant-design/pro-components';
import { Empty, Input, TabsProps } from 'antd';
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import UserCenterDetailListPost from './Post';
import UserCenterDetailListFollow from './Follow';
import UserCenterDetailListColumn from './Column';
import UserCenterDetailListCollections from './Collections';
import UserCenterDetailListThumb from './Thumb';
import UserCenterDetailListSearchAll from './Search/All';
import UserCenterDetailListSearchRelease from './Search/Release';
import UserCenterDetailListSearchThumb from './Search/Thumb';
import UserCenterDetailListSearchFavour from './Search/Favour';
import "./index.css";

/**
 * 用户中心-明细列表
 */
const UserCenterDetailList = () => {

    const items: TabsProps['items'] = [
        { key: 'dynamic', label: '动态', children: 'Content of Tab Pane 1' },
        { key: 'post', label: '帖子', children: <UserCenterDetailListPost /> },
        { key: 'column', label: '专栏', children: <UserCenterDetailListColumn /> },
        // { key: 'short', label: '沸点', children: 'Content of Tab Pane 3' },
        { key: 'collections', label: '收藏集', children: <UserCenterDetailListCollections /> },
        { key: 'follow', label: '关注', children: <UserCenterDetailListFollow /> },
        // { key: 'bot', label: '作品', children: 'Content of Tab Pane 3' },
        { key: 'thumb', label: '点赞', children: <UserCenterDetailListThumb /> },
    ];

    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [searchTabs, setSearchTabs] = useState<ProCardTabsProps>(null);

    const searchTabsItems: TabsProps['items'] = [
        { key: 'all', label: '全部', children: <UserCenterDetailListSearchAll /> },
        { key: 'release', label: '发布', children: <UserCenterDetailListSearchRelease /> },
        { key: 'thumb', label: '点赞', children: <UserCenterDetailListSearchThumb /> },
        { key: 'favour', label: '收藏', children: <UserCenterDetailListSearchFavour /> },
    ];

    const handleChangeSearchOpen = () => {
        setSearchOpen(!searchOpen);
        if (!searchOpen) {
            setSearchInputValue("");
            setSearchTabs(null);
        }
    }

    const handleSearchInputEnter = () => {
        if (searchInputValue.length <= 0) {
            return;
        }
        setSearchTabs({
            items: searchTabsItems,
            size: "large"
        })
    }

    return (
        <div className='user-center-detail-list'>
            {
                searchOpen ? (
                    <ProCard
                        className='search-pro-card'
                        headerBordered
                        subTitle={
                            <div className='return-content'>
                                <span className='return' onClick={handleChangeSearchOpen}><LeftOutlined /> 返回</span>
                                <span>搜索</span>
                            </div>
                        }
                        extra={
                            <div className='search-icon-container'>
                                <Input
                                    className='search-input'
                                    placeholder='搜索 发布/点赞/收藏的文章'
                                    suffix={
                                        <SearchOutlined
                                            className={`search-icon ${searchInputValue.length > 0 ? 'search-icon-active' : ''}`}
                                            style={{ marginRight: 0 }}
                                            onClick={handleSearchInputEnter} />
                                    }
                                    onPressEnter={handleSearchInputEnter}
                                    onChange={(e) => setSearchInputValue(e.target.value)}
                                />
                            </div>
                        }
                        tabs={searchTabs}
                    >
                        <Empty description="输入关键词，找找 TA 发布/点赞/收藏的文章~" style={{ padding: "40px 0" }} />
                    </ProCard>
                ) : (
                    <ProCard
                        tabs={{
                            tabBarExtraContent: <SearchOutlined className='search-icon' onClick={handleChangeSearchOpen} />,
                            items: items,
                            indicator: { size: (origin) => origin - 15, align: "center" },
                            size: "large"
                        }}
                    />
                )
            }
        </div>
    )
}

export default UserCenterDetailList;