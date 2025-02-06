import React, { useCallback, useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Steps } from 'antd';
import Step10 from './components/UpdateEmailStep10';
import Step20 from './components/UpdateEmailStep20';
import Result from './components/UpdateEmailResult';
import "./index.css";


const steps = [Step10, Step20, Result];

const stepStageObj = {
    10: {
        title: '验证邮箱',
    },
    20: {
        title: '设置/验证新邮箱',
    },
    30: {
        title: '结果（成功 / 失败）',
    }
}

const stepRender = (stage: number) => <Steps.Step title={stepStageObj[stage].title} />;

/**
 * 用户设置（安全设置）（修改邮箱）
 */
const UserSettingSecurityEmail: React.FC = () => {

    const [current, setCurrent] = useState<number>(0);

    const StepComp = steps[current];

    /**
     * 上一步
     */
    const handleStagePrevious = useCallback(() => {
        if (current >= 0) setCurrent(current - 1);
    }, [current])

    /**
     * 下一步
     */
    const handleStageNext = useCallback(() => {
        if (current < Object.keys(stepStageObj).length) setCurrent(current + 1);
    }, [current])

    return (
        <div className='user-setting-security-email'>
            <ProCard
                title={<h3>安全设置 / 修改邮箱</h3>}
                headerBordered
            >
                <div className='form-update-email'>
                    <Steps current={current} size="small" progressDot>
                        {stepRender(10)}
                        {stepRender(20)}
                        {stepRender(30)}
                    </Steps>
                    <StepComp
                        handleStageNext={handleStageNext}
                    />
                </div>
            </ProCard>
        </div>
    )
}

export default UserSettingSecurityEmail;