"use client";
import { useCallback, useEffect, useState } from "react";
import BasicLayout from "@/layouts/BasicLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import "./globals.css";
import { useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();


  useEffect(() => {
    const handleMessage = (event: any) => {
      const data = event.data;
      switch (data.cmd) {
        case 'getFormJson':
          console.log('xxxx', data);
          // window.history.back();
          router.back();
          // 处理业务逻辑
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    // 清理函数
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>{children}</BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}