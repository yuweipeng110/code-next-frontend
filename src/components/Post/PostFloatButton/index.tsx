import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { Avatar, FloatButton, message, Popover, QRCode } from 'antd';
import { ShareAltOutlined, LikeFilled, StarFilled, WarningFilled, MessageFilled, FullscreenOutlined, WechatFilled, WeiboCircleFilled, QqOutlined } from '@ant-design/icons';
import { doThumbUsingPost2 } from '@/api/postThumbController';
import { doPostFavourUsingPost } from '@/api/postFavourController';
import { DEFAULT_AVATAR } from '@/constants';
import "./index.css";

type Props = {
    //帖子对象
    postObject: API.PostVO;
    //是否沉浸
    immerse: boolean;
    //设置是否沉浸
    setImmerse: (immerse: boolean) => void;
}

/**
 * 用于生成带有徽章的 FloatButton
 */
const BadgeFloatButton: React.FC<{ icon: React.ReactElement, tooltip: string, badgeCount: number, badgeColor: string, iconColor: string, onClick?: () => void }> = ({ icon, tooltip, badgeCount, badgeColor, iconColor, onClick }) => (
    <FloatButton
        icon={React.cloneElement(icon, { style: { color: iconColor } })}
        tooltip={tooltip}
        badge={{ count: badgeCount, color: badgeColor }}
        onClick={onClick}
    />
);

/**
 * 帖子悬浮按钮 组件
 * TODO 
 * 1.移动出UserCardSection范围外，显示一个FloatButton
 * 2.2个 接口调用（点赞、收藏）✅
 * 3.悬浮框2个按钮的功能 (举报反馈、沉浸阅读)
 */
