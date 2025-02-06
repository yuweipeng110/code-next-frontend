
const defaultList = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://picsum.photos/200/300?${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    isCurrentAddCommentShow: false,
    // contentIsHasValue: false,
    contentIsHasValue: i === 10 ? true : false,
    replyList: Array.from({ length: 10 }).map((_, replyI) => ({
        id: replyI + 1,
        isCurrentAddCommentShow: false,
        contentIsHasValue: replyI === 5 ? true : false,
    }))

}));