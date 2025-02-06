import React, { useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, Form, Row, Typography } from 'antd';
import useCountDown from '@/hooks/useCountDown';

type Props = {
    handleStageNext: () => void;
};

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
        md: {
            span: 8,
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
            span: 10,
        },
    },
};

/**
 * 用户设置（安全设置）（修改邮箱）
 * 1. 验证旧邮箱
 */
const UpdateEmailStep10: React.FC<Props> = (props) => {
    const { handleStageNext } = props;

    const [form] = Form.useForm();

    const [disabled, setDisabled] = useState<boolean>(true);

    const { count, start } = useCountDown(60, () => {
        setDisabled(true);
    });

    const isDisabled = () => {
        if (disabled) {
            setDisabled(false);
            start();
        }
    };

    const onSubmit = async (values: any) => {
        handleStageNext();
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
        <div className='update-email-setp-10'>
            <div style={{ marginBottom: 30 }} />
            <Row>
                <Col span={20} offset={5}>
                    <Typography.Title level={5}>验证码将发送到29***@qq.com邮箱</Typography.Title>
                    <Typography.Text type="secondary">如果长时间未收到验证码，请检查垃圾箱</Typography.Text>
                </Col>
            </Row>
            <div style={{ marginBottom: 30 }} />
            <ProForm
                form={form}
                {...formItemLayout}
                layout="horizontal"
                onFinish={onFinish}
                submitter={{
                    searchConfig: {
                        submitText: '下一步',
                    },
                    resetButtonProps: false,
                    render: (_, defaultDoms) => {
                        return (
                            <Row>
                                <Col span={12} offset={8}>
                                    {defaultDoms}
                                </Col>
                            </Row>
                        )
                    },
                }}
            >
                <ProFormText
                    name="captcha"
                    label="验证码"
                    placeholder="请输入验证码"
                    rules={[
                        { required: true, message: '请填写验证码' },
                        { pattern: /^\d{6}$/, message: '验证码为6位数字格式！' },
                    ]}
                    fieldProps={{
                        maxLength: 6,
                        suffix: (
                            <a type="primary" onClick={isDisabled} >
                                {disabled ? '获取短信验证码' : `${count}s`}
                            </a>
                        )
                    }}
                />
            </ProForm>
        </div>
    )
}

export default UpdateEmailStep10;