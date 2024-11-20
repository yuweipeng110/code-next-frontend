// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doTagFollow POST /api/tagFollow/ */
export async function doTagFollowUsingPost(
  body: API.TagFollowAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/tagFollow/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listFollowTagByPage POST /api/tagFollow/list/page */
export async function listFollowTagByPageUsingPost(
  body: API.TagFollowQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultTagVO_>("/api/tagFollow/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyFollowTagByPage POST /api/tagFollow/my/list/page */
export async function listMyFollowTagByPageUsingPost(
  body: API.TagQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultTagVO_>(
    "/api/tagFollow/my/list/page",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
