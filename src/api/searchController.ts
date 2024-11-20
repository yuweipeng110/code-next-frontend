// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** searchAll POST /api/search/all */
export async function searchAllUsingPost(
  body: API.SearchDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseSearchVO_>("/api/search/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
