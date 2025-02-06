import React from 'react';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, Form, Progress, Row } from 'antd';
import zxcvbn from 'zxcvbn';
import "./index.css";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
        md: {
            span: 5,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
        md: {
            span: 12,
        },
    },
};

/**
 * 用户设置（安全设置）（修改密码）
 * ps：修改密码后要退出登录重置路由
 */
const UserSettingSecurityPassword: React.FC = () => {

    const [form] = Form.useForm();


    // 监听密码的改变
    const newPassword = Form.useWatch('newPassword', form);

    /**
     * @description: 监听密码强度相应变化
     * @param {string} password
     */
    const watchStrength = (password: string): number => {
        const analysisValue = zxcvbn(password)
        // score得分只有0~4，且只有整数范围并没有小数
        return (analysisValue.score + 1) * 20
    }


    const onSubmit = async (values: any) => {
        return true;
        // return stageJump(1, values);
    };

    const onFinish = async (values: any) => {
        const success = await onSubmit(values);
        if (!success) {
            return false;
        }
        return true;
    };

    return (
        <div className='user-setting-security-password'>
            <ProCard
                title={<h3>安全设置 / 修改密码</h3>}
                headerBordered
            >
                <ProForm
                    form={form}
                    layout="horizontal"
                    {...formItemLayout}
                    onFinish={onFinish}
                    submitter={{
                        searchConfig: {
                            submitText: '确认',
                        },
                        resetButtonProps: false,
                        render: (_, defaultDoms) => {
                            return (
                                <Row>
                                    <Col span={12} offset={5}>
                                        {defaultDoms}
                                    </Col>
                                </Row>
                            )
                        },
                    }}
                    className='form-update-password'
                >
                    <ProFormText.Password
                        name="oldPassword"
                        label="旧密码"
                        placeholder="请输入旧密码"
                        rules={[{ required: true, message: '请填写旧密码' }]}
                    />
                    <ProFormText.Password
                        name="newPassword"
                        label="新密码"
                        placeholder="11-20位数字和字母组合"
                        rules={[{ required: true, message: "请填写新密码" }]}
                    />
                    {
                        newPassword && newPassword.length > 0 && (
                            <>
                                <div className='process-steps'>
                                    <Progress
                                        percent={newPassword ? watchStrength(newPassword) : 0}
                                        steps={5}
                                        strokeColor={['#e74242', '#EFBD47', '#ffa500', '#1bbf1b', '#008000']}
                                        showInfo={false}
                                    />
                                </div>
                                <Row justify="space-around" className='process-steps'>
                                    {
                                        ['非常弱', '弱', '一般', '强', '非常强'].map(value => <Col span={4} key={value}>{value}  </Col>)
                                    }
                                </Row>
                            </>
                        )
                    }
                    <ProFormText.Password
                        name="confirmPassword"
                        label="确认新密码"
                        placeholder="确认新密码"
                        rules={[
                            { required: true, message: '请填写确认新密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("两次密码输入不一致"));
                                },
                            })
                        ]}
                    />
                </ProForm>
            </ProCard>
        </div>
    )
}

export default UserSettingSecurityPassword;