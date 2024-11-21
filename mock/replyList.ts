import Mock from 'mockjs';

/**
 * 评论回复列表
 */
Mock.mock('/api/postCommentReply/list/page/vo', 'post', () => {
    console.log('/api/postCommentReply/list/page/vo mock POST 拦截')
    return {
        "success": true,
        "code": 20000,
        "message": "ok",
        "data": {
            "total": 7,
            "pageCount": 3,
            "records": [
                {
                    "id": "114",
                    "commentId": "7",
                    "userId": "4",
                    "content": "回复444",
                    "contentType": 0,
                    "reviewStatus": 0,
                    "thumbNum": 0,
                    "replyId": "3",
                    "replyUserId": "3",
                    "replyUser": {
                        "id": "3",
                        "userName": "java酱",
                        "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/43a49002b05ff24c9629909a1d4c61f2~90x90.awebp",
                        "userProfile": "程序员贺某，年二十有三，始从文，连考而不中。遂从武，练武场上发一矢",
                        "userRole": "user",
                        "createTime": "2024-10-17T09:04:19.000+00:00"
                    },
                    "createTime": "2024-11-18T03:24:29.000+00:00",
                    "updateTime": "2024-11-18T07:10:46.000+00:00",
                    "user": {
                        "id": "4",
                        "userName": "子翀",
                        "userAvatar": "https://p6-passport.byteacctimg.com/img/user-avatar/b57b5b9a6edf5347280342ddd04ba046~200x200.awebp",
                        "userProfile": "程序员大佬，精通各类编程语言，架构师",
                        "userRole": "user",
                        "createTime": "2024-10-22T01:19:15.000+00:00"
                    },
                    "hasThumb": false
                },
                {
                    "id": "115",
                    "commentId": "7",
                    "userId": "3",
                    "content": "回复555",
                    "contentType": 0,
                    "reviewStatus": 0,
                    "thumbNum": 0,
                    "createTime": "2024-11-18T03:25:34.000+00:00",
                    "updateTime": "2024-11-18T07:10:46.000+00:00",
                    "user": {
                        "id": "3",
                        "userName": "java酱",
                        "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/43a49002b05ff24c9629909a1d4c61f2~90x90.awebp",
                        "userProfile": "程序员贺某，年二十有三，始从文，连考而不中。遂从武，练武场上发一矢",
                        "userRole": "user",
                        "createTime": "2024-10-17T09:04:19.000+00:00"
                    },
                    "hasThumb": false
                },
                {
                    "id": "116",
                    "commentId": "7",
                    "userId": "2",
                    "content": "回复666",
                    "contentType": 0,
                    "reviewStatus": 0,
                    "thumbNum": 0,
                    "createTime": "2024-11-18T03:25:34.000+00:00",
                    "updateTime": "2024-11-18T07:10:46.000+00:00",
                    "user": {
                        "id": "2",
                        "userName": "小于",
                        "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
                        "userProfile": "咸鱼",
                        "userRole": "user",
                        "createTime": "2024-09-30T09:33:29.000+00:00"
                    },
                    "hasThumb": false
                }
            ]
        }
    }
});