import { Progress, Form, Row, Col } from 'antd';
import { ProFormText } from '@ant-design/pro-components';
import zxcvbn from 'zxcvbn';
/*
 @Description: 密码强度组件
 @Version: 2.0
 @Author: 白雾茫茫丶
 @Date: 2023-01-09 17:15:19
 @LastEditors: 白雾茫茫丶
 @LastEditTime: 2023-01-16 15:40:45
*/
const StrengthMeter: React.FC = () => {
    // 获取上下文 form 实例
    const form = Form.useFormInstance();
    // 监听密码的改变
    const password = Form.useWatch('password', form);

    /**
     * @description: 监听密码强度相应变化
     * @param {string} password
     */
    const watchStrength = (password: string): number => {
        const analysisValue = zxcvbn(password)
        // score得分只有0~4，且只有整数范围并没有小数
        return (analysisValue.score + 1) * 20
    }

    return (
        <>
            {/* 密码 */}
            <ProFormText.Password
                label="密码"
                name="password"
                rules={[{ required: true, min: 6, max: 12, message: "请输入密码" }]}
            />
            {/* 确认密码 */}
            <ProFormText.Password
                label="确认密码"
                name="confirmPassword"
                fieldProps={{ visibilityToggle: false }}
                rules={[
                    { required: true, message: "请输入确认密码" },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("两次密码输入不一致"));
                        },
                    })
                ]}
            />
            {/* 显示密码强度 */}
            <Progress
                percent={password ? watchStrength(password) : 0}
                steps={5}
                strokeColor={['#e74242', '#EFBD47', '#ffa500', '#1bbf1b', '#008000']}
                showInfo={false}
            />
            <Row justify="space-around">
                {
                    ['非常弱', '弱', '一般', '强', '非常强'].map(value => <Col span={4} key={value}>{value}  </Col>)
                }
            </Row>
        </>
    )
}

export default StrengthMeter;