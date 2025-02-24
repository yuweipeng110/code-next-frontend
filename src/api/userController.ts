// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** getLoginUser GET /api/user/get/loginUser */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO_>("/api/user/get/loginUser", {
    method: "GET",
    ...(options || {}),
  });
}

/** getUserVO GET /api/user/get/vo */
export async function getUserVoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO_>("/api/user/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserVOByPage POST /api/user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: API.UserQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultUserVO_>("/api/user/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVO_>("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout GET /api/user/logout */
export async function userLogoutUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>("/api/user/logout", {
    method: "GET",
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
