// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** addPostCommentReply POST /api/postCommentReply/add */
export async function addPostCommentReplyUsingPost(
  body: API.PostCommentReplyAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/postCommentReply/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deletePostCommentReply POST /api/postCommentReply/delete */
export async function deletePostCommentReplyUsingPost(
  body: API.PostCommentReplyDeleteDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/postCommentReply/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listPostCommentReplyVOByPage POST /api/postCommentReply/list/page/vo */
export async function listPostCommentReplyVoByPageUsingPost(
  body: API.PostCommentReplyQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostCommentReplyVO_>(
    "/api/postCommentReply/list/page/vo",
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
