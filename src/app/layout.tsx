"use client";
import { useCallback, useEffect, useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import '../../mock/postCommentList';
import '../../mock/post';
import '../../mock/user';
import { ProConfigProvider } from "@ant-design/pro-components";
import { getTheme } from "@/utils/utils";
import useLocalStorageListener from "@/hooks/useLocalStorageListener";
import "moment/locale/zh-cn";
import "./globals.css";

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

  // 设置主题状态
  const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');

  useLocalStorageListener("code_theme", (updatedTraceInfo) => {
    setIsDarkMode(updatedTraceInfo.theme === 'dark');
  })

  return (
    <html lang="zh">
      <body data-theme={getTheme()}>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <ProConfigProvider dark={isDarkMode}>
                <BasicLayout>
                  {children}
                </BasicLayout>
              </ProConfigProvider>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}