import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import "./index.css";

type Props = {
    userInfo: API.UserVO;
}

/**
 * 用户中心-关注
 */
const UserCenterFollow: React.FC<Props> = (props) => {
    const { userInfo } = props;

    return (
        <div className='user-center-follow'>
            <ProCard split='vertical'>
                <ProCard colSpan="50%">
                    关注用户
                    <p>{userInfo.followUserCount}</p>
                </ProCard>
                <ProCard>
                    我的粉丝
                    <p>{userInfo.fansCount}</p>
                </ProCard>
            </ProCard>
        </div>
    )
}

export default UserCenterFollow;