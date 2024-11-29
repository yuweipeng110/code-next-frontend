"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Card, List, Image, Typography, Button, Skeleton, Empty, Space, message } from 'antd';
import InfiniteScrollComponent from '../InfiniteScrollComponent';
import { doTagFollowUsingPost } from '@/api/tagFollowController';
import "./index.css";

const listGrid = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 4,
};

type Props = {
    data: API.TagVO[];
    total: number;
    loadMoreData: () => void;
}

/**
 * 标签卡片
 */
const TagCard: React.FC<Props> = React.memo((props) => {
    const { data, total, loadMoreData } = props;

    const [currentExecuteId, setCurrentExecuteId] = useState<string>("");
    const [followedDataIdList, setFollowedDataIdList] = useState<string[]>([]);

    /**
     * 数据改变时 向关注数据ID列表添加 已关注的标签id
     */
    useEffect(() => {
        if (data) {
            setFollowedDataIdList(data.filter(item => item.follow).map(item => item.id || ""));
        }
    }, [data]);

    /**
     * 标签关注/取消
     * 
     * @param params 搜索参数
     * @returns 
     */
    const handleTagFollowed = async (tagId: string) => {
        if (!tagId) return;
        setCurrentExecuteId(tagId);
        try {
            const res = await doTagFollowUsingPost({ tagId: tagId as unknown as number });
            if (res.data === 1) { // 关注
                setFollowedDataIdList(prev => [...prev, tagId]);
            } else if (res.data === -1) { //取消关注
                setFollowedDataIdList(prev => prev.filter((item) => item !== tagId));
            }
        } catch (error: any) {
            message.error('更新失败，' + error.message);
        }
        setCurrentExecuteId("");
    }

    /**
     * 是否关注
     */
    const isFollowed = (tagId: string) => followedDataIdList.includes(tagId);

    /**
     * 获取当前关注数量
     */
    const getCurrentFollowCount = (tagItem: API.TagVO) => {
        return followedDataIdList.includes(tagItem.id) ? tagItem.followCount : tagItem.followCount - 1;
    }

    const cardView = (tagItem: API.TagVO) => {
        return (
            <ProCard
                layout="center"
                bordered
                style={{
                    padding: 20,
                    textAlign: 'center',
                }}
            >
                <Card.Meta
                    style={{
                        textAlign: 'center',
                    }}
                    avatar={
                        <Image src={tagItem.picture}
                            preview={false}
                            alt="logo" width={50} height={50}
                        />
                    }
                    title={
                        <Typography.Title style={{ paddingTop: 15 }} level={4}>
                            {tagItem.title}
                        </Typography.Title>
                    }
                    description={
                        <Typography.Paragraph
                            type="secondary"
                            ellipsis={{ rows: 1 }}
                            style={{ marginBottom: 0 }}
                        >
                            <p>
                                <Typography.Text>
                                    {getCurrentFollowCount(tagItem)} 关注  {tagItem.postCount} 文章
                                </Typography.Text>
                            </p>
                            {
                                currentExecuteId === tagItem.id ? (
                                    <Button className={`subscribe-btn ${isFollowed ? 'subscribed' : ''}`} loading />
                                ) : (
                                    <Button
                                        className={`subscribe-btn ${isFollowed ? 'subscribed' : ''}`}
                                        onClick={() => handleTagFollowed(tagItem.id)}
                                    >
                                        {isFollowed ? '已关注' : '关注'}
                                    </Button>
                                )
                            }

                        </Typography.Paragraph>
                    }
                />
            </ProCard>
        )
    }

    const listView = () => {
        return (
            <List
                grid={listGrid}
                locale={{ emptyText: total === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                dataSource={data}
                renderItem={(item) => <List.Item>{cardView(item)}</List.Item>}
            />
        );
    }

    const loaderView = () => {
        return (
            <List
                grid={listGrid}
                dataSource={Array.from({ length: 8 }, () => ({}))}
                renderItem={(item) =>
                    <List.Item>
                        <Card bordered>
                            <Card.Meta
                                style={{
                                    textAlign: 'center',
                                }}
                            />
                            <Space direction="vertical" className="space-skeleton">
                                <Skeleton.Avatar active size={50} shape="circle" />
                                <Skeleton.Button active size="small" />
                                <Skeleton.Button active size="small" block />
                                <Skeleton.Button active size="large" />
                            </Space>
                        </Card>
                    </List.Item>
                }
            />
        )
    }

    return (
        <div className="tag-card">
            <InfiniteScrollComponent
                // data={data}
                dataLength={data.length}
                total={total}
                loadMoreData={loadMoreData}
                loader={loaderView()}
                children={listView()}
            />
        </div>
    )
})

export default TagCard;