const PostFloatButton: React.FC<Props> = React.memo((props) => {
    const { postObject, immerse, setImmerse } = props;
    const loginUser = useSelector((state: RootState) => state.loginUser);

    // 是否点赞
    const [isThumb, setIsThumb] = useState<boolean>(false);
    // 是否收藏
    const [isFavour, setIsFavour] = useState<boolean>(false);
    // 是否显示悬浮框
    const [userFloatBtnVisible, setUserFloatBtnVisible] = useState(false);

    // 监听滚动事件
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setUserFloatBtnVisible(true);
            } else {
                setUserFloatBtnVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 清理事件监听器
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (postObject) {
            setIsThumb(postObject.hasThumb);
            setIsFavour(postObject.hasFavour);
        }
    }, [postObject]);

    const defalutColor = "#8a919f";

    /**
     * 点赞按钮
     */
    const likeFloatButton = useCallback(() => {
        const activeColor = isThumb ? "#1677ff" : defalutColor;
        return (
            <BadgeFloatButton
                icon={<LikeFilled />}
                tooltip="点赞 (快捷键: Z)"
                badgeCount={isThumb ? postObject.thumbNum + 1 : postObject.thumbNum ?? 0}
                badgeColor={activeColor}
                iconColor={activeColor}
                onClick={() => handleUserThumb(loginUser.id as unknown as string)}
            />
        );
    }, [postObject, isThumb]);

    /**
     * 收藏按钮
     */
    const shareFloatButton = useCallback(() => {
        const activeColor = isFavour ? "#ffb800" : defalutColor;
        return (
            <BadgeFloatButton
                icon={<StarFilled />}
                tooltip="收藏 (快捷键: C)"
                badgeCount={isFavour ? postObject.favourNum + 1 : postObject.favourNum ?? 0}
                badgeColor={activeColor}
                iconColor={activeColor}
                onClick={() => handleUserFavour(loginUser.id as unknown as string)}
            />
        );
    }, [postObject, isFavour]);

    /**
     * 沉浸按钮
     */
    const immerseFloatButton = useCallback(() => {
        const activeColor = immerse ? "#1677ff" : defalutColor;
        const tooltip = immerse ? "退出沉浸" : "沉浸阅读(快捷键 H)";
        return (
            <FloatButton icon={<FullscreenOutlined style={{ color: activeColor }} />} tooltip={tooltip} onClick={() => setImmerse(!immerse)} />
        )
    }, [immerse]);

    /**
     * 跳转到评论区
     */
    const scrollToCommentSection = () => {
        const section = document.getElementById('comment-list-card');
        if (section) {
            window.scrollTo({ top: section.offsetTop - 10, behavior: 'smooth' });
        }
    };

    /**
     * 用户点赞/取消
     * @param userId 
     * @returns 
     */
    const handleUserThumb = async (userId: string) => {
        if (!userId) return;
        try {
            const res = await doThumbUsingPost2({ postId: postObject.id as unknown as number });
            if (res.data === 1) { // 关注
                setIsThumb(true);
                message.success('点赞成功');
            } else if (res.data === -1) { //取消关注
                setIsThumb(false);
                message.success('取消点赞成功');
            }
        } catch (error: any) {
            message.error('失败，' + error.message);
        }
    }

    /**
     * 用户收藏/取消
     * @param userId 
     * @returns 
     */
    const handleUserFavour = async (userId: string) => {
        if (!userId) return;
        try {
            const res = await doPostFavourUsingPost({ postId: postObject.id as unknown as number });
            if (res.data === 1) {
                setIsFavour(true);
                message.success('收藏成功');
            } else if (res.data === -1) { //取消关注
                setIsFavour(false);
                message.success('取消收藏成功');
            }
        } catch (error: any) {
            message.error('失败，' + error.message);
        }
    }

    /**
     * 分享微信二维码渲染
     */
    const shareWechatQRCodeRender = () => {
        return (
            <div className='wechat-qrcode'>
                <QRCode size={80} bordered={false} value="https://www.baidu.com/" />
                <div className='wechat-qrcode-title'>微信扫码分享</div>
            </div>
        )
    }

    /**
     * 分享列表
     */
    const shareList = [
        {
            key: "share-wechat",
            icon: <WechatFilled className='share-icon sprite-icon' />,
            label: "微信",
        },
        {
            key: "share-weibo",
            icon: <WeiboCircleFilled className='share-icon sprite-icon' />,
            label: "新浪微博"
        },
        {
            key: "share-qq",
            icon: <QqOutlined className='share-icon sprite-icon' />,
            label: "QQ"
        },
    ];

    /**
     * 分享渲染
     */
    const shareRender = () => {
        return (
            <ul className='share-popup'>
                {shareList.map((item) => {
                    if (item.key === "share-wechat") {
                        return (
                            <Popover
                                key={item.key}
                                classNames={{ body: 'wechat-qrcode-popover' }}
                                styles={{ body: { padding: 0 } }}
                                arrow={false}
                                placement="right"
                                trigger={['click', 'hover']}
                                content={shareWechatQRCodeRender()}
                            >
                                <li>
                                    {item.icon} <div className='share-title'>{item.label}</div>
                                </li>
                            </Popover>
                        )
                    }
                    return (
                        <li key={item.key}>
                            {item.icon} <div className='share-title'>{item.label}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <FloatButton.Group rootClassName="post-float-button" className="post-float-button" shape="circle">
            {
                !immerse && (
                    <>
                        {
                            userFloatBtnVisible && (
                                <FloatButton
                                    rootClassName='user-float-btn'
                                    icon={<Avatar src={postObject.user.userAvatar || DEFAULT_AVATAR}
                                        style={{ fontSize: 48, width: 48, height: 48 }} />}
                                    onClick={() => {
                                        // router.push(`/user/${postObject.userId}`);
                                        window.open(`/user/${postObject.userId}`, '_blank');
                                    }}
                                />
                            )
                        }
                        {likeFloatButton()}
                        <FloatButton icon={<MessageFilled style={{ color: defalutColor }} />} tooltip="跳转到评论区 (快捷键: X)" onClick={scrollToCommentSection} />
                        {shareFloatButton()}
                        <Popover classNames={{ body: 'share-popover' }} styles={{ body: { padding: 0 } }} placement="right" trigger={['click', 'hover']} content={shareRender} >
                            <FloatButton icon={<ShareAltOutlined style={{ color: defalutColor }} />} tooltip="分享（快捷键 V）" />
                        </Popover>
                        <FloatButton icon={<WarningFilled style={{ color: defalutColor }} />} tooltip="举报反馈" />
                    </>
                )
            }
            {immerseFloatButton()}
        </FloatButton.Group>
    )
})

export default PostFloatButton;