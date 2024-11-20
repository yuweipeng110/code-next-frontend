import React from 'react';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';
import { Tag } from 'antd';

type Props = {
    // 用户ID
    userId: string;
};

/**
 * 作者标签
 */
const AuthorTag: React.FC<Props> = (props) => {
    const { userId } = props;
    // 获取登录用户信息
    const loginUser = useSelector((state: RootState) => state.loginUser);

    if (userId !== loginUser?.id) {
        return <></>;
    }

    return (
        <Tag bordered={false} color="processing" style={{ lineHeight: "18px", paddingInline: 5, fontWeight: "normal" }}>
            作者
        </Tag>
    )
}

export default AuthorTag;