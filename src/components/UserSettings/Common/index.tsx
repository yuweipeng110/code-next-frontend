import React from 'react';
import { CheckCard, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { getTheme, setTheme } from '@/utils/utils';
import "./index.css";

/**
 * 用户设置（通用设置）
 */
const UserSettingCommon: React.FC = () => {

    return (
        <div className="user-setting-common">
            <ProCard
                title={<h3>通用设置</h3>}
                headerBordered
            >
                <Typography.Title level={5}>页面设置</Typography.Title>
                <Typography.Text type="secondary">该设置仅在当前浏览器生效，目前已支持部分核心页面，更多页面适配持续进行中，如有建议可点击页面右下角反馈</Typography.Text>
                <div style={{ marginBottom: 16 }} />

                <CheckCard.Group className="check-card-group" defaultValue={getTheme()} onChange={(checkedValue) => { setTheme(checkedValue.toString(), false) }}>
                    <CheckCard
                        value="light"
                        cover={
                            <ProCard className="skeleton-card">
                                <div className="mode-skeleton mode-skeleton-light">
                                    <div className="skeleton-item"></div>
                                    <div className="skeleton-item"></div>
                                    <div className="skeleton-item"></div>
                                    <div className="skeleton-item"></div>
                                </div>
                                <div className="skeleton-title">
                                    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"></path></svg>
                                    浅色模式
                                </div>
                            </ProCard>
                        }
                    />
                    <CheckCard
                        value="dark"
                        cover={
                            <ProCard className="skeleton-card">
                                <div className="mode-skeleton mode-skeleton-dark">
                                    <div className="skeleton-item"></div>
                                    <div className="skeleton-item"></div>
                                    <div className="skeleton-item"></div>
                                    <div className="skeleton-item"></div>
                                </div>
                                <div className="skeleton-title">
                                    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z"></path></svg>
                                    深色模式
                                </div>
                            </ProCard>
                        }
                    />
                    <CheckCard
                        value="isFollowSystem"
                        cover={
                            <ProCard className="skeleton-card">
                                <div className="mode-skeleton-auto">
                                    <div className="common-skeleton mode-auto-skeleton">
                                        <div className="skeleton-item"></div>
                                        <div className="skeleton-item"></div>
                                        <div className="skeleton-item"></div>
                                        <div className="skeleton-item"></div>
                                    </div>
                                    <div className="common-skeleton mode-auto-skeleton-dark">
                                        <div className="skeleton-item"></div>
                                        <div className="skeleton-item"></div>
                                        <div className="skeleton-item"></div>
                                        <div className="skeleton-item"></div>
                                    </div>
                                </div>
                                <div className="skeleton-title">
                                    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z"></path></svg>
                                    跟随系统
                                </div>
                            </ProCard>
                        }
                    />
                </CheckCard.Group>
            </ProCard>
        </div >
    )
}

export default UserSettingCommon;