"use client";
import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';
import NotificationSystem from './components/system';
import NotificationIm from './components/im';
import NotificationComment from './components/comment';
import NotificationDigg from './components/digg';
import NotificationFollow from './components/follow';
import './index.css';

/**
 * 通知页
 */
const NotificationPage = () => {
    const routeSearchParams = useSearchParams();
    const router = useRouter();
    const searchParamsObj = { type: routeSearchParams.get("type") || "comment" }

    useEffect(() => {
        setActiveKey(searchParamsObj.type);
    }, [searchParamsObj.type]);

    const [activeKey, setActiveKey] = useState<string>(searchParamsObj.type);

    const tabsList: TabsProps['items'] = [
        {
            key: 'comment',
            label: '评论',
            children: activeKey === "comment" && <NotificationComment />,
        },
        {
            key: 'digg',
            label: '赞和收藏',
            children: activeKey === "digg" && <NotificationDigg />,
        },
        {
            key: 'follow',
            label: '新增粉丝',
            children: activeKey === "follow" && <NotificationFollow />,
        },
        {
            key: 'im',
            label: '私信',
            children: activeKey === "im" && <NotificationIm />,
        },
        {
            key: 'system',
            label: '系统通知',
            children: activeKey === "system" && <NotificationSystem />,
        },
    ];

    const onChnage = (currentKey: string) => {
        window.scrollTo(0, 0); // 重置滚动位置到顶部
        setActiveKey(currentKey);
        // resetList();
        router.push(`/notification?type=${currentKey}`);
    }

    return (
        <div id="notification-page" className="max-width-content">
            <Tabs
                renderTabBar={(props, DefaultTabBar) => {
                    return (
                        <div className='sticky-box'>
                            <DefaultTabBar {...props} />
                        </div>
                    )
                }}
                activeKey={activeKey}
                items={tabsList}
                onChange={onChnage}
            />
        </div>
    )
}

export default NotificationPage;