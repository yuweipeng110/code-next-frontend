import React from 'react';
import { Card, List } from 'antd';
import "./postCardList.css";

type Props = {
    data: API.PostVO[];
    title: string;
    loading: boolean;
}

/**
 * 帖子卡片列表
 * @param props 
 * @returns 
 */
const PostCardListSection: React.FC<Props> = (props) => {
    const { data, title = "", loading = true } = props;

    return (
        <div className="post-card-section">
            <Card
                title={title}
                loading={loading}
            >
                <List
                    size="small"
                    itemLayout="vertical"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item key={index} >
                            <List.Item.Meta
                                title={item.title}
                                description={
                                    <>
                                        <div className="entry-meta" >{item.user?.userName}</div>
                                        <div className="entry-meta">&nbsp;·&nbsp;</div>
                                        <div className="entry-meta" >{item.viewNum}阅读</div>
                                        <div className="entry-meta">&nbsp;·&nbsp;</div>
                                        <div className="entry-meta">{item.thumbNum}点赞</div>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}

export default PostCardListSection;