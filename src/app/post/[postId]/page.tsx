"use client";
import React, { useEffect, useState } from 'react';
import { Affix, Avatar, Button, Flex, FloatButton, Layout, message } from 'antd';
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import { CaretRightFilled, DeleteOutlined, DoubleLeftOutlined, DoubleRightOutlined, EllipsisOutlined, LikeOutlined, MessageOutlined, MessageTwoTone, QuestionCircleOutlined, SyncOutlined, WarningOutlined } from '@ant-design/icons';
import { generateItemsRecursive } from "@/utils/tool";
import PostCard from '@/components/Post/Card';
import { listPostVoByPageUsingPost } from '@/api/postCommentController';
import { useParams } from 'next/navigation';
import { getPostVoUsingGet } from '@/api/postController';
import PostCommentList from '@/components/Post/CommentList';
import "./index.css";
import UserCardSection from '@/components/User/Card';
import PostCardList from '@/components/Post/Card/PostCardList';
import PostCardAnchor from '@/components/Post/Card/PostCardAnchor';
import PostFloatButton from '@/components/Post/PostFloatButton';
import SuspensionPanel from '@/components/SuspensionPanel';

type ParamsType = {
    current: number;
    pageSize: number;
    sortField: string;
    sortOrder: string;
    searchUserId?: number;
    postId?: string;
}

/**
 * 帖子详情
 * @returns 
 */
const PostPage = () => {
    let { postId } = useParams();

    const [immerse, setImmerse] = useState<boolean>(false);

    // 帖子相关
    const [postObj, setPostObj] = useState<API.PostVO>(Object.create(null));
    const [postLoading, setPostLoading] = useState<boolean>(true);

    useEffect(() => {
        loadDataPost();
    }, [postId]);

    /**
     * 加载帖子数据
     * @param params 搜索参数
     * @returns 
     */
    const loadDataPost = async () => {
        setPostLoading(true);
        try {
            const query = { id: postId as unknown as number };
            const res = await getPostVoUsingGet(query);
            if (res.data) {
                setPostObj(res.data);
            }
        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
        setPostLoading(false);
    }

    // 控制layout的侧边栏是否折叠
    const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);
    // 目录items
    const [anchorItems, setAnchorItems] = useState<AnchorLinkItemProps[]>([]);

    React.useEffect(() => {
        if (postObj) {
            const headings = document.querySelectorAll<HTMLElement>(
                '.markdown-body :where(h2, h3, h4)',
            );
            // console.log('tocLinks', tocLinks);
            // console.log('headings', headings);
            setAnchorItems(generateItemsRecursive(headings));
        }
    }, [postObj]);

    // 评论相关
    const initParams: ParamsType = {
        current: 1,
        pageSize: 8,
        sortField: "create_time",
        sortOrder: "descend",
    };

    const [commentDataList, setCommentDataList] = useState<API.TagVO[]>([]);
    const [commentTotal, setCommentTotal] = useState<number>(0);

    const [searchParams, setSearchParams] = useState<ParamsType>(initParams);

    /**
     * 重置列表数据
     */
    const resetList = () => {
        setCommentDataList([]);
        setCommentTotal(10);
    }

    /**
     * 监听搜索参数变化时加载数据
     */
    useEffect(() => {
        loadDataPostCommentList(searchParams);
    }, [searchParams]);

    /**
     * 加载评论更多数据 current + 1
     */
    const loadMoreDataCommentList = () => {
        setSearchParams(prev => {
            return {
                ...prev,
                current: prev.current + 1
            }
        })
    };

    /**
     * 加载评论数据
     * @param params 搜索参数
     * @returns 
     */
    const loadDataPostCommentList = async (params: ParamsType) => {
        try {
            const query = {
                ...params,
                postId: postId as unknown as number,
            };
            const res = await listPostVoByPageUsingPost(query);
            const dataList = res.data?.records || [];
            const total = res.data?.total || 0;
            // setDataList(dataList);
            setCommentDataList((prevData) => [...prevData, ...dataList]);
            setCommentTotal(total);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
    }

    return (
        <div id="post-page" className="max-width-content-1">
            <Flex gap={24}>
                <Layout.Content>
                    <div style={{ marginBottom: 16 }} />
                    {/* <PostCard postObject={postObj} postLoading={postLoading} /> */}
                    <div style={{ marginBottom: 16 }} />
                    <PostCommentList commentDataList={commentDataList} commentTotal={commentTotal} loadMoreDataCommentList={loadMoreDataCommentList} postCurrent={{}} />
                </Layout.Content>
                <Layout.Sider className="post-list-sider" collapsible collapsed={siderCollapsed} trigger={null} collapsedWidth={20} width={300} style={{ padding: 0, background: "none" }}>
                    {/* <div className="sider-bar">
                        <Button className="collapse-btn" onClick={() => {
                            console.log('xxxx');
                            setSiderCollapsed(!siderCollapsed)
                        }} >
                            <CaretRightFilled className="icon" />
                        </Button>
                    </div>
                    {
                        siderCollapsed ? (
                            <DoubleLeftOutlined onClick={() => setSiderCollapsed(!siderCollapsed)} />
                        ) : (
                            <>
                                <DoubleRightOutlined onClick={() => setSiderCollapsed(!siderCollapsed)} />
                                <UserCardSection userLoading={postLoading} userObject={postObj.user || Object.create(null)} />
                                <div style={{ marginBottom: 16 }} />
                                <Affix offsetTop={60}>
                                    <div>
                                        <PostCardAnchor anchorItems={anchorItems} />
                                    </div>
                                    <div style={{ marginBottom: 16 }} />
                                    <PostCardList data={[]} title="相关推荐" loading={false} />
                                </Affix>
                                <div style={{ marginBottom: 16 }} />
                                <PostCardList data={[]} title="精选内容" loading={false} />
                            </>
                        )
                    } */}
                </Layout.Sider>
            </Flex>
            {/* <PostFloatButton postObject={postObj} immerse={immerse} setImmerse={setImmerse} /> */}
            {/* <SuspensionPanel /> */}
        </div>
    )
}

export default PostPage;