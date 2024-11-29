import React from 'react';
import { Tag } from 'antd';

/**
 * 作者标签
 */
const AuthorTag: React.FC = React.memo(() => {

    return (
        <Tag bordered={false} color="processing" style={{ lineHeight: "18px", paddingInline: 5, fontWeight: "normal" }}>
            作者
        </Tag>
    )
})

export default AuthorTag;