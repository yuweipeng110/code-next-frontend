// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doThumb POST /api/postCommentThumb/ */
export async function doThumbUsingPost1(
  body: API.PostCommentThumbAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/postCommentThumb/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
