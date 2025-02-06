import React, { useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, Form, Row } from 'antd';
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
 * 用户设置（安全设置）（修改手机）
 * 2. 填写新手机
 */
const UpdateCellphoneStep20: React.FC<Props> = (props) => {
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
        <div className='update-cellphone-setp-20'>
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
                    name="newPhone"
                    label="新手机"
                    placeholder="请输入新手机"
                    rules={[{ required: true, message: '请填写新手机' }]}
                />
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

export default UpdateCellphoneStep20;