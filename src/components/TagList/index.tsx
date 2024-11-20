import { Tag } from "antd";
import Link from "next/link";
import "./index.css";

interface Props {
    tagList?: string[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
    const { tagList = [] } = props;

    return (
        <div className="tag-list">
            {tagList.map((tag) => {
                return (
                    <Link key={tag} href={`/tag/${tag}`} target="_blank">
                        <Tag bordered={false}>{tag}</Tag>
                    </Link>
                )
            })}
        </div>
    );
};

export default TagList;
