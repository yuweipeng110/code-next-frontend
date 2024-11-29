import Mock from 'mockjs';

// /**
//  * 获取登录用户信息
//  */
// Mock.mock('/api/user/get/loginUser', 'get', () => {
//     console.log('/api/user/get/loginUser mock get 拦截')
//     return {
//         "success": true,
//         "code": 20000,
//         "message": "ok",
//         "data": {
//             "id": "2",
//             "token": null,
//             "userName": "小于1111",
//             "userAvatar": "https://p3-passport.byteacctimg.com/img/user-avatar/af0a4566974b43ac38f2579153d5ce04~180x180.awebp",
//             "userProfile": "咸鱼1111",
//             "createTime": "2024-09-30T09:33:29.000+00:00",
//             "updateTime": "2024-11-05T01:44:04.000+00:00"
//         }
//     }
// });