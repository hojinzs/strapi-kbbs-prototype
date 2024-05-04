import createClient from "openapi-fetch";
import {paths} from "./strapi"
import {getJwtToken} from "../auth";

export type ErrorResponse<T extends object = object> = {
  "data": T,
  "error": {
    "status": number,
    "name": string,
    "message": string,
    "details": Record<string, string>
  }
}

export const useApi = (token = getJwtToken()) => {

  console.log("TOKEN :", token)
  return createClient<paths>({
    baseUrl: `${process.env.CMS_HOST}/api`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
}

export function isErrorResponse<T extends object>(response: any): response is ErrorResponse<T> {
  return response?.error?.status !== undefined;
}
