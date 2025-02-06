import React from 'react';
import { ShareAltOutlined, LikeFilled, StarFilled, WarningFilled, MessageFilled, FullscreenOutlined, UserOutlined, SettingOutlined, LogoutOutlined, WechatFilled, WeiboCircleFilled, QqOutlined } from '@ant-design/icons';
import './index.css';
import { Popover, QRCode } from 'antd';

const testShare = () => {

    const shareWechatQRCodeRender = () => {
        return (
            <div className='wechat-qrcode'>
                <QRCode size={80} bordered={false} value="https://www.baidu.com/" />
                <div className='wechat-qrcode-title'>微信扫码分享</div>
            </div>
        )
    }

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

    const shareRender = () => {
        return (
            <ul className='share-popup'>
                {shareList.map((item) => {
                    if (item.key === "share-wechat") {
                        return (
                            <Popover
                                classNames={{ body: 'wechat-qrcode-popover' }}
                                styles={{ body: { padding: 0 } }}
                                arrow={false}
                                placement="rightTop"
                                trigger={['click', 'hover']}
                                content={shareWechatQRCodeRender()}
                            >
                                <li key={item.key}>
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
        <div className='test-share'>
            {shareRender()}
        </div>
    )
}

export default testShare