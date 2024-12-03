import React from 'react';
import { Tag } from 'antd';

/**
 * 作者标签
 */
const AuthorTag: React.FC = React.memo(() => {

    return (
        <Tag bordered={false} color="processing" className="author-tag" style={{ lineHeight: "18px", paddingInline: 5, fontWeight: "normal" }}>
            作者
        </Tag>
    )
})

export default AuthorTag;