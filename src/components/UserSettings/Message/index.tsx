import { ProCard, ProFormRadio } from '@ant-design/pro-components';
import { Form, Typography } from 'antd';
import "./index.css";

/**
 * 用户设置（消息设置）
 */
const UserSettingMessage = () => {
    return (
        <div className="user-setting-message">
            <ProCard
                title={<h3>消息设置</h3>}
                headerBordered
            >
                <Typography.Title level={5}>私信设置</Typography.Title>
                <div style={{ marginBottom: 16 }} />
                <Form>
                    <ProFormRadio.Group
                        name="radio-group"
                        label="允许谁给我发私信"
                        options={[
                            {
                                label: '所有人',
                                value: 0,
                            },
                            {
                                label: '我关注的人',
                                value: 1,
                            },
                            {
                                label: '互相关注的人',
                                value: 2,
                            },
                            {
                                label: '关闭 （不允许任何人给我发私信）',
                                value: 3,
                            },
                        ]}
                    />
                </Form>
            </ProCard>
        </div>
    )
}

export default UserSettingMessage;