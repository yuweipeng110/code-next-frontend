'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './index.css';

/**
 * 帖子发布成功页面
 * @returns 
 */
const AddPostPublishedPage = () => {
    const searchParams = useSearchParams();
    const searchParamsObj = {
        title: searchParams.get("title") || "",
    }

    return (
        <div className='add-post-published-page max-width-content-2'>
            <div className='share-content'>
                <div className='common-empty'>
                    <div className='img-empty-wrap'>
                        <div className="img-empty" style={{ backgroundImage: `url(/assets/published.avis)` }} ></div>
                    </div>
                    <div className='content-slot-wrap'>
                        <Link href="" className='jj-link'>《{searchParamsObj.title}》</Link>
                        <div className='thanks' >发布成功！有了你的分享，稀土掘金会变得更好！</div>
                        <Link href="/book" className='rule-link'>如何玩转稀土掘金社区？点击了解</Link>
                    </div>

                    <Link href="/" className='button-link'> 回到首页 </Link>
                </div>

                <div className="bottom-banner">
                    <img src="//lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/banner-download-app.1431427.png" alt="下载掘金APP" className="banner-image" />
                    <button data-v-2662c39d="" data-v-cd15ceae="" type="button" className="btn-close"></button>
                </div>
            </div>
        </div>
    )
}

export default AddPostPublishedPage;