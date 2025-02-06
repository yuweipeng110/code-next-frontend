import { useEffect, useState } from "react";
import { Avatar, Button, message, Tag } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { DEFAULT_AVATAR } from "@/constants";
import { ProCard } from "@ant-design/pro-components";
import "./index.css";
import { listUserVoByPageUsingPost } from "@/api/userController";

/**
 * 推荐用户Tag
 * 1.获取推荐用户列表
 * 2.关注用户
 * 3.不再推荐该用户
 */
const UsersRecommend = () => {

    const [recommendUserList, setRecommendUserList] = useState<API.UserVO[]>([]);

    const loadData = async () => {
        try {
            const query = {
                current: 1,
                pageSize: 8,
            };
            const res = await listUserVoByPageUsingPost(query);
            const dataList = res.data?.records || [];
            setRecommendUserList(dataList);

        } catch (error: any) {
            message.error('加载失败' + error.message);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleClose = (userId: string) => {
        const newRecommendUserList = recommendUserList.filter((item) => item.id !== userId);
        setRecommendUserList(newRecommendUserList);
        // const newTags = tags.filter((tag) => tag !== removedTag);
        // setTags(newTags);
    }


    // const loginUser = useSelector((state: RootState) => state.loginUser);

    // const [tags, setTags] = useState<string[]>(['Unremovable', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8']);

    // const handleClose = (removedTag: string) => {
    //     const newTags = tags.filter((tag) => tag !== removedTag);
    //     setTags(newTags);
    // }

    return (
        <div className='users-recommend'>
            <ProCard
                title="可能感兴趣的人"
                extra={
                    <span className="cursor-pointer">换一换</span>
                }
            >
                <ul className="user-list">
                    {recommendUserList.slice(0, 4).map<React.ReactNode>((user, index) => {
                        const tagElem = (
                            <Tag
                                key={user.id}
                                closable={index >= 0}
                                style={{ userSelect: 'none' }}
                                onClose={() => handleClose(user.id)}
                                rootClassName="recommend-users-tag"
                            >
                                <div className="recommend-users-card">
                                    <div className="user-avatar">
                                        <Avatar src={user.userAvatar || DEFAULT_AVATAR} size={48} />
                                    </div>
                                    <div className="username">
                                        {user.userName}
                                    </div>
                                    <div className="count">
                                        <span>55.7K点赞</span> <span >4.1M阅读</span>
                                    </div>
                                    <div className="reason">
                                        前端周榜TOP1作者
                                    </div>
                                    <div className="follow-btn">
                                        {
                                            index === 0 ?
                                                <Button type="primary" size="small" className="followed">查看主页</Button>
                                                :
                                                <Button type="primary" size="small">关注</Button>
                                        }
                                    </div>
                                </div>
                            </Tag>
                        );
                        return <li key={user.id}>{tagElem}</li>
                    })}
                </ul>
            </ProCard>
        </div>
    )
}

export default UsersRecommend;