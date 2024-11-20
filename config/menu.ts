import { MenuDataItem } from "@ant-design/pro-components";

// 菜单列表
export const menus = [
    {
        path: "/",
        name: "首页",
    },
    {
        key: "tag",
        path: "/tags",
        name: "标签",
    },
    {
        key: "post",
        path: "/posts",
        name: "帖子",
    },
    {
        path: "/admin",
        name: "管理",
        children: [
            {
                key: "my",
                path: "/admin/user",
                name: "我的主页",
            },
            {
                key: "userManage",
                path: "/admin/user",
                name: "用户管理",
            },
        ],
    },
] as MenuDataItem[];