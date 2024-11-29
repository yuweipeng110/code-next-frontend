import Mock from 'mockjs';

// /**
//  * 帖子评论列表
//  */
// Mock.mock('/api/postComment/list/page/vo', 'post', () => {
//     console.log('/api/postComment/list/page/vo mock POST 拦截')
//     return {
//         "success": true,
//         "code": 20000,
//         "message": "ok",
//         "data": {
//             "total": 42,
//             "pageCount": 6,
//             "records": [
//                 {
//                     "id": "10",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "这条评论非常长，主要是用来测试插入数据时对长文本的处理。测试长文本是否能够被正确插入到数据库中，理论上应该没有问题。测试文本部分会被重复多次，以确保长度达到要求。测试长文本是否能够被正确插入到数据库中，理论上应该没有问题。测试文本部分会被重复多次，以确保长度达到要求。",
//                     "contentType": 0,
//                     "reviewStatus": 1,
//                     "thumbNum": 30,
//                     "createTime": "2024-10-10T09:35:00.000+00:00",
//                     "updateTime": "2024-11-11T01:57:57.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": false,
//                     "replyPage": {
//                         "records": [],
//                         "total": 0,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 0
//                     }
//                 },
//                 {
//                     "id": "9",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "我不太同意这个观点，我认为应该从另一个角度考虑。",
//                     "contentType": 0,
//                     "reviewStatus": 0,
//                     "thumbNum": 12,
//                     "createTime": "2024-10-09T08:30:00.000+00:00",
//                     "updateTime": "2024-11-11T01:57:57.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": false,
//                     "replyPage": {
//                         "records": [],
//                         "total": 0,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 0
//                     }
//                 },
//                 {
//                     "id": "8",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "这个问题似乎很复杂，需要进一步分析。",
//                     "contentType": 0,
//                     "reviewStatus": 1,
//                     "thumbNum": 25,
//                     "createTime": "2024-10-08T07:25:00.000+00:00",
//                     "updateTime": "2024-11-12T08:26:02.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": false,
//                     "replyPage": {
//                         "records": [
//                             {
//                                 "id": "118",
//                                 "commentId": "8",
//                                 "userId": "2",
//                                 "content": "回复888",
//                                 "contentType": 0,
//                                 "reviewStatus": 0,
//                                 "thumbNum": 0,
//                                 "createTime": "2024-11-20T04:32:26.000+00:00",
//                                 "updateTime": "2024-11-20T04:32:26.000+00:00",
//                                 "user": {
//                                     "id": "2",
//                                     "userName": "小于",
//                                     "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                                     "userProfile": "咸鱼",
//                                     "userRole": "user",
//                                     "createTime": "2024-09-30T09:33:29.000+00:00"
//                                 },
//                                 "hasThumb": false
//                             },
//                             {
//                                 "id": "119",
//                                 "commentId": "8",
//                                 "userId": "3",
//                                 "content": "回复999",
//                                 "contentType": 0,
//                                 "reviewStatus": 0,
//                                 "thumbNum": 1,
//                                 "createTime": "2024-11-20T04:32:26.000+00:00",
//                                 "updateTime": "2024-11-20T04:32:26.000+00:00",
//                                 "user": {
//                                     "id": "3",
//                                     "userName": "java酱",
//                                     "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/43a49002b05ff24c9629909a1d4c61f2~90x90.awebp",
//                                     "userProfile": "程序员贺某，年二十有三，始从文，连考而不中。遂从武，练武场上发一矢",
//                                     "userRole": "user",
//                                     "createTime": "2024-10-17T09:04:19.000+00:00"
//                                 },
//                                 "hasThumb": false
//                             },
//                             {
//                                 "id": "120",
//                                 "commentId": "8",
//                                 "userId": "3",
//                                 "content": "回复8881",
//                                 "contentType": 0,
//                                 "reviewStatus": 0,
//                                 "thumbNum": 0,
//                                 "createTime": "2024-11-20T04:32:26.000+00:00",
//                                 "updateTime": "2024-11-20T04:32:26.000+00:00",
//                                 "user": {
//                                     "id": "3",
//                                     "userName": "java酱",
//                                     "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/43a49002b05ff24c9629909a1d4c61f2~90x90.awebp",
//                                     "userProfile": "程序员贺某，年二十有三，始从文，连考而不中。遂从武，练武场上发一矢",
//                                     "userRole": "user",
//                                     "createTime": "2024-10-17T09:04:19.000+00:00"
//                                 },
//                                 "hasThumb": false
//                             }
//                         ],
//                         "total": 8,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 3
//                     }
//                 },
//                 {
//                     "id": "7",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "虽然我没有太多时间参与，但我还是想表达我的观点。",
//                     "contentType": 0,
//                     "reviewStatus": 0,
//                     "thumbNum": 4,
//                     "createTime": "2024-10-07T06:20:00.000+00:00",
//                     "updateTime": "2024-11-18T07:00:42.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": true,
//                     "replyPage": {
//                         "records": [
//                             {
//                                 "id": "111",
//                                 "commentId": "7",
//                                 "userId": "2",
//                                 "content": "回复111",
//                                 "contentType": 0,
//                                 "reviewStatus": 0,
//                                 "thumbNum": 1,
//                                 "createTime": "2024-11-18T02:55:02.000+00:00",
//                                 "updateTime": "2024-11-18T07:10:46.000+00:00",
//                                 "user": {
//                                     "id": "2",
//                                     "userName": "小于",
//                                     "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                                     "userProfile": "咸鱼",
//                                     "userRole": "user",
//                                     "createTime": "2024-09-30T09:33:29.000+00:00"
//                                 },
//                                 "hasThumb": true
//                             },
//                             {
//                                 "id": "112",
//                                 "commentId": "7",
//                                 "userId": "2",
//                                 "content": "回复222",
//                                 "contentType": 0,
//                                 "reviewStatus": 0,
//                                 "thumbNum": 0,
//                                 "createTime": "2024-11-18T02:57:33.000+00:00",
//                                 "updateTime": "2024-11-18T07:10:46.000+00:00",
//                                 "user": {
//                                     "id": "2",
//                                     "userName": "小于",
//                                     "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                                     "userProfile": "咸鱼",
//                                     "userRole": "user",
//                                     "createTime": "2024-09-30T09:33:29.000+00:00"
//                                 },
//                                 "hasThumb": false
//                             },
//                             {
//                                 "id": "113",
//                                 "commentId": "7",
//                                 "userId": "3",
//                                 "content": "回复333",
//                                 "contentType": 0,
//                                 "reviewStatus": 0,
//                                 "thumbNum": 0,
//                                 "replyId": "1",
//                                 "replyUserId": "2",
//                                 "replyUser": {
//                                     "id": "2",
//                                     "userName": "小于",
//                                     "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                                     "userProfile": "咸鱼",
//                                     "userRole": "user",
//                                     "createTime": "2024-09-30T09:33:29.000+00:00"
//                                 },
//                                 "createTime": "2024-11-18T02:58:10.000+00:00",
//                                 "updateTime": "2024-11-18T07:10:46.000+00:00",
//                                 "user": {
//                                     "id": "3",
//                                     "userName": "java酱",
//                                     "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/43a49002b05ff24c9629909a1d4c61f2~90x90.awebp",
//                                     "userProfile": "程序员贺某，年二十有三，始从文，连考而不中。遂从武，练武场上发一矢",
//                                     "userRole": "user",
//                                     "createTime": "2024-10-17T09:04:19.000+00:00"
//                                 },
//                                 "hasThumb": false
//                             }
//                         ],
//                         "total": 7,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 3
//                     }
//                 },
//                 {
//                     "id": "6",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "我同意你的看法，尤其是关于 [这个问题](http://example.com)。",
//                     "contentType": 1,
//                     "reviewStatus": 1,
//                     "thumbNum": 8,
//                     "createTime": "2024-10-06T05:10:00.000+00:00",
//                     "updateTime": "2024-11-11T01:57:57.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": false,
//                     "replyPage": {
//                         "records": [],
//                         "total": 0,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 0
//                     }
//                 },
//                 {
//                     "id": "5",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "评论内容为空时，可能会默认有一个占位文本。",
//                     "contentType": 0,
//                     "reviewStatus": 0,
//                     "thumbNum": 0,
//                     "createTime": "2024-10-05T04:00:00.000+00:00",
//                     "updateTime": "2024-11-11T01:57:57.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": false,
//                     "replyPage": {
//                         "records": [],
//                         "total": 0,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 0
//                     }
//                 },
//                 {
//                     "id": "4",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "哈哈，真是个有趣的话题，我支持这个观点！",
//                     "contentType": 0,
//                     "reviewStatus": 1,
//                     "thumbNum": 20,
//                     "createTime": "2024-10-04T03:45:00.000+00:00",
//                     "updateTime": "2024-11-11T01:57:57.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": false,
//                     "replyPage": {
//                         "records": [],
//                         "total": 0,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 0
//                     }
//                 },
//                 {
//                     "id": "3",
//                     "postId": "1843471468667645954",
//                     "userId": "2",
//                     "content": "这条评论可能包含一些无关紧要的信息，但还是想说一下。",
//                     "contentType": 0,
//                     "reviewStatus": 1,
//                     "thumbNum": 5,
//                     "createTime": "2024-10-03T02:30:00.000+00:00",
//                     "updateTime": "2024-11-11T01:57:57.000+00:00",
//                     "user": {
//                         "id": "2",
//                         "userName": "小于",
//                         "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//                         "userProfile": "咸鱼",
//                         "userRole": "user",
//                         "createTime": "2024-09-30T09:33:29.000+00:00"
//                     },
//                     "hasThumb": false,
//                     "replyPage": {
//                         "records": [],
//                         "total": 0,
//                         "size": 3,
//                         "current": 1,
//                         "orders": [],
//                         "optimizeCountSql": true,
//                         "searchCount": true,
//                         "countId": null,
//                         "maxLimit": null,
//                         "pages": 0
//                     }
//                 }
//             ]
//         }
//     }
// });