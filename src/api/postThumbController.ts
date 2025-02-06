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

/** listThumbPostByPage POST /api/postThumb/list/page */
export async function listThumbPostByPageUsingPost(
  body: API.PostThumbQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostVO_>(
    "/api/postThumb/list/page",
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

/** listPostVOByPage POST /api/postThumb/list/page/vo */
export async function listPostVoByPageUsingPost3(
  body: API.PostThumbQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostThumbVO_>(
    "/api/postThumb/list/page/vo",
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

/** listMyThumbPostByPage POST /api/postThumb/my/list/page */
export async function listMyThumbPostByPageUsingPost(
  body: API.PostQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostVO_>(
    "/api/postThumb/my/list/page",
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
