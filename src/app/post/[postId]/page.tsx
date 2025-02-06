"use client";
import React, { useEffect, useState } from 'react';
import { Affix, Button, Flex, Layout, message } from 'antd';
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import { CaretRightFilled, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { generateItemsRecursive } from "@/utils/tool";
import { useParams } from 'next/navigation';
import { getPostVoUsingGet } from '@/api/postController';
import PostCard from '@/components/Post/Card';
import PostCommentList from '@/components/Post/CommentList';
import UserCardSection from '@/components/User/Card';
import PostCardList from '@/components/Post/Card/PostCardList';
import PostCardAnchor from '@/components/Post/Card/PostCardAnchor';
import PostFloatButton from '@/components/Post/PostFloatButton';
import "./index.css";

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
                '.markdown-body :where(h1, h2, h3, h4)',
            );
            // console.log('tocLinks', tocLinks);
            // console.log('headings', headings);
            setAnchorItems(generateItemsRecursive(headings));
        }
    }, [postObj]);

    return (
        <div id="post-page" className="max-width-content-1">
            <Flex gap={24}>
                <Layout.Content>
                    <div style={{ marginBottom: 16 }} />
                    <PostCard postObject={postObj} postLoading={postLoading} />
                    <div style={{ marginBottom: 16 }} />
                    {
                        Object.keys(postObj).length > 0 && (
                            <PostCommentList post={postObj} />
                        )
                    }
                </Layout.Content>
                <Layout.Sider className="post-list-sider" collapsible collapsed={siderCollapsed} trigger={null} collapsedWidth={20} width={300} style={{ padding: 0, background: "none" }}>
                    <div className="sider-bar">
                        <Button className="collapse-btn" onClick={() => {
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
                                {Object.keys(postObj).length > 0 && <UserCardSection userLoading={postLoading} postObject={postObj} />}
                                <div style={{ marginBottom: 16 }} />
                                <Affix offsetTop={60}>
                                    <div>
                                        {anchorItems.length > 0 && (
                                            <>
                                                <PostCardAnchor anchorItems={anchorItems} />
                                                <div style={{ marginBottom: 16 }} />
                                            </>
                                        )}
                                        <PostCardList data={[]} title="相关推荐" loading={false} />
                                    </div>
                                </Affix>
                                <div style={{ marginBottom: 16 }} />
                                <PostCardList data={[]} title="精选内容" loading={false} />
                            </>
                        )
                    }
                </Layout.Sider>
            </Flex>
            <PostFloatButton postObject={postObj} immerse={immerse} setImmerse={setImmerse} />
        </div>
    )
}

export default PostPage;