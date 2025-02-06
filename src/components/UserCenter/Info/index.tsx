import { useEffect, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { EllipsisOutlined, FireOutlined, GithubOutlined, MailTwoTone, UserSwitchOutlined, WeiboOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Flex, Row, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { DEFAULT_AVATAR } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./index.css";

type Props = {
    userInfo: API.UserVO;
}

/**
 * 用户中心-个人信息
 */
const UserCenterInfo: React.FC<Props> = (props) => {

    const { userInfo } = props;

    const loginUser = useSelector((state: RootState) => state.loginUser);
    const router = useRouter();

    const userSettingsHref = "/user/settings";

    const introList = [
        "你的人生格言是什么？",
        "你的信仰是什么？",
        "你有哪些爱好？",
        "你的武器库有哪些武（ji）器（shu）？"
    ];

    // 介绍
    const [intro, setIntro] = useState(introList[0]);

    useEffect(() => {
        // 定义一个定时器，每5秒更新文本
        const intervalId = setInterval(() => {
            // 随机更新文本内容
            setIntro(prevQuote => {
                // 获取当前文本的索引，并切换到下一个文本
                const currentIndex = introList.indexOf(prevQuote);
                const nextIndex = (currentIndex + 1) % introList.length; // 轮流显示
                return introList[nextIndex];
            });
        }, 5000);

        // 清除定时器，以防组件卸载时没有清理
        return () => clearInterval(intervalId);
    }, []);

    /**
     * 个人介绍
     */
    const renderIntroduction = () => {
        if (userInfo.id !== loginUser.id) {
            return (
                <div>
                    <p className='position'>
                        <svg data-v-20db666e="" width="21" height="18" viewBox="0 0 21 18" className="icon position-icon"><g data-v-20db666e="" fill="none" fill-rule="evenodd"><path data-v-20db666e="" fill="#72777B" d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path><path data-v-20db666e="" stroke="#72777B" d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path></g></svg>
                        <span>公众号&Github：JavaGuide</span>
                    </p>
                    <p className='intro'>
                        <svg data-v-20db666e="" width="21" height="18" viewBox="0 0 21 18" className="icon intro-icon"><path data-v-20db666e="" fill="#72777B" fill-rule="evenodd" d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path></svg>
                        <span>用匠心敲代码，对每一行代码负责。</span>
                    </p>
                </div>
            )
        }
        return (
            <div>
                <p><Link href={userSettingsHref}>你从事什么职业？</Link></p>
                <p><Link href={userSettingsHref}>{intro}</Link></p>
            </div>
        )
    }

    /**
     * 操作按钮
     */
    const renderOperate = () => {
        if (userInfo.id !== loginUser.id) {
            return (
                <div className='operate-btn'>
                    {/* <Button type="primary" style={{ width: 88 }}>
                        关注
                    </Button> */}
                    <Button className="followed">
                        <UserSwitchOutlined className="user-icon" />
                    </Button>
                    <Button className='im-btn'>
                        <MailTwoTone style={{ color: "#c2c8d1" }} /> 私信
                    </Button>
                    <EllipsisOutlined className='cursor-pointer' />
                </div>
            )
        }
        return (
            <Button color="primary" variant="outlined" style={{ width: 100 }} onClick={() => { router.push(userSettingsHref) }}>
                设置
            </Button>
        )
    }

    return (
        <div className='user-center-info'>
            <ProCard className='user-info-card' split='vertical'>
                <Row>
                    <Col flex={0} style={{ marginRight: 30 }}>
                        <Avatar className='avatar' src={userInfo?.userAvatar || DEFAULT_AVATAR} size={90} />
                    </Col>
                    <Col flex={1}>
                        <Flex className="info-box" justify='space-between'>
                            <Typography.Title level={3} style={{ marginBottom: 0 }}>{userInfo.userName}</Typography.Title>
                            <Space size="middle">
                                <WeiboOutlined className="icon cursor-pointer" />
                                <GithubOutlined className="icon cursor-pointer" />
                                <Link href={userSettingsHref} title='设置个人主页地址'><FireOutlined className="icon cursor-pointer" /></Link>
                            </Space>
                        </Flex>
                        <Flex className="info-box">
                            {/* 等级icon */}
                            <img src="//lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/65a6a28f15d70e5a77bf881c5ec5340d.svg" />
                        </Flex>
                        <Flex className="info-box introduction" justify='space-between'>
                            {renderIntroduction()}
                            <Flex align='flex-end'>
                                {renderOperate()}
                            </Flex>
                        </Flex>
                    </Col>
                </Row>
            </ProCard>
        </div>
    )
}

export default UserCenterInfo;