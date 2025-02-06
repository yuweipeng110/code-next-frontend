import { useState } from 'react';
import { Flex } from 'antd';
import UserCenterDetailListFollowUsers from './Users';
import UserCenterDetailListFollowTags from './Tags';
import UserCenterDetailListFollowColumn from './Column';
import UserCenterDetailListFollowTeams from './Teams';
import UserCenterDetailListFollowFans from './Fans';
import "./index.css";

const tabsData = [
    {
        key: 'followUsers',
        label: '关注的用户',
        component: UserCenterDetailListFollowUsers,
    },
    {
        key: 'followTeams',
        label: '关注的团队',
        component: UserCenterDetailListFollowTeams,
    },
    {
        key: 'followFans',
        label: '粉丝',
        component: UserCenterDetailListFollowFans,
    },
    {
        key: 'followColumn',
        label: '订阅的专栏',
        component: UserCenterDetailListFollowColumn,
    },
    {
        key: 'followTags',
        label: '关注标签',
        component: UserCenterDetailListFollowTags,
    },
];

/**
 * 用户中心-明细列表-关注
 */
const UserCenterDetailListFollow = () => {
    const [selectedTab, setSelectedTab] = useState<string>(tabsData[0].key);

    const renderContentView = () => {
        const TabComponent = tabsData.find(tab => tab.key === selectedTab)?.component;
        return TabComponent ? <TabComponent /> : null;
    };

    return (
        <div className='user-center-detail-list-follow'>
            <Flex className='sub-header' align='center'>
                <div className="sub-header-title">关注</div>
                <div className='sub-type-box'>
                    {tabsData.map(tabItem => (
                        <a
                            key={tabItem.key}
                            className={tabItem.key === selectedTab ? "active" : ""}
                            onClick={() => setSelectedTab(tabItem.key)}
                        >
                            {tabItem.label}
                        </a>
                    ))}
                </div>
            </Flex>
            {renderContentView()}
        </div>
    );
};

export default UserCenterDetailListFollow;