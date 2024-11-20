// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** addTag POST /api/tag/add */
export async function addTagUsingPost(
  body: API.TagAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/tag/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTag POST /api/tag/delete */
export async function deleteTagUsingPost(
  body: API.TagDeleteDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/tag/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getTagVO GET /api/tag/get/vo */
export async function getTagVoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTagVOUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseTagVO_>("/api/tag/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listTagVOByPage POST /api/tag/list/page/vo */
export async function listTagVoByPageUsingPost(
  body: API.TagQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultTagVO_>("/api/tag/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTag POST /api/tag/update */
export async function updateTagUsingPost(
  body: API.TagUpdateDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/tag/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
