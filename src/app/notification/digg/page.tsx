"use client"
import { Button } from 'antd';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';


interface ReplyContextType {
    handleListItemShow: (commentId: number, replyId?: number) => void;
}

export const CommentReplyProvider = createContext<ReplyContextType>({
    handleListItemShow: (commentId: number, replyId?: number) => { }
});


// 源数据 
const defaultData = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    replyPage: {
        records: i === 3 || i === 4 ? [
            {
                id: i + 100
            },
            {
                id: i + 101
            },
        ] : [],
        total: i === 3 || i === 4 ? 2 : 0,
    }
}));

type Reply = {
    id: number,
    isCurrentAddCommentShow: boolean;
    contentIsHasValue: boolean;
}

type ListProps = {
    id: number;
    replyList: Reply[],
    replyTotal: number;
    isCurrentAddCommentShow: boolean;
    contentIsHasValue: boolean;
}

type ChildProps = {
    item: ListProps;
    // handleListItemShow: (commentId: number, replyId?: number) => void;
    replyItem?: Reply;
    handleListItemShow?: (commentId: number, replyId?: number) => void;
}
// 子组件
const CommentActions: React.FC<ChildProps> = React.memo((props) => {
    const { item, replyItem, handleListItemShow } = props;
    // const { item, replyItem } = props;
    // const { handleListItemShow } = useContext(CommentReplyProvider);
    // console.log('render CommentActions')

    return (
        <div>
            CommentActions
            itemId: {item.id}
            <Button type="primary"
                onClick={() => {
                    if (replyItem) {
                        handleListItemShow(item.id, replyItem.id);
                    } else {
                        handleListItemShow(item.id)
                    }
                }}
            >
                {replyItem ? replyItem.isCurrentAddCommentShow ? "打开" : "关闭" : item.isCurrentAddCommentShow ? "open" : "close"}
            </Button>
        </div>
    );
})

// 子组件
const AddReplyComment = React.memo(() => {
    console.log('render AddReplyComment');

    return (
        <div>AddReplyComment</div>
    );
});

// 子组件
const CommentReplyList: React.FC<ChildProps> = React.memo((props) => {
    // const { item, handleListItemShow } = props;
    const { item, handleListItemShow = () => { } } = props;
    // const { handleListItemShow } = useContext(CommentReplyProvider);
    console.log('render CommentReplyList', item);

    return (
        <div>
            <p>
                CommentReplyList
                replyList: {item.replyList.map((replyItem, index) => {
                    return (
                        <div key={index}>
                            <CommentActions item={item} replyItem={replyItem} handleListItemShow={handleListItemShow} />
                            {(replyItem.isCurrentAddCommentShow).toString()}
                            {
                                replyItem.isCurrentAddCommentShow && <AddReplyComment />
                            }
                        </div>
                    )
                })}
            </p>
        </div>
    );
});

// 父组件
const ParentComponent = () => {
    console.log('render ParentComponent');

    const [list, setList] = useState<ListProps[]>([]);


    // 调整数据结构
    useEffect(() => {
        const updatedList = defaultData.map(item => ({
            id: item.id,
            replyList: (item.replyPage.records || []).map(record => ({
                ...record,
                isCurrentAddCommentShow: false,
                contentIsHasValue: false,
            })),
            replyTotal: item.replyPage.total || 0,
            isCurrentAddCommentShow: false,
            contentIsHasValue: false,
        }));
        setList(updatedList);
    }, []);

    useEffect(() => {
        console.log('list', list);
    }, [list]);

    const handleListItemShow = useCallback((commentId: number, replyId?: number) => {
        console.log('handleListItemShow', commentId, replyId);
        const newReplyMoreDataList = list.map(commentItem => {
            if (commentItem.id === commentId) {
                if (replyId) {
                    // 更新回复列表中指定回复的可见状态
                    commentItem.replyList = commentItem.replyList.map(replyItem => {
                        if (replyItem.id === replyId) {
                            return {
                                ...replyItem,
                                isCurrentAddCommentShow: !replyItem.isCurrentAddCommentShow,
                            };
                        }
                        return replyItem;
                    });
                } else {
                    // 更新评论的可见状态
                    return { ...commentItem, isCurrentAddCommentShow: !commentItem.isCurrentAddCommentShow };
                }
            }
            return commentItem;
        });
        setList(newReplyMoreDataList);
    }, [list])

    return (
        <div>
            <p>ParentComponent</p>

            list: {list.map((item, index) => {
                return (
                    <div key={index}>
                        <CommentActions item={item} handleListItemShow={handleListItemShow} />
                        {/* <CommentReplyProvider.Provider value={{ handleListItemShow }}>
                            <CommentActions item={item} />
                        </CommentReplyProvider.Provider> */}
                        {
                            item.isCurrentAddCommentShow && <AddReplyComment />
                        }
                        {
                            item.replyTotal > 0 && (

                                <CommentReplyList item={item} handleListItemShow={handleListItemShow} />
                                // <CommentReplyProvider.Provider value={{ handleListItemShow }}>
                                //     <CommentReplyList item={item} />
                                // </CommentReplyProvider.Provider>
                            )
                        }
                    </div>
                )
            })}
        </div>
    );
};

export default ParentComponent;
