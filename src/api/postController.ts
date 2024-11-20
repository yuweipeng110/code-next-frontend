// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** addPost POST /api/post/add */
export async function addPostUsingPost(
  body: API.PostAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/post/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePost POST /api/post/delete */
export async function deletePostUsingPost(
  body: API.PostDeleteDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/post/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getPostVO GET /api/post/get/vo */
export async function getPostVoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostVOUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePostVO_>("/api/post/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listPostVOByPage POST /api/post/list/page/vo */
export async function listPostVoByPageUsingPost1(
  body: API.PostQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostVO_>("/api/post/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** updatePost POST /api/post/update */
export async function updatePostUsingPost(
  body: API.PostUpdateDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/post/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
