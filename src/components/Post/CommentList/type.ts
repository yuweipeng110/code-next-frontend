export type AddCommentReply = {
    id: string;
    user: API.UserVO;
    contentIsHasValue?: boolean;
}


export type LoadPostCommentReplyVO = {
    loading?: boolean;
    name?: Object;
    picture?: Object;
    // 是否显示添加评论
    isCurrentAddCommentShow?: boolean;
    // 内容是否有值
    contentIsHasValue?: boolean;
} & API.PostCommentReplyVO;

export type LoadPostCommentVO = {
    // 评论对象ID
    id: string;
    comment: API.PostCommentVO;
    replyList: LoadPostCommentReplyVO[];
    replyTotal: number;
    // 是否显示添加评论
    isCurrentAddCommentShow?: boolean;
    // 内容是否有值
    contentIsHasValue?: boolean;
}