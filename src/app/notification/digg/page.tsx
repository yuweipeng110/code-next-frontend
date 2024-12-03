"use client"
import { listPostVoByPageUsingPost } from '@/api/postCommentController';
import { Button, List, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
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
type CommentActionsProps = {
    comment: Object;
    reply?: Object;
    handleShowCommentInput?: (showInput: boolean) => void;
    handleShowReplyInput?: (showInput: boolean) => void;
    handleShowCommentInputList?: (id: number) => void;
    handleShowReplyInputList?: (id: number) => void;
}

// 子组件
const CommentActions: React.FC<CommentActionsProps> = React.memo((props) => {
    // const { item, replyItem, handleListItemShow } = props;
    const { comment, reply, handleShowCommentInput, handleShowReplyInput, handleShowCommentInputList, handleShowReplyInputList } = props;
    // const { item, replyItem } = props;
    // const { handleListItemShow } = useContext(CommentReplyProvider);
    // console.log('render CommentActions')

    const [showInput, setShowInput] = useState(false);

    return (
        <div>
            <div>
                CommentActions
                itemId: {comment.id}
                <Button type="primary"
                    onClick={() => {
                        if (reply) {
                            handleShowReplyInput(true);
                            // replyListRef?.current?.setReplyInputState(true, '', '');
                            // setReplyInputState(item.id, replyItem.id);
                            handleShowReplyInputList(reply.id);
                            setShowInput(!showInput);
                        } else {
                            // handleListItemShow(item.id)
                            // commentList.setCommentInputState();
                            handleShowCommentInput(true);
                            handleShowCommentInputList(comment.id);
                            setShowInput(!showInput);
                        }
                    }}
                >
                    {/* {replyItem ? replyItem.isCurrentAddCommentShow ? "打开" : "关闭" : item.isCurrentAddCommentShow ? "open" : "close"} */}
                    回复
                </Button>
            </div>
            {showInput && (
                <div>
                    AddReplyComment
                    <TextArea
                        rows={4}
                        maxLength={600}
                        showCount
                    />
                </div>
            )}
        </div>
    );
})

// 子组件
const AddReplyComment = React.memo(() => {
    console.log('render AddReplyComment');

    return (
        <div>
            AddReplyComment
            <TextArea
                rows={4}
                maxLength={600}
                showCount
            />
        </div>
    );
});

// 子组件
const CommentReplyList: React.FC<{ comment: Object }> = React.memo((props) => {
    // const { item, handleListItemShow } = props;
    const { comment } = props;
    // const { handleListItemShow } = useContext(CommentReplyProvider);
    console.log('render CommentReplyList', comment);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplyInputList, setShowReplyInputList] = useState([]);
    const handleShowReplyInput = (showInput: boolean) => {
        // setShowReplyInput(showInput);
        setShowReplyInput(!showReplyInput);
    }
    const handleShowReplyInputList = (id: number) => {
        setShowReplyInputList(prevList =>
            prevList.includes(id)
                ? prevList.filter(item => item !== id)  // 如果已存在，删除
                : [...prevList, id]                      // 如果不存在，添加
        );
    }

    return (
        <div>
            <p>
                CommentReplyList
                replyList: {comment.replyPage.records.map((replyItem, index) => {
                    const hasShowReplyInput = new Set(showReplyInputList).has(replyItem.id);
                    return (
                        <div key={index} style={{ background: "green" }}>
                            <CommentActions comment={comment} reply={replyItem} handleShowReplyInput={handleShowReplyInput} handleShowReplyInputList={handleShowReplyInputList} />
                            {/* {   hasShowReplyInput && <AddReplyComment />} */}
                        </div>
                    )
                })}
                {
                    // showReplyInput && <AddReplyComment />
                    // showReplyInput && <AddReplyComment />
                }
            </p>
        </div>
    );
});

// 父组件
const ParentComponent = () => {
    console.log('render ParentComponent');

    const [list, setList] = useState<[]>([]);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [showCommentInputList, setShowCommentInputList] = useState([]);
    const [loading, setLoading] = useState(false);
    const initSearchParams = {
        pageSize: 8,
        pageNum: 1,
        orderKey: 'thumbNum',
    };

    const [searchParams, setSearchParams] = useState(initSearchParams);
    const [total, setTotal] = useState<number>(0);

    /**
     * 加载数据
     */
    const loadData = async () => {
        setLoading(true);
        const res = await listPostVoByPageUsingPost({
            postId: "1843471468667645954" as unknown as number,
            ...searchParams,
        });
        if (res) {
            // const dataList = res.data?.records || [];
            // const total = res.data?.total || 0;
            setList(res.data?.records || []);
            setTotal(res.data?.total);
        } else {
            message.error('加载失败，请刷新重试');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [searchParams]);

    const handleShowCommentInput = (showInput: boolean) => {
        setShowCommentInput(!showCommentInput);
    }
    const handleShowCommentInputList = (id: number) => {
        setShowCommentInputList(prevList =>
            prevList.includes(id)
                ? prevList.filter(item => item !== id)  // 如果已存在，删除
                : [...prevList, id]                      // 如果不存在，添加
        );
    }


    useEffect(() => {
        console.log('showCommentInputList', showCommentInputList);
    }, [showCommentInputList]);

    useEffect(() => {
        console.log('list', list);
    }, [list]);

    return (
        <div>
            <p>ParentComponent</p>

            {/* list: {list.map((commentItem, index) => {
                const hasShowCommentInput = new Set(showCommentInputList).has(commentItem.id);
                return (
                    <div key={index}>
                        <CommentActions comment={commentItem} handleShowCommentInput={handleShowCommentInput} handleShowCommentInputList={handleShowCommentInputList} />
                        {(hasShowCommentInput) && <AddReplyComment />}
                        {
                            commentItem.replyPage?.total > 0 && (
                                <CommentReplyList comment={commentItem} />
                                // <CommentReplyProvider.Provider value={{ handleListItemShow }}>
                                //     <CommentReplyList item={item} />
                                // </CommentReplyProvider.Provider>
                            )
                        }
                    </div>
                )
            })} */}



            <List
                itemLayout="vertical"
                dataSource={list}
                loading={loading}
                renderItem={(commentItem, commentIndex) => {
                    const hasShowCommentInput = new Set(showCommentInputList).has(commentItem.id);
                    return (
                        <div key={commentIndex}>
                            <CommentActions comment={commentItem} handleShowCommentInput={handleShowCommentInput} handleShowCommentInputList={handleShowCommentInputList} />
                            {/* {(hasShowCommentInput) && <AddReplyComment />} */}
                            {
                                commentItem.replyPage?.total > 0 && (
                                    <CommentReplyList comment={commentItem} />
                                )
                            }
                        </div>
                    );
                }}
                pagination={{
                    pageSize: searchParams.pageSize ?? 8,
                    current: searchParams.pageNum ?? 1,
                    showSizeChanger: false,
                    total,
                    showTotal() {
                        return `总数 ${total ?? 0}`;
                    },
                    onChange(pageNum, pageSize) {
                        const params = {
                            ...searchParams,
                            pageSize,
                            pageNum,
                        };
                        setSearchParams(params);
                        // // 回到回答区顶部
                        // if (topRef?.current) {
                        //     window.scrollTo(0, topRef.current.offsetTop);
                        // }
                    },
                }}
            />
        </div>
    );
};

export default ParentComponent;
