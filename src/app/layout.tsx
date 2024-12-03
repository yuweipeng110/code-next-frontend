"use client";
import { useCallback, useEffect } from "react";
import BasicLayout from "@/layouts/BasicLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import "./globals.css";
import '../../mock/postCommentList';
import '../../mock/post';
import '../../mock/user';
import { ConfigProvider } from "antd";
import { ProConfigProvider } from "@ant-design/pro-components";
import { getTheme } from "@/utils/utils";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  // 初始化全局用户状态
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
      dispatch(setLoginUser(res.data));
    }
  }, []);

  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);

  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log('getTheme', getTheme());
  // light
  // dark

  return (
    <html lang="zh">
      <body data-theme={getTheme()}>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <ProConfigProvider dark={getTheme() === 'dark'}>
                <BasicLayout>{children}</BasicLayout>
              </ProConfigProvider>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}