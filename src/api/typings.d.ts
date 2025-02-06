declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
    success?: boolean;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultCategoryVO_ = {
    code?: number;
    data?: PageResultCategoryVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultPostCommentReplyVO_ = {
    code?: number;
    data?: PageResultPostCommentReplyVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultPostCommentVO_ = {
    code?: number;
    data?: PageResultPostCommentVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultPostFavourVO_ = {
    code?: number;
    data?: PageResultPostFavourVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultPostThumbVO_ = {
    code?: number;
    data?: PageResultPostThumbVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultPostViewVO_ = {
    code?: number;
    data?: PageResultPostViewVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultPostVO_ = {
    code?: number;
    data?: PageResultPostVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultTagVO_ = {
    code?: number;
    data?: PageResultTagVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePageResultUserVO_ = {
    code?: number;
    data?: PageResultUserVO_;
    message?: string;
    success?: boolean;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseSearchVO_ = {
    code?: number;
    data?: SearchVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseTagVO_ = {
    code?: number;
    data?: TagVO;
    message?: string;
    success?: boolean;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
    success?: boolean;
  };

  type CategoryQueryDTO = {
    current?: number;
    id?: number;
    notId?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    userId?: number;
  };

  type CategoryVO = {
    createTime?: string;
    id?: string;
    picture?: string;
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type getPostVOUsingGETParams = {
    /** id */
    id?: number;
  };

  type getTagVOByTitleUsingGETParams = {
    /** title */
    title?: string;
  };

  type getTagVOUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: string;
    token?: string;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PagePostCommentReplyVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostCommentReplyVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageResultCategoryVO_ = {
    pageCount?: number;
    records?: CategoryVO[];
    total?: number;
  };

  type PageResultPostCommentReplyVO_ = {
    pageCount?: number;
    records?: PostCommentReplyVO[];
    total?: number;
  };

  type PageResultPostCommentVO_ = {
    pageCount?: number;
    records?: PostCommentVO[];
    total?: number;
  };

  type PageResultPostFavourVO_ = {
    pageCount?: number;
    records?: PostFavourVO[];
    total?: number;
  };

  type PageResultPostThumbVO_ = {
    pageCount?: number;
    records?: PostThumbVO[];
    total?: number;
  };

  type PageResultPostViewVO_ = {
    pageCount?: number;
    records?: PostViewVO[];
    total?: number;
  };

  type PageResultPostVO_ = {
    pageCount?: number;
    records?: PostVO[];
    total?: number;
  };

  type PageResultTagVO_ = {
    pageCount?: number;
    records?: TagVO[];
    total?: number;
  };

  type PageResultUserVO_ = {
    pageCount?: number;
    records?: UserVO[];
    total?: number;
  };

  type Picture = {
    title?: string;
    url?: string;
  };

  type PostAddDTO = {
    categoryId?: number;
    content?: string;
    picture?: number;
    tagIdList?: string[];
    tags?: string[];
    title?: string;
  };

  type PostCommentAddDTO = {
    content?: string;
    postId?: number;
    userId?: number;
  };

  type PostCommentDeleteDTO = {
    id?: number;
  };

  type PostCommentQueryDTO = {
    createPostUserId?: number;
    current?: number;
    notUserId?: number;
    pageSize?: number;
    postId?: number;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostCommentReplyAddDTO = {
    commentId?: number;
    content?: string;
    userId?: number;
  };

  type PostCommentReplyDeleteDTO = {
    id?: number;
  };

  type PostCommentReplyQueryDTO = {
    commentId?: number;
    current?: number;
    pageSize?: number;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostCommentReplyThumbAddDTO = {
    commentReplyId?: number;
  };

  type PostCommentReplyVO = {
    commentId?: string;
    content?: string;
    contentType?: number;
    createTime?: string;
    hasThumb?: boolean;
    id?: string;
    replyId?: string;
    replyUser?: UserVO;
    replyUserId?: string;
    reviewStatus?: number;
    thumbNum?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: string;
  };

  type PostCommentThumbAddDTO = {
    commentId?: number;
  };

  type PostCommentVO = {
    content?: string;
    contentType?: number;
    createTime?: string;
    hasThumb?: boolean;
    id?: string;
    post?: PostVO;
    postId?: string;
    replyPage?: PagePostCommentReplyVO_;
    reviewStatus?: number;
    thumbNum?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: string;
  };

  type PostDeleteDTO = {
    id?: number;
  };

  type PostFavourAddDTO = {
    postId?: number;
  };

  type PostFavourQueryDTO = {
    createPostUserId?: number;
    current?: number;
    pageSize?: number;
    postId?: number;
    postQueryDTO?: PostQueryDTO;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostFavourVO = {
    createTime?: string;
    post?: PostVO;
    postId?: string;
    type?: string;
    user?: UserVO;
    userId?: string;
  };

  type PostQueryDTO = {
    categoryId?: number;
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddDTO = {
    postId?: number;
  };

  type PostThumbQueryDTO = {
    createPostUserId?: number;
    current?: number;
    pageSize?: number;
    postId?: number;
    postQueryDTO?: PostQueryDTO;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostThumbVO = {
    createTime?: string;
    post?: PostVO;
    postId?: string;
    type?: string;
    user?: UserVO;
    userId?: string;
  };

  type PostUpdateDTO = {
    categoryId?: number;
    content?: string;
    id?: number;
    picture?: number;
    tagIdList?: string[];
    tags?: string[];
    title?: string;
  };

  type PostViewAddDTO = {
    postId?: number;
  };

  type PostViewDeleteDTO = {
    userId?: number;
  };

  type PostViewQueryDTO = {
    createPostUserId?: number;
    current?: number;
    pageSize?: number;
    postId?: number;
    postQueryDTO?: PostQueryDTO;
    searchPostTitle?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostViewVO = {
    createTime?: string;
    post?: PostVO;
    postId?: string;
    user?: UserVO;
    userId?: string;
  };

  type PostVO = {
    categoryId?: number;
    commentNum?: number;
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: string;
    picture?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: string;
    viewNum?: number;
  };

  type SearchDTO = {
    current?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    type?: string;
  };

  type SearchVO = {
    dataList?: Record<string, any>[];
    pageCount?: number;
    pictureList?: Picture[];
    postList?: PostVO[];
    records?: Record<string, any>[];
    tagList?: TagVO[];
    total?: number;
    userList?: UserVO[];
  };

  type TagAddDTO = {
    description?: string;
    picture?: string;
    title?: string;
  };

  type TagDeleteDTO = {
    id?: number;
  };

  type TagFollowAddDTO = {
    tagId?: number;
  };

  type TagFollowQueryDTO = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tagQueryDTO?: TagQueryDTO;
    userId?: number;
  };

  type TagQueryDTO = {
    current?: number;
    description?: string;
    id?: number;
    notId?: number;
    pageSize?: number;
    searchText?: string;
    searchUserId?: number;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    userId?: number;
  };

  type TagUpdateDTO = {
    description?: string;
    id?: number;
    picture?: string;
    title?: string;
  };

  type TagVO = {
    createTime?: string;
    description?: string;
    follow?: boolean;
    followCount?: number;
    id?: string;
    picture?: string;
    postCount?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: string;
  };

  type UserFollowAddDTO = {
    fansId?: number;
  };

  type UserFollowQueryDTO = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
    userQueryDTO?: UserQueryDTO;
  };

  type UserLoginDTO = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryDTO = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterDTO = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserVO = {
    createTime?: string;
    fansCount?: number;
    favourPostCount?: number;
    followTagCount?: number;
    followUserCount?: number;
    id?: string;
    isFollowUser?: boolean;
    postCount?: number;
    thumbPostCount?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
