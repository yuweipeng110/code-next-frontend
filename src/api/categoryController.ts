// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** listTagVOByPage POST /api/category/list/page/vo */
export async function listTagVoByPageUsingPost(
  body: API.CategoryQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultCategoryVO_>(
    "/api/category/list/page/vo",
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
