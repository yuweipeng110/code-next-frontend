import { createContext } from "react";

interface ReplyEditContextType {
    toggleCurrentCommentReplyVisibility: (commentId: string, replyId?: string) => void;
}

export const CommentReplyEditProvider = createContext<ReplyEditContextType>({
    toggleCurrentCommentReplyVisibility: (commentId: string, replyId?: string) => { }
});


interface AddCommentReplyContextType {
    handleAddReplyCommentChange: (commentId: string, replyId?: string, inputValue?: string) => void;
}

export const AddCommentReplyProvider = createContext<AddCommentReplyContextType>({
    handleAddReplyCommentChange: (commentId: string, replyId?: string, inputValue?: string) => { }
});

