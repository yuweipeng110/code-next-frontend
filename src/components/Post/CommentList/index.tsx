import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Empty, List, message, Skeleton, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { listPostVoByPageUsingPost } from '@/api/postCommentController';
import MdViewer from '@/components/MdViewer';
import CommentReplyList from './components/CommentReplyList';
import AddComment from './components/AddComment';
import UserInfoCardPopover from '@/components/User/Popover';
import AuthorTag from './components/AuthorTag';
import CommentActions from './components/CommentActions';
import { DEFAULT_AVATAR } from '@/constants';
import "./index.css";

type Props = {
    // 帖子对象
    post: API.PostVO;
}

type CommentSearchParams = {
    current: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: string;
    postId?: string;
}

type LoadingPostCommentVO = {
    loading?: boolean;
} & API.PostCommentVO;

const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 10,
};

// 默认展示的回复数，大于这个数量则显示回复更多
const DEFAULT_SHOW_REPLY_NUM = 3;

/**
 * 帖子评论发布、评论列表、评论回复列表、添加回复评论、组件
 */
const PostCommentList: React.FC<Props> = React.memo((props) => {
    const { post } = props;

    // 评论列表加载中临时列表
    const [loadingCommentList, setLoadingCommentList] = useState([]);
    // 评论列表数据源
    const [commentList, setCommentList] = useState<LoadingPostCommentVO[]>([]);
    // 评论列表总数
    const [commentTotal, setCommentTotal] = useState<number>(0);
    // 评论列表首次是否加载中
    const [commentListInitLoading, setCommentListInitLoading] = useState<boolean>(true);
    // 评论列表是否加载中
    const [commentListLoading, setCommentListLoading] = useState<boolean>(true);
    // 评论搜索参数
    const [commentSearchParams, setCommentSearchParams] = useState<CommentSearchParams>(DEFAULT_PAGE_PARAMS);

    useEffect(() => {
        loadDataCommentList();
    }, [commentSearchParams]);

    /**
     * 加载更多数据 current + 1
     */
    const loadMoreData = () => {
        setCommentSearchParams(prev => {
            return {
                ...prev,
                current: prev.current + 1
            }
        });
    }

    /**
     * 加载评论数据
     * @param params 搜索参数
     * @returns 
     */
    const loadDataCommentList = async () => {
        if (!post.id) {
            return;
        }
        if (commentSearchParams.current === 1) {
            setCommentListInitLoading(true);
        }
        setCommentListLoading(true);
        // 向list中添加一个临时的loading 骨架需要
        setCommentList(
            loadingCommentList.concat([...new Array(DEFAULT_SHOW_REPLY_NUM)].map(() => ({ loading: true, name: {}, picture: {} }))),
        );
        try {
            const query = {
                ...commentSearchParams,
                postId: post.id as unknown as number,
            }
            const res = await listPostVoByPageUsingPost(query);
            const newData = [...loadingCommentList, ...res.data.records];
            setLoadingCommentList(newData);
            setCommentList(newData);
            setCommentTotal(res.data?.total);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
        if (commentSearchParams.current === 1) {
            setCommentListInitLoading(false);
        }
        setCommentListLoading(false);
    }

    /**
     * 加载更多视图
     */
    const loadMoreView = () => {
        // 剩余数量
        const replyRemainNum = commentTotal - commentList.length;

        if ((replyRemainNum > 0)) {
            return (
                <Button type="text" size="small" className="fetch-more-comment" onClick={loadMoreData}>
                    <div className="flex-box"><span>查看剩余{replyRemainNum}条回复</span><DownOutlined /></div>
                </Button>
            )
        }
        return null;
    }

    return (
        <Card
            tabList={[{
                key: 'comment',
                tab: `评论 ${commentListInitLoading ? "" : commentTotal}`,
            }]}
            className="comment-card"
            loading={commentListInitLoading}
        >
            <AddComment post={post} commentTotal={commentTotal} />
            <div style={{ marginBottom: 16 }} />
            <List
                className="comment-list"
                itemLayout="vertical"
                size="large"
                loadMore={loadMoreView()}
                loading={commentListLoading}
                dataSource={commentList}
                locale={{ emptyText: commentTotal === 0 ? <Empty style={{ padding: 20 }} /> : <></> }}
                renderItem={commentItem => (
                    <div>
                        <List.Item>
                            <Skeleton avatar title={false} loading={commentItem.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <UserInfoCardPopover userInfo={commentItem.user || null}>
                                            <Avatar src={commentItem.user?.userAvatar || DEFAULT_AVATAR} size={40} > U </Avatar>
                                        </UserInfoCardPopover>
                                    }
                                    title={
                                        <Space>
                                            <UserInfoCardPopover userInfo={commentItem.user || null}>
                                                {commentItem.user?.userName}
                                            </UserInfoCardPopover>
                                            {commentItem.userId === post.userId && <AuthorTag />}
                                        </Space>
                                    }
                                // description={item.description}
                                />
                                <MdViewer value={commentItem.content} isClamp />
                                <CommentActions comment={commentItem} loadDataCommentList={loadDataCommentList} />
                            </Skeleton>
                        </List.Item>
                        {commentItem.replyPage && commentItem.replyPage.total > 0 && <CommentReplyList post={post} comment={commentItem} />}
                    </div>
                )}
            />
        </Card>
    )
});

export default PostCommentList;