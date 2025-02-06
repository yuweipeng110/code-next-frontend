import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Result } from 'antd';
import moment from 'moment';

type Props = {
    handleStageNext: () => void;
};

/**
 * 用户设置（安全设置）（修改邮箱）
 * 1. 验证旧邮箱
 */
const UpdateEmailResult: React.FC<Props> = (props) => {
    const { handleStageNext } = props;

    return (
        <div className='update-email-result'>
            <ProCard>
                <Result
                    status={'success'}
                    title={'应用回滚完成'}
                    subTitle={
                        <span>
                            发布单名称：xxxxx发布单&nbsp;&nbsp;&nbsp;&nbsp; 提交人：
                            李祥&nbsp;&nbsp;&nbsp;&nbsp; 提交时间:
                            {moment().format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                    }
                />
            </ProCard>
        </div>
    )
}

export default UpdateEmailResult;