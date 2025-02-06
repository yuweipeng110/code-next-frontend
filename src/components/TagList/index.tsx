import React from "react";
import { Tag } from "antd";
import Link from "next/link";
import { truncate } from "lodash";
import "./index.css";

interface Props {
    tagList?: string[];
    size?: "small" | "default" | "large";
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = React.memo((props: Props) => {
    const { tagList = [], size = "default" } = props;

    return (
        <div className="tag-list">
            {tagList.map((tagItem) => {
                return (
                    <Link key={tagItem} href={`/tag/${tagItem}`} target="_blank">
                        <Tag bordered={false} style={size === "small" ? { padding: "0px 4px", fontSize: 12 } : { padding: "3px 10px" }}>
                            {tagItem}
                        </Tag>
                    </Link>
                )
            })}
        </div >
    );
})

export default TagList;
