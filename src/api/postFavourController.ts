// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** doPostFavour POST /api/postFavour/ */
export async function doPostFavourUsingPost(
  body: API.PostFavourAddDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInt_>("/api/postFavour/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** listFavourPostByPage POST /api/postFavour/list/page */
export async function listFavourPostByPageUsingPost(
  body: API.PostFavourQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostVO_>(
    "/api/postFavour/list/page",
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

/** listPostVOByPage POST /api/postFavour/list/page/vo */
export async function listPostVoByPageUsingPost2(
  body: API.PostFavourQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostFavourVO_>(
    "/api/postFavour/list/page/vo",
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

/** listMyFavourPostByPage POST /api/postFavour/my/list/page */
export async function listMyFavourPostByPageUsingPost(
  body: API.PostQueryDTO,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageResultPostVO_>(
    "/api/postFavour/my/list/page",
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
