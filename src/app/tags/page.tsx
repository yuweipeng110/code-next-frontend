"use server";
import TagCardTabs from '@/components/TagCard/TagCardTabs';
import './index.css';

/**
 * 标签列表页面
 * @returns 
 */
const TagsPage = () => {

    return (
        <div id="tags-page" className="max-width-content" >
            <TagCardTabs />
        </div>
    )
}

export default TagsPage;