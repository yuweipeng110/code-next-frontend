// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doThumb POST /api/postThumb/ */
export async function doThumbUsingPost2(
  body: API.PostThumbAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/postThumb/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
