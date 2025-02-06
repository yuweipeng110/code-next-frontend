import { useState } from 'react';
import { Col, Flex, Form, Row, Typography, Upload, UploadFile } from 'antd';
import { ProCard, ProForm, ProFormDatePicker, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
            span: 3,
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
            span: 24,
        },
    },
};

/**
 * 用户设置（个人资料）
 */
const UserSettingProfile = () => {

    const [form] = Form.useForm();

    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        },
    ]);

    const initialValues = {};

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
        <div className="user-setting-profile">
            <ProCard
                title={<h3>个人资料</h3>}
                split="vertical"
                headerBordered
            >
                <ProCard colSpan="65%">
                    <ProForm
                        form={form}
                        {...formItemLayout}
                        layout="horizontal"
                        onFinish={onFinish}
                        initialValues={initialValues}
                        submitter={{
                            searchConfig: {
                                submitText: '保存并修改',
                            },
                            resetButtonProps: false,
                            render: (_, defaultDoms) => {
                                return (
                                    <Row>
                                        <Col span={12} offset={3}>
                                            {defaultDoms}
                                        </Col>
                                    </Row>
                                )
                            },
                        }}
                    >
                        <Typography.Title level={5} style={{ paddingBottom: 16 }}>基本信息</Typography.Title>

                        <ProFormText
                            name="userName"
                            label="用户名"
                            placeholder="请输入用户名"
                            rules={[{ required: true, message: '请填写用户名' }]}
                            fieldProps={{
                                variant: "filled",
                                showCount: true,
                                maxLength: 20,
                            }}
                        />
                        <ProFormDatePicker
                            name="date"
                            label="开始工作"
                            placeholder="请选择开始工作时间"
                            rules={[{ required: true, message: '请选择开始工作时间' }]}
                            fieldProps={{
                                picker: 'month',
                                variant: "filled",
                            }}
                            width="lg"
                        />
                        <ProFormText
                            name="job"
                            label="职位"
                            fieldProps={{
                                variant: "filled",
                                showCount: true,
                                maxLength: 50,
                            }}
                        />
                        <ProFormText
                            name="company"
                            label="公司"
                            fieldProps={{
                                variant: "filled",
                                showCount: true,
                                maxLength: 50,
                            }}
                        />
                        <ProFormText
                            name="blog_address"
                            label="个人主页"
                            fieldProps={{
                                variant: "filled",
                                showCount: true,
                                maxLength: 100,
                            }}
                        />
                        <ProFormTextArea
                            name="description"
                            label="个人介绍"
                            fieldProps={{
                                variant: "filled",
                                showCount: true,
                                maxLength: 100,
                            }}
                        />

                        <Typography.Title level={5} style={{ paddingBottom: 16 }}>兴趣标签管理</Typography.Title>
                    </ProForm>
                </ProCard>
                <ProCard>
                    <Flex justify="center" align="center" vertical>
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
                            fileList={fileList}
                        />
                        <div className="title">
                            上传头像
                        </div>
                        <div className="description">
                            <p>格式：支持JPG、PNG、JPEG</p>
                            <p>大小：5M以内</p>
                        </div>
                    </Flex>
                </ProCard>
            </ProCard>
        </div>
    )
}

export default UserSettingProfile;