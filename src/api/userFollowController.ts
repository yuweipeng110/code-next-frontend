// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doUserFollow POST /api/userFollow/ */
export async function doUserFollowUsingPost(
  body: API.UserFollowAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/userFollow/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listFollowUserByPage POST /api/userFollow/list/page */
export async function listFollowUserByPageUsingPost(
  body: API.UserFollowQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultUserVO_>(
    "/api/userFollow/list/page",
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

/** listMyFollowUserByPage POST /api/userFollow/my/list/page */
export async function listMyFollowUserByPageUsingPost(
  body: API.UserQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultUserVO_>(
    "/api/userFollow/my/list/page",
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
