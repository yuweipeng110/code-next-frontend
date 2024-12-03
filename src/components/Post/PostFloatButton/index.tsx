import React, { useCallback } from 'react';
import { FloatButton } from 'antd';
import { ShareAltOutlined, LikeFilled, StarFilled, WarningFilled, MessageFilled, FullscreenOutlined } from '@ant-design/icons';
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
const BadgeFloatButton: React.FC<{ icon: React.ReactElement, tooltip: string, badgeCount: number, badgeColor: string, iconColor: string }> = ({ icon, tooltip, badgeCount, badgeColor, iconColor }) => (
    <FloatButton
        icon={React.cloneElement(icon, { style: { color: iconColor } })}
        tooltip={tooltip}
        badge={{ count: badgeCount, color: badgeColor }}
    />
);

/**
 * 帖子悬浮按钮 组件
 * TODO 
 * 1.移动出UserCardSection范围外，显示一个FloatButton
 * 2.2个 接口调用（点赞、收藏）
 * 3.悬浮框3个按钮的功能
 */
const PostFloatButton: React.FC<Props> = React.memo((props) => {
    const { postObject, immerse, setImmerse } = props;

    const defalutColor = "#8a919f";

    /**
     * 点赞按钮
     */
    const likeFloatButton = useCallback(() => {
        const activeColor = postObject.hasThumb ? "#1677ff" : defalutColor;
        return (
            <BadgeFloatButton
                icon={<LikeFilled />}
                tooltip="点赞 (快捷键: Z)"
                badgeCount={postObject.thumbNum ?? 0}
                badgeColor={activeColor}
                iconColor={activeColor}
            />
        );
    }, [postObject]);

    /**
     * 收藏按钮
     */
    const shareFloatButton = useCallback(() => {
        const activeColor = postObject.hasFavour ? "#FADB14" : defalutColor;
        return (
            <BadgeFloatButton
                icon={<StarFilled />}
                tooltip="收藏 (快捷键: C)"
                badgeCount={postObject.favourNum ?? 0}
                badgeColor={activeColor}
                iconColor={activeColor}
            />
        );
    }, [postObject]);

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

    return (
        <FloatButton.Group className="post-float-button" shape="circle">
            {
                !immerse && (
                    <>
                        {likeFloatButton()}
                        <FloatButton icon={<MessageFilled style={{ color: defalutColor }} />} tooltip="跳转到评论区 (快捷键: X)" />
                        {shareFloatButton()}
                        <FloatButton icon={<ShareAltOutlined style={{ color: defalutColor }} />} tooltip="分享（快捷键 V）" />
                        <FloatButton icon={<WarningFilled style={{ color: defalutColor }} />} tooltip="举报反馈" />
                    </>
                )
            }
            {immerseFloatButton()}
        </FloatButton.Group>
    )
})

export default PostFloatButton;