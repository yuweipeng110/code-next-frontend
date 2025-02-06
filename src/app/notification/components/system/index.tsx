"use client";
import React, { memo } from 'react';
import { Avatar, Card, List, Skeleton } from 'antd';
import InfiniteScrollComponent from '@/components/InfiniteScrollComponent';
import { DEFAULT_AVATAR } from '@/constants';
import moment from 'moment';
import './index.css';

const data = [
    '语雀的天空',
    'Ant Design',
    '蚂蚁金服体验科技',
    '你的文章 文章11 未通过审核， 详细规则请见  社区规范',
    '「1024 码上奇妙夜」直播活动即将登场！直播期间超多轮万元大奖等你来抽，可赢泰国全家跟团游，iPhone16 Pro、Ola Friend 智能耳机及Apple Watch10等重磅好礼。点击链接预约直播，还有机会领取邀请好礼。',
    'Bigfish',
    'Umi',
    'Ant Design Pro',
].map((item) => ({
    title: item,
    subTitle: "文章内容: 内容格式有误，建议自查是否带有非主体类少数民族文字/外文，可新增译文",
    actions: [<a key="run">邀请</a>, <a key="delete">删除</a>],
    avatar:
        'https://p26-passport.byteacctimg.com/img/user-avatar/7f43ce2baa99baf2d4d989f890cf81c7~180x180.awebp',
    content: "文章内容: 内容格式有误，建议自查是否带有非主体类少数民族文字/外文，可新增译文",
    description: "文章内容: 内容格式有误，建议自查是否带有非主体类少数民族文字/外文，可新增译文",
    desc: "desc",
}));

/**
 * 通知-系统通知
 */
const NotificationSystem: React.FC = memo(() => {
    const total = 10;

    const loadMoreData = () => { }

    return (
        <div className='notification-system'>
            <InfiniteScrollComponent
                dataLength={data.length}
                total={total}
                loadMoreData={loadMoreData}
                loader={
                    [...Array(4)].map((_, index) => (
                        <List key={index} >
                            <List.Item>
                                <Skeleton
                                    key={index}
                                    active
                                    avatar
                                    title
                                    paragraph={{ rows: 2 }}
                                    style={{ padding: 20 }}
                                />
                            </List.Item>
                        </List>
                    ))
                }
            >
                <List
                    dataSource={data}
                    locale={{ emptyText: total === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                    renderItem={(item, index) => (
                        <List.Item key={index} style={{ padding: 20 }}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar || DEFAULT_AVATAR} size={35} />}
                                title={
                                    <div className='title'>
                                        {item.title}
                                    </div>
                                }
                                description={
                                    <div style={{ marginTop: 10 }}>
                                        <div>{item.description}</div>
                                        <div style={{ marginTop: 10 }}>{moment().fromNow()}</div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </InfiniteScrollComponent>
        </div>
    )
})

export default NotificationSystem;