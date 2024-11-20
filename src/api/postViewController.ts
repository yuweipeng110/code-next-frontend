// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doPostView POST /api/postView/ */
export async function doPostViewUsingPost(
  body: API.PostViewAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/postView/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listViewPostByPage POST /api/postView/list/page */
export async function listViewPostByPageUsingPost(
  body: API.PostViewQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostVO_>("/api/postView/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyViewPostByPage POST /api/postView/my/list/page */
export async function listMyViewPostByPageUsingPost(
  body: API.PostQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostVO_>(
    "/api/postView/my/list/page",
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