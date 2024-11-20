// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** addPostComment POST /api/postComment/add */
export async function addPostCommentUsingPost(
  body: API.PostCommentAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/postComment/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePostComment POST /api/postComment/delete */
export async function deletePostCommentUsingPost(
  body: API.PostCommentDeleteDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/postComment/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listPostVOByPage POST /api/postComment/list/page/vo */
export async function listPostVoByPageUsingPost(
  body: API.PostCommentQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostCommentVO_>(
    "/api/postComment/list/page/vo",
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
