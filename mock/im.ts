// export const imUserList = [
//     {
//         id: 1,
//         username: '陈小盒',
//         time: '15:19',
//         newMessage: "哈喽",
//         avatar: "https://p26-passport.byteacctimg.com/img/user-avatar/7f43ce2baa99baf2d4d989f890cf81c7~180x180.awebp",
//     },
// ];

function generateRandomUsername() {
    const prefix = ['小', '大', '萌', '酷', '智', '快', '阳', '天', '星', '风'];
    const suffix = ['猫', '狗', '人', '车', '鸟', '鱼', '雪', '星', '海', '云'];
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const randomSuffix = suffix[Math.floor(Math.random() * suffix.length)];
    const randomNumber = Math.floor(Math.random() * 1000);

    return `${randomPrefix}${randomSuffix}${randomNumber}`;
}

export const imUserList = Array.from({ length: 20 }, (v, i) => ({
    id: i + 1,  // id 递增
    username: generateRandomUsername(),  // 随机用户名
    time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,  // 随机时间
    newMessage: i % 2 === 0 ? "哈喽" : "你好",  // 消息内容随机
    avatar: "https://p26-passport.byteacctimg.com/img/user-avatar/7f43ce2baa99baf2d4d989f890cf81c7~180x180.awebp",  // 相同的头像
}));


// 获取当前时间（以毫秒为单位）
const currentTime = new Date();

// 生成imList
export const imList = Array.from({ length: 20 }, (v, i) => {
    // 计算每个项的时间，递增5分钟
    const dateTime = new Date(currentTime.getTime() + i * 5 * 60 * 1000);

    // 格式化时间为 yyyy-MM-dd HH:mm
    const formattedDateTime = dateTime.toISOString().slice(0, 16).replace('T', ' ');

    return {
        id: i + 1,  // id 递增
        content: generateRandomUsername(),  // 随机用户名
        time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,  // 随机时间
        dateTime: formattedDateTime,  // 当前时间 + 5分钟递增
        role: i % 2 === 0 ? "user" : "assistant", // 偶数项为用户，奇数项为助手
        avatar: i % 2 === 0
            ? "https://p26-passport.byteacctimg.com/img/user-avatar/7f43ce2baa99baf2d4d989f890cf81c7~180x180.awebp"
            : "https://p3-passport.byteacctimg.com/img/user-avatar/df27b7905a9c5912c392a99b2cd34d4b~100x100.awebp"
    };
});


export const initialChats = [
    {
        content: '你是谁？',
        createAt: 1697862242452,
        id: 'ZGxiX2p4',
        role: 'user',
        updateAt: 1697862243540,
    },
    {
        content: 'user 请回复我！我要生气了！',
        createAt: 1697862242453,
        id: 'ZGxiX2JQ',
        role: 'user',
        updateAt: 1697862243540,
    },
    {
        content: `我怎么知道我是谁！`,
        createAt: 1697862242458,
        id: 'Sb5pAzLL',
        role: 'assistant',
        updateAt: 1697862243540,
    },
    {
        content: `我怎么知道我是谁！我怎么知道我是谁！我怎么知道我是谁！我怎么知道我是谁！我怎么知道我是谁！我怎么知道我是谁！我怎么知道我是谁！我怎么知道我是谁！我怎么知道我是谁！`,
        createAt: 1,
        id: '1',
        role: 'assistant',
        updateAt: 1697862243540,
    },
    {
        content: `assistant 我怎么知道我是谁！`,
        createAt: 2,
        id: '2',
        role: 'assistant',
        updateAt: 1697862243540,
    },
    {
        content: `system 我怎么知道我是谁！`,
        createAt: 3,
        id: '3',
        role: 'system',
        updateAt: 1697862243540,
        // 'user' | 'system' | 'assistant' | 'function';
    },
    {
        content: `function 我怎么知道我是谁！`,
        createAt: 4,
        id: '4',
        role: 'function',
        updateAt: 1697862243540,
    },
    {
        content: `userTo 我怎么知道我是谁！`,
        createAt: 5,
        id: '5',
        role: 'userTo',
        updateAt: 1697862243540,
    },
    {
        content: `我怎么知道我是谁！`,
        createAt: 6,
        id: '6',
        role: 'assistant',
        updateAt: 1697862243540,
    },
    {
        content: `我怎么知道我是谁！`,
        createAt: 7,
        id: '7',
        role: 'assistant',
        updateAt: 1697862243540,
    },
    {
        content: `我怎么知道我是谁！`,
        createAt: 8,
        id: '8',
        role: 'assistant',
        updateAt: 1697862243540,
    },
    {
        content: `我怎么知道我是谁！`,
        createAt: 9,
        id: '9',
        role: 'assistant',
        updateAt: 1697862243540,
    },
    {
        id: 'VbtDpzsi',
        content: `当前对话剩余的 token 数量为 100`,
        createAt: 11,
        role: 'notification',
        updateAt: 1697862243540,
    },
];