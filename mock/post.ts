import { getPageQuery, getRequestQuery } from '@/utils/utils';
import Mock from 'mockjs';

// 定义多个帖子数据
const posts = {
    '1843471468667645954': {
        id: '1843471468667645954',
        title: '探索未知的边界',
        content: '## 回答重点\n不可以。因为 Vue 会将 `data` 中的属性和计算属性都挂载到 Vue 实例上，如果它们同名，则会发生命名冲突，导致实例中的属性被覆盖，从而引发不可预知的错误。\n\n## 扩展知识\n**1）命名冲突的本质：** 在 Vue 中，`data` 和计算属性（computed）最终都会作为 Vue 实例的一个属性存在。如果我们在 `data` 中定义了一个属性 `foo`，同时又在 `computed` 中定义了一个名为 `foo` 的计算属性，二者会产生命名冲突，Vue 会警告你存在重复定义。Vue 在初始化时会按照一定的顺序（如`Props、methods、data、computed、watch`）将这些属性挂载到 Vue 实例上，后挂载的属性会覆盖先挂载的同名属性。\n\n**2）计算属性的优先级：** `data` 的优先级高于计算属性。如果在 `data` 和计算属性中存在相同的属性，那么在模板中使用这些属性时，会优先使用 `data` 中的数据，因为 `data` 是直接存储数据的，而计算属性是基于 `data` 或其他属性的变化进行计算的‌。\n\n**3）避免命名冲突的最佳实践：** 为了保持代码的清晰和简洁，建议在项目实施时遵循以下几点： \n- **命名规范：** 确保 `data` 和计算属性有不同的命名，避免命名冲突。 \n- **模块化管理：** 将各自逻辑进行分模块管理，提高代码的可读性和可维护性。 \n- **严格代码审查：** 在代码审查阶段注意这些潜在问题，及时纠正。\n\n**4）命名冲突如何提醒：** 在运行环境下，Vue 通常会在控制台输出警告信息，来提醒开发者存在属性命名冲突，帮助快速定位和修复问题。\n\n**5）其它Vue中的相关特性：** \n- **methods：** 与计算属性类似，`methods` 中的方法也会被挂载到 Vue 实例上，同样需要避免与 `data` 和计算属性同名。 \n- **Watchers：** 虽然数据监听器（watchers）与 `data` 和计算属性相关，但它们不会直接参与命名冲突，因为 `watchers` 本身不挂载属性名到 Vue 实例上。',
        thumbNum: 11,
        favourNum: 5,
        viewNum: 1902460,
        userId: '4',
        createTime: '2024-10-08T02:57:16.000+00:00',
        updateTime: '2024-11-15T07:52:55.000+00:00',
        tagList: ['探索', '未知'],
        user: {
            id: '4',
            userName: '子翀',
            userAvatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/b57b5b9a6edf5347280342ddd04ba046~200x200.awebp',
            userProfile: '程序员大佬，精通各类编程语言，架构师',
            userRole: 'user',
            createTime: '2024-10-22T01:19:15.000+00:00'
        },
        hasThumb: true,
        hasFavour: false
    },
    '1843471468667645955': {
        id: '1843471468667645955',
        title: '深入浅出的算法讲解',
        content: '## 算法基础\n算法是计算机科学的核心，它决定了程序的效率和性能。本文将深入浅出地讲解几种常见的算法及其应用场景。',
        thumbNum: 8,
        favourNum: 3,
        viewNum: 120000,
        userId: '5',
        createTime: '2024-10-09T03:00:00.000+00:00',
        updateTime: '2024-11-16T08:00:00.000+00:00',
        tagList: ['算法', '计算机科学'],
        user: {
            id: '5',
            userName: '算法小王子',
            userAvatar: 'https://p6-passport.byteacctimg.com/img/user-avatar/abc12345678901234567890123456789~200x200.awebp',
            userProfile: '专注于算法研究，热爱分享',
            userRole: 'user',
            createTime: '2024-10-23T02:00:00.000+00:00'
        },
        hasThumb: false,
        hasFavour: true
    }
};

const url = "/api/post/get/vo?id=1843471468667645955";
const regUrl = RegExp(`/api/post/get/vo` + ".*");


/**
 * 获取帖子数据
 */
Mock.mock(regUrl, (req, res) => {

    const params = getRequestQuery(req.url);
    // 从请求中获取 id 参数
    const { id } = params;

    // 根据 id 查找帖子数据
    const post = posts[id as string];
    console.log("/api/post/get/vo mock result", post);

    if (post) {
        return {
            success: true,
            code: 20000,
            message: 'ok',
            data: post
        };
    } else {
        return {
            success: false,
            code: 40400,
            message: '未找到帖子',
            data: null
        };
    }
});