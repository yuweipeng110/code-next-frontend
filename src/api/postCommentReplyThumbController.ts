// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doThumb POST /api/postCommentReplyThumb/ */
export async function doThumbUsingPost(
  body: API.PostCommentReplyThumbAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/postCommentReplyThumb/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
